import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Interactable from "../../classes/base/Interactable";

export default class Cake extends Interactable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Cake",
			assets: {
				model: {
					path: "/models/food/cakeSlice.glb",
					offset: new Vector3(0, -0.15, 0),
				},
			},
			physics: {
				mass: 3,
			},
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Cake(scene);
	}

	construct() {
		for (let i = 0; i < 6; i++) {
			const slice = this.assets.model.clone();
			slice.rotateY(60 * i * (Math.PI / 180));
			this.add(slice);
		}
	}

	onActivate() {
		this.body.applyForceY(1);
		this.removeSlice();
	}

	removeSlice() {
		const slice = this.children[0];

		if (this.children.length <= 1) {
			this.destroy();
		} else {
			this.remove(slice);
			this.refreshCollisionBox();
		}
	}
}
