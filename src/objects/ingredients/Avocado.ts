import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Ingredient from "../../classes/food/Ingredient";
import Sliceable from "../../classes/food/Sliceable";

export class AvocadoHalf extends Ingredient {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "AvocadoHalf",
			assets: {
				model: {
					path: "/models/food/avocadoHalf.glb",
					offset: new Vector3(-0.05, -0.1, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new AvocadoHalf(scene);
	}
}

export class Avocado extends Sliceable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Avocado",
			assets: {
				model: {
					path: "/models/food/avocado.glb",
					offset: new Vector3(0, -0.1, 0),
				},
			},
			physics: true,
			Half: AvocadoHalf,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Avocado(scene);
	}
}
