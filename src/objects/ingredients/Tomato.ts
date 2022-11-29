import { Vector2, Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Ingredient from "../../classes/food/Ingredient";
import Sliceable from "../../classes/food/Sliceable";

export class TomatoSlice extends Ingredient {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "TomatoSlice",
			assets: {
				model: {
					path: "/models/food/tomatoSlice.glb",
					offset: new Vector3(0, -0.015, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new TomatoSlice(scene);
	}
}

export class Tomato extends Sliceable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Tomato",
			assets: {
				model: {
					path: "/models/food/tomato.glb",
					offset: new Vector3(0, -0.07, 0),
				},
			},
			physics: true,
			Half: TomatoSlice,
			alternateSliceAxis: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Tomato(scene);
	}
}
