import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Ingredient from "../../classes/food/Ingredient";
import Sliceable from "../../classes/food/Sliceable";

export class MushroomHalf extends Ingredient {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "MushroomHalf",
			assets: {
				model: {
					path: "/models/food/mushroomHalf.glb",
					offset: new Vector3(-0.03, -0.07, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new MushroomHalf(scene);
	}
}

export class Mushroom extends Sliceable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Mushroom",
			assets: {
				model: {
					path: "/models/food/mushroom.glb",
					offset: new Vector3(0, -0.07, 0),
				},
			},
			physics: true,
			Half: MushroomHalf,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Mushroom(scene);
	}
}
