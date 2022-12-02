import { EntityState } from "../../classes/base/Entity";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";
import Sliceable, { SliceableOptions } from "../../classes/item/food/Sliceable";

export class MushroomHalf extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 1,
		};

		return new MushroomHalf({
			name: "MushroomHalf",
			uniqueId: "MUSHROOM_HALF",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/mushroomHalf.GLB",
					// offset: new Vector3(-0.03, -0.07, 0),
				},
			},
			previewImage: "/images/food/mushroomHalf.png",
			physics: true,
		});
	}
}

export class Mushroom extends Sliceable {
	constructor(options: SliceableOptions) {
		super(options);
	}

	static create(defaultState?: EntityState) {
		return new Mushroom({
			name: "Mushroom",
			uniqueId: "MUSHROOM",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/mushroom.GLB",
					// offset: new Vector3(0, -0.07, 0),
				},
			},
			previewImage: "/images/food/mushroom.png",
			physics: true,
			Half: MushroomHalf,
		});
	}
}
