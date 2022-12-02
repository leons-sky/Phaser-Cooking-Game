import RecipeBase from "../classes/base/Recipe";
import CookingRecipe from "../classes/recipeTypes/CookingRecipe";
import { Ingredients } from "../objects";

export function Recipes() {
	return {
		COOKED_EGG_RECIPE: new CookingRecipe()
			.setInput({
				item: Ingredients.EGG.create(),
				state: {
					cooked: false,
				},
			})
			.setResult(Ingredients.EGG),
		COOKED_MEAT_RECIPE: new CookingRecipe()
			.setInput({
				item: Ingredients.MEAT.create(),
				state: {
					cooked: false,
				},
			})
			.setResult(Ingredients.MEAT),
		COOKED_BACON_RECIPE: new CookingRecipe()
			.setInput({
				item: Ingredients.BACON.create(),
				state: {
					cooked: false,
				},
			})
			.setResult(Ingredients.BACON),
	};
}

export function getRecipesOfType(type: typeof RecipeBase) {
	return Object.values(Recipes()).filter((recipe) => recipe instanceof type);
}
