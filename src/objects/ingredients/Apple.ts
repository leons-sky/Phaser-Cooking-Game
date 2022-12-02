import { EntityState } from "../../classes/base/Entity";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";
import Sliceable, { SliceableOptions } from "../../classes/item/food/Sliceable";

export class AppleHalf extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 1,
		};

		return new AppleHalf({
			name: "AppleHalf",
			uniqueId: "APPLE_HALF",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/appleHalf.glb",
					// offset: new Vector3(-0.05, -0.1, 0),
				},
			},
			previewImage: "/images/food/appleHalf.png",
			physics: true,
		});
	}
}

export class Apple extends Sliceable {
	constructor(options: SliceableOptions) {
		super(options);
	}

	static create(defaultState?: EntityState) {
		return new Apple({
			name: "Apple",
			uniqueId: "APPLE",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/apple.glb",
					// offset: new Vector3(0, -0.1, 0),
				},
			},
			previewImage: "/images/food/apple.png",
			physics: true,
			Half: AppleHalf,
		});
	}
}
