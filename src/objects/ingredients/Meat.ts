import { Vector3 } from "three";
import Cookable, { CookableOptions } from "../../classes/item/food/Cookable";
import { FoodState } from "../../classes/item/food/Food";

export default class Meat extends Cookable {
	constructor(options: CookableOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 50,
			state: {
				cooked: true,
			},
		};

		return new Meat({
			name: "Meat",
			uniqueId: "MEAT",
			defaultState: defaultState,
			assets: {
				raw: {
					path: "/models/food/meatRaw.glb",
					offset: new Vector3(0, 0.027237, 0),
					scale: 0.9,
				},
				cooked: {
					path: "/models/food/meatCooked.glb",
					offset: new Vector3(0, 0.027237, 0),
					scale: 0.9,
				},
			},
			previewImage: "/images/food/meatCooked.png",
			physics: true,
			refreshCollisionBox: false,
		});
	}
}
