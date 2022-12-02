import { ExtendedObject3D } from "@enable3d/phaser-extension";
import { Event } from "three";
import { CollisionEvent } from "@enable3d/common/dist/types";
import GameObject, { GameObjectOptions } from "./GameObject";

export interface MouseEvent extends Event {
	pointer: Phaser.Input.Pointer;
	distance?: number;
}

export default class Interactable extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);

		this.addEventListener("mouseLeftDown", (event) => {
			this.onActivate(event as MouseEvent);
			this.onMouseLeftDown(event as MouseEvent);
		});

		this.addEventListener("mouseLeftUp", (event) => {
			this.onDeactivate(event as MouseEvent);
			this.onMouseLeftUp(event as MouseEvent);
		});

		this.addEventListener("mouseRightDown", (event) => {
			this.onActivate(event as MouseEvent);
			this.onMouseRightDown(event as MouseEvent);
		});

		this.addEventListener("mouseRightUp", (event) => {
			this.onDeactivate(event as MouseEvent);
			this.onMouseRightUp(event as MouseEvent);
		});

		this.addEventListener("mouseEnter", (event) => {
			this.onMouseEnter(event as MouseEvent);
		});

		this.addEventListener("mouseExit", (event) => {
			this.onMouseExit(event as MouseEvent);
		});
	}

	refreshCollisionBox() {
		super.refreshCollisionBox();

		this.body.on.collision((otherObject, event) => {
			if (this.destroyed) return;
			this.onCollision(otherObject, event);
		});
	}

	canInteract(event: MouseEvent): boolean {
		return true;
	}

	onActivate(event: MouseEvent) {}

	onDeactivate(event: MouseEvent) {}

	onMouseLeftDown(event: MouseEvent) {}

	onMouseLeftUp(event: MouseEvent) {}

	onMouseRightDown(event: MouseEvent) {}

	onMouseRightUp(event: MouseEvent) {}

	onMouseEnter(event: MouseEvent) {}

	onMouseExit(event: MouseEvent) {}

	onCollision(otherObject: ExtendedObject3D, event: CollisionEvent) {}
}
