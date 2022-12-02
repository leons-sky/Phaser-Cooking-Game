import Food, { FoodOptions, FoodState } from "../../classes/item/food/Food";

export default class Salad extends Food {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 40,
		};

		return new Salad({
			name: "Salad",
			uniqueId: "SALAD",
			defaultState: defaultState,
			assets: {
				model: "/models/food/salad.glb",
			},
			previewImage: "/images/food/salad.png",
			physics: true,
		});
	}
}
