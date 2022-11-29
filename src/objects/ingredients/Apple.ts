import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Ingredient from "../../classes/food/Ingredient";
import Sliceable from "../../classes/food/Sliceable";

export class AppleHalf extends Ingredient {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "AppleHalf",
			assets: {
				model: {
					path: "/models/food/appleHalf.glb",
					offset: new Vector3(-0.05, -0.1, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new AppleHalf(scene);
	}
}

export class Apple extends Sliceable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Apple",
			assets: {
				model: {
					path: "/models/food/apple.glb",
					offset: new Vector3(0, -0.1, 0),
				},
			},
			physics: true,
			Half: AppleHalf,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Apple(scene);
	}
}
