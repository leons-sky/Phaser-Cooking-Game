import { Vector2, Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Ingredient from "../../classes/food/Ingredient";
import Sliceable from "../../classes/food/Sliceable";

export class LemonHalf extends Ingredient {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "LemonHalf",
			assets: {
				model: {
					path: "/models/food/lemonHalf.glb",
					offset: new Vector3(0, -0.05, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new LemonHalf(scene);
	}
}

export class Lemon extends Sliceable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Lemon",
			assets: {
				model: {
					path: "/models/food/lemon.glb",
					offset: new Vector3(0, -0.1, 0),
				},
			},
			physics: true,
			Half: LemonHalf,
			alternateSliceAxis: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Lemon(scene);
	}
}
