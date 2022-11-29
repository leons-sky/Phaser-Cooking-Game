import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Cookable from "../../classes/food/Cookable";

export default class Bacon extends Cookable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Bacon",
			assets: {
				raw: {
					path: "/models/food/baconRaw.glb",
					offset: new Vector3(0, -0.01, 0),
				},
				cooked: {
					path: "/models/food/bacon.glb",
					offset: new Vector3(0, -0.01, 0),
				},
			},
			physics: true,
			refreshCollisionBox: false,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Bacon(scene);
	}
}
