import { CollisionEvent } from "@enable3d/common/dist/types";
import { ExtendedObject3D } from "@enable3d/phaser-extension";
import { Quaternion, Raycaster, Vector3 } from "three";
import { DraggableOptions } from "../../classes/item/Draggable";
import Sliceable from "../../classes/item/food/Sliceable";
import Tool from "../../classes/item/Tool";
import { raycastSceneForGameObjects } from "../../utils/Raycast";
import CuttingBoard from "./CuttingBoard";

export default class Knife extends Tool {
	constructor(options: DraggableOptions) {
		super(options);
	}

	static create() {
		return new Knife({
			name: "Knife",
			uniqueId: "KNIFE",
			assets: {
				model: {
					path: "/models/food/cookingKnife.glb",
				},
			},
			physics: true,
			dragRotationOffset: new Quaternion().setFromAxisAngle(
				new Vector3(1, 0, 0),
				-Math.PI * 0.5
			),
		});
	}

	onCollision(otherObject: ExtendedObject3D, event: CollisionEvent) {
		if (event === "collision" && this.scene) {
			if (!(otherObject instanceof Sliceable)) return;
			const raycaster = new Raycaster();
			raycaster.set(otherObject.position, new Vector3(0, -1, 0));

			const board = raycastSceneForGameObjects(
				raycaster,
				this.scene,
				undefined,
				{
					classes: CuttingBoard,
				}
			);
			if (board && board.distance < 0.2) {
				otherObject.slice();
			}
		}
	}
}
