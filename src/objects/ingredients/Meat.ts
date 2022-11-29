import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import Cookable from "../../classes/food/Cookable";

export default class Meat extends Cookable {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Meat",
			assets: {
				raw: {
					path: "/models/food/meatRaw.glb",
					offset: new Vector3(0, -0.03, 0),
				},
				cooked: {
					path: "/models/food/meatCooked.glb",
					offset: new Vector3(0, -0.03, 0),
				},
			},
			physics: true,
			refreshCollisionBox: false,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Meat(scene);
	}
}
