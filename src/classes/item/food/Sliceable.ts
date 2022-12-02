import { Matrix4, Vector3 } from "three";
import { FoodOptions } from "./Food";
import Ingredient from "./Ingredient";

export interface SliceableOptions extends FoodOptions {
	alternateSliceAxis?: boolean;
	Half: typeof Ingredient;
}

export default class Sliceable extends Ingredient {
	private Half: typeof Ingredient;
	private alternateSliceAxis: boolean = false;

	constructor(options: SliceableOptions) {
		super(options);

		this.Half = options.Half;
		this.alternateSliceAxis =
			options.alternateSliceAxis ?? this.alternateSliceAxis;
	}

	slice() {
		if (!this.scene) return;

		const half1 = this.Half.create();
		const half2 = this.Half.create();

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
			this.alternateSliceAxis
				? new Vector3(1, 0, 0)
				: new Vector3(0, 1, 0),
			Math.PI
		);

		this.destroy();

		half1.addToScene(this.scene);
		half2.addToScene(this.scene);

		return [half1, half2];
	}
}
