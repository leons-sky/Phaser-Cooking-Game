import { EntityState } from "../../classes/base/Entity";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";
import Sliceable, { SliceableOptions } from "../../classes/item/food/Sliceable";

export class TomatoSlice extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 1,
		};

		return new TomatoSlice({
			name: "TomatoSlice",
			uniqueId: "TOMATO_SLICE",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/tomatoSlice.glb",
					// offset: new Vector3(0, -0.015, 0),
				},
			},
			previewImage: "/images/food/tomatoSlice.png",
			physics: true,
		});
	}
}

export class Tomato extends Sliceable {
	constructor(options: SliceableOptions) {
		super(options);
	}

	static create(defaultState?: EntityState) {
		return new Tomato({
			name: "Tomato",
			uniqueId: "TOMATO",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/tomato.glb",
					// offset: new Vector3(0, -0.07, 0),
				},
			},
			previewImage: "/images/food/tomato.png",
			physics: true,
			Half: TomatoSlice,
			alternateSliceAxis: true,
		});
	}
}
