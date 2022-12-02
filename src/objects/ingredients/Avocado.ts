import { EntityState } from "../../classes/base/Entity";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";
import Sliceable, { SliceableOptions } from "../../classes/item/food/Sliceable";

export class AvocadoHalf extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 1,
		};

		return new AvocadoHalf({
			name: "AvocadoHalf",
			uniqueId: "AVOCADO_HALF",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/avocadoHalf.GLB",
					// offset: new Vector3(-0.05, -0.1, 0),
				},
			},
			previewImage: "/images/food/avocadoHalf.png",
			physics: true,
		});
	}
}

export class Avocado extends Sliceable {
	constructor(options: SliceableOptions) {
		super(options);
	}

	static create(defaultState?: EntityState) {
		return new Avocado({
			name: "Avocado",
			uniqueId: "AVOCADO",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/avocado.GLB",
					// offset: new Vector3(0, -0.1, 0),
				},
			},
			previewImage: "/images/food/avocado.png",
			physics: true,
			Half: AvocadoHalf,
		});
	}
}
