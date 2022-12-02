import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";

export default class Lettuce extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		return new Lettuce({
			name: "Lettuce",
			uniqueId: "LETTUCE",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/cabbage.glb",
					// offset: new Vector3(0, -0.015, 0),
				},
			},
			previewImage: "/images/food/cabbage.png",
			physics: true,
		});
	}
}
