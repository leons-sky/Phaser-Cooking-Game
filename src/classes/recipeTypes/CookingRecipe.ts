import RecipeBase, { RecipeIngredient, RecipeResult } from "../base/Recipe";
import Cookable from "../item/food/Cookable";
import Ingredient from "../item/food/Ingredient";

interface RecipeCookableIngredient extends RecipeIngredient {
	item: Cookable;
}

export default class CookingRecipe extends RecipeBase {
	private _duration: number = 1;

	get duration() {
		return this._duration;
	}

	setDuration(duration: number) {
		this._duration = duration;
		return this;
	}

	setInput(
		ingredient: Cookable | RecipeCookableIngredient,
		count: number = 1
	) {
		if (ingredient instanceof Ingredient) {
			ingredient = {
				item: ingredient,
			};
		}
		const ingredients = [];
		for (let _ = 0; _ < count; _++) {
			ingredients.push({ ...ingredient });
		}
		this.ingredients = ingredients;
		return this;
	}

	craft(ingredients: Cookable[]): RecipeResult {
		if (!this.canCraft(ingredients)) return null;

		ingredients[0].cook();
		return ingredients[0];
	}
}
