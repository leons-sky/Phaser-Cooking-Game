import Food from "../../classes/item/food/Food";
import { ItemOptions } from "../../classes/item/Item";

export default class Waffle extends Food {
	constructor(options: ItemOptions) {
		super(options);
	}

	static create() {
		return new Waffle({
			name: "Waffle",
			uniqueId: "WAFFLE",
			assets: {
				model: "/models/food/waffle.glb",
			},
			physics: true,
		});
	}
}
