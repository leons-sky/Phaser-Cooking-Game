import { CollisionEvent } from "@enable3d/common/dist/types";
import { ExtendedObject3D } from "@enable3d/phaser-extension";
import { Raycaster, Vector3 } from "three";
import { DraggableOptions } from "../../classes/item/Draggable";
import Cookable from "../../classes/item/food/Cookable";
import Item from "../../classes/item/Item";
import ItemContainer from "../../classes/item/ItemContainer";
import CookingRecipe from "../../classes/recipeTypes/CookingRecipe";
import { getRecipesOfType } from "../../recipes";
import { raycastSceneForGameObjects } from "../../utils/Raycast";
import Stove from "../furnature/Stove";
import StoveElectric from "../furnature/StoveElectric";

export default class FryingPan extends ItemContainer {
	private recipe: CookingRecipe | null = null;
	private cooking: boolean = false;
	private cookingEvent: Phaser.Time.TimerEvent | null = null;

	constructor(options: DraggableOptions) {
		super(options);
	}

	static create() {
		return new FryingPan({
			name: "FryingPan",
			uniqueId: "FRYING_PAN",
			assets: {
				model: {
					path: "/models/food/fryingPan.glb",
				},
			},
			physics: true,
		});
	}

	private findRecipe(item: Cookable): CookingRecipe | null {
		const recipes = getRecipesOfType(CookingRecipe);
		for (const recipe of recipes) {
			if (recipe.canCraft([item])) {
				return recipe;
			}
		}
		return null;
	}

	canAddItem(item: Item) {
		return (
			super.canAddItem(item) &&
			item instanceof Cookable &&
			item.getState("cooked") === false &&
			!!this.findRecipe(item)
		);
	}

	onItemAdded(item: Cookable) {
		item.destroyCollisionBox();

		item.parent = this;
		item.position.set(0, 0.01, -0.06);
		item.rotation.set(0, 0, 0);

		this.recipe = this.findRecipe(item);
	}

	private stopCooking() {
		this.cooking = false;
		if (this.cookingEvent) {
			this.cookingEvent.remove();
			this.cookingEvent = null;
		}
	}

	onItemRemoved(item: Cookable) {
		this.recipe = null;
		this.stopCooking();

		item.parent = this.parent;
		const pos = this.position;
		item.position.set(pos.x, pos.y + 0.2, pos.z);

		item.refreshCollisionBox();
	}

	onCollision(otherObject: ExtendedObject3D, event: CollisionEvent) {
		if (event === "start") {
			if (!(otherObject instanceof Cookable)) return;
			this.addItem(otherObject as Cookable);
		}
	}

	update(time: number, delta: number) {
		super.update(time, delta);

		const item = this.getItem(0) as Cookable;
		if (this.recipe && item && this.scene) {
			const raycaster = new Raycaster();
			raycaster.set(this.position, new Vector3(0, -1, 0));

			const stove = raycastSceneForGameObjects(
				raycaster,
				this.scene,
				undefined,
				{
					classes: [Stove, StoveElectric],
				}
			);
			if (this.cooking) {
				if (!stove || stove.distance > 0.1) {
					this.stopCooking();
				}
			} else if (stove && stove.distance < 0.1) {
				this.cooking = true;
				this.cookingEvent = this.scene.time.delayedCall(
					this.recipe.duration * 1000,
					() => {
						if (!this.recipe) return;
						this.cookingEvent = null;
						this.stopCooking();

						this.recipe.craft([item]);
						this.removeItem(item);
					}
				);
			}
		}

		if (this.cooking && !item) {
			this.stopCooking();
		}
	}
}
