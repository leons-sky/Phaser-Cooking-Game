import { EntityState } from "../../classes/base/Entity";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";
import Sliceable, { SliceableOptions } from "../../classes/item/food/Sliceable";

export class OnionHalf extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 1,
		};

		return new OnionHalf({
			name: "OnionHalf",
			uniqueId: "ONION_HALF",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/onionHalf.GLB",
					// offset: new Vector3(-0.05, -0.1, 0),
				},
			},
			previewImage: "/images/food/onionHalf.png",
			physics: true,
		});
	}
}

export class Onion extends Sliceable {
	constructor(options: SliceableOptions) {
		super(options);
	}

	static create(defaultState?: EntityState) {
		return new Onion({
			name: "Onion",
			uniqueId: "ONION",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/onion.GLB",
					// offset: new Vector3(0, -0.1, 0),
				},
			},
			previewImage: "/images/food/onion.png",
			physics: true,
			Half: OnionHalf,
		});
	}
}
