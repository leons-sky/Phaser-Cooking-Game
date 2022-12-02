import RecipeBase, { RecipeIngredient } from "../base/Recipe";
import Ingredient from "../item/food/Ingredient";

export default class MixRecipe extends RecipeBase {
	addIngredient(ingredient: Ingredient | RecipeIngredient) {
		if (ingredient instanceof Ingredient) {
			ingredient = {
				item: ingredient,
			};
		}
		this.ingredients.push(ingredient);
		return this;
	}

	addIngredients(...ingredients: (Ingredient | RecipeIngredient)[]) {
		for (const ingredient of ingredients) {
			this.addIngredient(ingredient);
		}
		return this;
	}
}
