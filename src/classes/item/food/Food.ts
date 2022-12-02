import { CollisionEvent } from "@enable3d/common/dist/types";
import { ExtendedObject3D, Scene3D } from "@enable3d/phaser-extension";
import { EntityState } from "../../base/Entity";
import Draggable, { DraggableOptions } from "../Draggable";

export interface FoodState extends EntityState {
	scoring?: {
		reward: number;
		state?: EntityState;
	};
}

export interface FoodOptions extends DraggableOptions {
	defaultState?: FoodState;
	previewImage: string;
}

export default class Food extends Draggable {
	private previewImageUrl: string;

	constructor(options: FoodOptions) {
		options.defaultState = options.defaultState ?? {};
		if (options.defaultState.scoring == null) {
			options.defaultState.scoring = {
				reward: 0,
				state: {},
			};
		}
		if (options.defaultState.scoring.state == null) {
			options.defaultState.scoring.state = {};
		}

		super(options);

		this.previewImageUrl = options.previewImage;
	}

	getPreviewImageKey() {
		return this.constructor.name + "Preview";
	}

	preloadImage(scene: Scene3D) {
		scene.load.image(
			this.getPreviewImageKey(),
			"/assets" + this.previewImageUrl
		);
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			mass:
				typeof this._options.physics !== "boolean"
					? this._options.physics?.mass
					: 3,
		});
		this.body.setRestitution(0.1);
	}

	onCollision(otherObject: ExtendedObject3D, event: CollisionEvent) {
		if (!this.scene || event !== "start") return;
		if (otherObject.name !== "SellFoodHere") return;

		const scoring = this.getState("scoring") as {
			reward: number;
			state: EntityState;
		};
		if (scoring.reward > 0) {
			let canScore = true;
			if (Object.keys(scoring.state).length > 0) {
				const itemState = this.getAllState();
				for (const key of Object.keys(scoring.state)) {
					if (itemState[key] !== scoring.state[key]) {
						canScore = false;
						break;
					}
				}
			}

			if (canScore) {
				this.scene.state.setValue(
					"score",
					this.scene.state.getValue("score") + scoring.reward
				);
			}
		}
		this.destroy();
	}
}
