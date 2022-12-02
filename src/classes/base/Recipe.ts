import Ingredient from "../item/food/Ingredient";
import Item from "../item/Item";
import Entity, { EntityState } from "./Entity";

export type RecipeResultClass = typeof Entity | null;
export type RecipeResult = Entity | null;

interface IngredientCounts {
	[id: string]: {
		required: number;
		provided: number;
		state?: EntityState;
	}[];
}

export interface RecipeIngredient {
	item: Ingredient;
	state?: EntityState;
}

export default class RecipeBase {
	static recipes: RecipeBase[] = [];

	protected ingredients: RecipeIngredient[] = [];
	private result: {
		resultClass?: RecipeResultClass;
		resultState?: EntityState;
	} = {};
	public readonly type: string;

	constructor() {
		this.type = "RecipeBase";
		RecipeBase.recipes.push(this);
	}

	getIngredientCount() {
		return this.ingredients.length;
	}

	setResult(result: RecipeResultClass, resultState?: EntityState) {
		this.result = {
			resultClass: result,
			resultState: resultState,
		};
		return this;
	}

	private countIngredients(providedIngredients: Ingredient[]) {
		const ingredientCounts: IngredientCounts = {};

		for (const ingredient of this.ingredients) {
			if (!ingredientCounts[ingredient.item.uniqueId]) {
				ingredientCounts[ingredient.item.uniqueId] = [];
			}

			const count = ingredientCounts[ingredient.item.uniqueId].filter(
				(c) =>
					(!c.state && !ingredient.state) ||
					JSON.stringify(c.state) === JSON.stringify(ingredient.state)
			)[0];
			if (count) {
				count.required++;
			} else {
				ingredientCounts[ingredient.item.uniqueId].push({
					required: 1,
					provided: 0,
					state: ingredient.state,
				});
			}
		}

		for (const ingredient of providedIngredients) {
			if (!ingredientCounts[ingredient.uniqueId]) continue;

			let matchedCount;
			for (const count of ingredientCounts[ingredient.uniqueId]) {
				if (!count.state) continue;
				if (
					Item.findItemsWithState([ingredient], count.state).length >
					0
				) {
					matchedCount = count;
				}
			}

			if (!matchedCount) {
				matchedCount = ingredientCounts[ingredient.uniqueId].filter(
					(c) => !c.state
				)[0];
			}
			if (matchedCount) matchedCount.provided++;
		}

		return ingredientCounts;
	}

	canCraft(ingredients: Ingredient[]) {
		const ingredientCounts = this.countIngredients(ingredients);

		for (const counts of Object.values(ingredientCounts)) {
			for (const count of counts) {
				if (count.provided < count.required) {
					return false;
				}
			}
		}

		return true;
	}

	craft(ingredients: Ingredient[]): RecipeResult {
		if (!this.canCraft(ingredients)) return null;

		const ingredientCounts = this.countIngredients(ingredients);
		for (const id of Object.keys(ingredientCounts)) {
			const counts = ingredientCounts[id];
			for (const count of counts) {
				if (!count.state) continue;
				let items = Item.findItemsWithState(
					Item.findItemsById(ingredients, id, count.required),
					count.state
				);
				ingredients = ingredients.filter(
					(item) => !items.includes(item)
				);
				items.forEach((item) => {
					item.destroy();
				});
			}
			const count = counts.filter((c) => !c.state)[0];
			if (count) {
				const remainingItems = Item.findItemsById(
					ingredients,
					id,
					count.required
				);
				remainingItems.forEach((item) => {
					item.destroy();
				});
			}
		}

		if (!this.result.resultClass) return null;
		return this.result.resultClass.create(this.result.resultState);
	}
}
