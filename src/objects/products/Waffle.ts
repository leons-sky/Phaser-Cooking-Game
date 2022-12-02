import Food, { FoodOptions } from "../../classes/item/food/Food";

export default class Waffle extends Food {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create() {
		return new Waffle({
			name: "Waffle",
			uniqueId: "WAFFLE",
			assets: {
				model: "/models/food/waffle.glb",
			},
			previewImage: "/images/food/waffle.png",
			physics: true,
		});
	}
}
