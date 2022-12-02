import { Vector3 } from "three";
import Cookable, { CookableOptions } from "../../classes/item/food/Cookable";
import { FoodState } from "../../classes/item/food/Food";

export default class Bacon extends Cookable {
	constructor(options: CookableOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 15,
			state: {
				cooked: true,
			},
		};

		return new Bacon({
			name: "Bacon",
			uniqueId: "BACON",
			defaultState: defaultState,
			assets: {
				raw: {
					path: "/models/food/baconRaw.glb",
					offset: new Vector3(0, 0.019553, 0),
				},
				cooked: {
					path: "/models/food/bacon.glb",
					offset: new Vector3(0, 0.019553, 0),
				},
			},
			previewImage: "/images/food/baconRaw.png",
			physics: true,
			refreshCollisionBox: false,
		});
	}
}
