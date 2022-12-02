import { CollisionEvent } from "@enable3d/common/dist/types";
import { ExtendedObject3D } from "@enable3d/phaser-extension";
import { Vector3 } from "three";
import Cookable, { CookableOptions } from "../../classes/item/food/Cookable";
import { FoodOptions, FoodState } from "../../classes/item/food/Food";
import Ingredient from "../../classes/item/food/Ingredient";

export class Egg extends Cookable {
	constructor(options: CookableOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		defaultState = defaultState ?? {};
		defaultState.scoring = {
			reward: 3,
			state: {
				cooked: true,
			},
		};

		return new Egg({
			name: "Egg",
			uniqueId: "EGG",
			defaultState: defaultState,
			assets: {
				raw: {
					path: "/models/food/eggRaw.glb",
					offset: new Vector3(0, 0.008103, 0),
				},
				cooked: {
					path: "/models/food/eggCooked.glb",
					offset: new Vector3(0, 0.008103, 0),
				},
			},
			previewImage: "/images/food/eggCooked.png",
			physics: true,
			refreshCollisionBox: false,
		});
	}
}

export class EggShelled extends Ingredient {
	constructor(options: FoodOptions) {
		super(options);
	}

	static create(defaultState?: FoodState) {
		return new EggShelled({
			name: "EggShelled",
			uniqueId: "EGG_SHELLED",
			defaultState: defaultState,
			assets: {
				model: {
					path: "/models/food/egg.glb",
					// offset: new Vector3(0, -0.085, 0),
				},
			},
			previewImage: "/images/food/egg.png",
			physics: true,
		});
	}

	onCollision(otherObject: ExtendedObject3D, event: CollisionEvent) {
		super.onCollision(otherObject, event);
		if (event == "collision" && !this.dragging && this.scene) {
			const velocity = new Vector3(
				this.body.velocity.x,
				this.body.velocity.y,
				this.body.velocity.z
			);
			const otherVelocity = new Vector3(
				otherObject.body.velocity.x,
				otherObject.body.velocity.y,
				otherObject.body.velocity.z
			);
			const impulse = velocity.sub(otherVelocity);

			if (impulse.length() > 2) {
				const rawEgg = Egg.create();

				rawEgg.position.set(
					this.position.x,
					this.position.y,
					this.position.z
				);

				this.destroy();
				rawEgg.addToScene(this.scene);
			}
		}
	}
}
