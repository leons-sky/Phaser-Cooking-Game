import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Ingredient from "../../classes/food/Ingredient";

export default class Egg extends Ingredient {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Egg",
			assets: {
				model: {
					path: "/models/food/egg.glb",
					offset: new Vector3(0, -0.085, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Egg(scene);
	}
}
