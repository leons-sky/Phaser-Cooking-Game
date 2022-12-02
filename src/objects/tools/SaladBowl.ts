import { CollisionEvent } from "@enable3d/common/dist/types";
import { ExtendedObject3D } from "@enable3d/phaser-extension";
import Ingredient from "../../classes/item/food/Ingredient";
import Item from "../../classes/item/Item";
import ItemContainer, {
	ItemContainerOptions,
} from "../../classes/item/ItemContainer";
import MixRecipe from "../../classes/recipeTypes/MixRecipe";
import { getRecipesOfType } from "../../recipes";

export default class SaladBowl extends ItemContainer {
	constructor(options: ItemContainerOptions) {
		super(options);
	}

	static create() {
		return new SaladBowl({
			name: "SaladBowl",
			uniqueId: "SALAD_BOWL",
			assets: {
				model: "/models/food/saladBowl.GLB",
				withMixture: "/models/food/saladBowlMixture.GLB",
			},
			physics: true,
			maxItems: 5,
		});
	}

	private findRecipe(ingredients: Ingredient[]): MixRecipe | null {
		const recipes = getRecipesOfType(MixRecipe);
		let bestRecipe = null;
		for (const recipe of recipes) {
			if (recipe.canCraft(ingredients)) {
				if (!bestRecipe) {
					bestRecipe = recipe as MixRecipe;
				} else if (
					recipe.getIngredientCount() >
					bestRecipe.getIngredientCount()
				) {
					bestRecipe = recipe as MixRecipe;
				}
			}
		}
		return bestRecipe;
	}

	canAddItem(item: Item) {
		return (
			super.canAddItem(item) &&
			item instanceof Ingredient &&
			["AVOCADO_HALF", "TOMATO_SLICE", "LEMON_HALF", "LETTUCE"].includes(
				item.uniqueId
			)
		);
	}

	onItemAdded(item: Ingredient) {
		item.destroyCollisionBox();

		const items = this.getItems();
		if (items.length == 1) {
			this.remove(this.children[0]);
			this.add(this.assets.withMixture);
			this.calculateShadows();
			this.refreshCollisionBox();
		}

		item.parent = this;
		item.visible = false;

		const recipe = this.findRecipe(items as Ingredient[]);
		console.log(items, recipe);
		if (recipe && this.scene) {
			const result = recipe.craft(items as Ingredient[]);

			result?.position.set(
				this.position.x,
				this.position.y,
				this.position.z
			);
			result?.rotation.set(
				this.rotation.x,
				this.rotation.y,
				this.rotation.z
			);
			result?.addToScene(this.scene);
			this.destroy();
		}
	}

	onCollision(otherObject: ExtendedObject3D, event: CollisionEvent) {
		if (event === "start") {
			if (otherObject instanceof Ingredient) {
				this.addItem(otherObject as Ingredient);
			}

			if (otherObject.name !== "SellFoodHere" || !this.scene) return;

			if (this.getItems().length > 0) {
				this.scene.state.setValue(
					"score",
					this.scene.state.getValue("score") + 2
				);
			}
			this.destroy();
		}
	}
}
