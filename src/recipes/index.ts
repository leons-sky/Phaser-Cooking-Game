import RecipeBase from "../classes/base/Recipe";
import CookingRecipe from "../classes/recipeTypes/CookingRecipe";
import MixRecipe from "../classes/recipeTypes/MixRecipe";
import { Ingredients, Products } from "../objects";

export function Recipes() {
	return {
		COOKED_EGG_RECIPE: new CookingRecipe()
			.setInput({
				item: Ingredients.EGG.create(),
				state: {
					cooked: false,
				},
			})
			.setDuration(3)
			.setResult(Ingredients.EGG),
		COOKED_MEAT_RECIPE: new CookingRecipe()
			.setInput({
				item: Ingredients.MEAT.create(),
				state: {
					cooked: false,
				},
			})
			.setDuration(30)
			.setResult(Ingredients.MEAT),
		COOKED_BACON_RECIPE: new CookingRecipe()
			.setInput({
				item: Ingredients.BACON.create(),
				state: {
					cooked: false,
				},
			})
			.setDuration(10)
			.setResult(Ingredients.BACON),
		SALAD_RECIPE: new MixRecipe()
			.addIngredients(
				Ingredients.AVOCADO_HALF.create(),
				Ingredients.TOMATO_SLICE.create(),
				Ingredients.LEMON_HALF.create(),
				Ingredients.LETTUCE.create()
			)
			.setResult(Products.SALAD),
	};
}

export function getRecipesOfType(type: typeof RecipeBase) {
	return Object.values(Recipes()).filter((recipe) => recipe instanceof type);
}
