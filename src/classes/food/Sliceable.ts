import { Matrix4, Vector3 } from "three";
import ExtendedScene3D from "../base/ExtendedScene3D";
import { GameObjectOptions } from "../base/GameObject";
import Ingredient from "./Ingredient";

interface SliceableOptions extends GameObjectOptions {
	alternateSliceAxis?: boolean;
	Half: typeof Ingredient;
}

export default class Sliceable extends Ingredient {
	private Half: typeof Ingredient;
	private alternateSliceAxis: boolean = false;

	constructor(scene: ExtendedScene3D, options: SliceableOptions) {
		super(scene, options);

		this.Half = options.Half;
		this.alternateSliceAxis =
			options.alternateSliceAxis ?? this.alternateSliceAxis;
	}

	onActivate() {
		this.slice();
	}

	slice() {
		const half1 = this.Half.create(this.scene);
		const half2 = this.Half.create(this.scene);

		const pos = this.position;
		const rotation = new Matrix4().extractRotation(this.matrixWorld);

		let half1Offset = (
			this.alternateSliceAxis
				? new Vector3(0, -0.05, 0)
				: new Vector3(0.05, 0, 0)
		).applyMatrix4(rotation);
		// .normalize();
		let half2Offset = (
			this.alternateSliceAxis
				? new Vector3(0, 0.05, 0)
				: new Vector3(-0.05, 0, 0)
		).applyMatrix4(rotation);
		// .normalize();;

		half1.position.set(
			pos.x + half1Offset.x,
			pos.y + half1Offset.y + 0.02,
			pos.z + half1Offset.z
		);
		half2.position.set(
			pos.x + half2Offset.x,
			pos.y + half2Offset.y + 0.02,
			pos.z + half2Offset.z
		);
		half2.rotateOnAxis(
			(this.alternateSliceAxis
				? new Vector3(1, 0, 0)
				: new Vector3(0, 1, 0)
			).applyMatrix4(rotation),
			this.alternateSliceAxis ? -Math.PI : Math.PI
		);

		this.destroy();

		half1.addToScene();
		half2.addToScene();

		return [half1, half2];
	}
}
