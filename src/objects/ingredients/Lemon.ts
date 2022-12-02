import { EntityState } from "../../classes/base/Entity";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";
import Sliceable, { SliceableOptions } from "../../classes/item/food/Sliceable";

export class LemonHalf extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 1,
		};

		return new LemonHalf({
			name: "LemonHalf",
			uniqueId: "LEMON_HALF",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/lemonHalf.glb",
					// offset: new Vector3(0, -0.05, 0),
				},
			},
			previewImage: "/images/food/lemonHalf.png",
			physics: true,
		});
	}
}

export class Lemon extends Sliceable {
	constructor(options: SliceableOptions) {
		super(options);
	}

	static create(defaultState?: EntityState) {
		return new Lemon({
			name: "Lemon",
			uniqueId: "LEMON",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/lemon.glb",
					// offset: new Vector3(0, -0.1, 0),
				},
			},
			previewImage: "/images/food/lemon.png",
			physics: true,
			Half: LemonHalf,
			alternateSliceAxis: true,
		});
	}
}
