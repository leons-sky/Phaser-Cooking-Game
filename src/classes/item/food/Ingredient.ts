import Food, { FoodOptions } from "./Food";

export default class Ingredient extends Food {
	constructor(options: FoodOptions) {
		super(options);

		this.type = "Ingredient";
	}
}
