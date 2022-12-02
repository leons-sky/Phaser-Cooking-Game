import Behaviour from "../classes/base/Behaviour";
import GameObject from "../classes/base/GameObject";
import GameState from "../classes/base/GameState";
import { MouseEvent } from "../classes/base/Interactable";
import Draggable from "../classes/item/Draggable";
import InterfaceScene from "../scenes/InterfaceScene";

export default class Reticle extends Behaviour<InterfaceScene> {
	private dot: Phaser.GameObjects.Arc;
	private grab: Phaser.GameObjects.Image;
	private open: Phaser.GameObjects.Image;
	private state: number = 0;
	private visible: boolean = true;

	override scene: InterfaceScene;

	constructor(scene: InterfaceScene) {
		super(scene);

		this.scene = scene;

		this.dot = this.scene.add.circle(0, 0, 3, 0x101010);
		this.open = this.scene.add.image(0, 0, "handOpen");
		this.grab = this.scene.add.image(0, 0, "handGrab");

		this.open.scale = 0.2;
		this.grab.scale = 0.2;

		this.dot.setVisible(false);
		this.open.setVisible(false);
		this.grab.setVisible(false);
	}

	checkEnabledState(state: GameState) {
		this.enabled = !!state.getValue("firstPerson");
		if (this.enabled) {
			this.setVisible(this.visible, false);
		} else {
			this.setVisible(false, false);
		}
	}

	setVisible(visible: boolean, updateVisibility: boolean = true) {
		const objects = [this.dot, this.open, this.grab];
		const currentObj = objects[this.state] ?? this.dot;

		for (const obj of objects) {
			if (obj === currentObj) continue;

			obj.setVisible(false);
		}

		if (updateVisibility) this.visible = visible;
		currentObj.setVisible(visible);
	}

	setState(state: number) {
		this.state = state;
		this.setVisible(this.visible);
	}

	start() {
		this.scene.main?.events.addListener(
			"gameObject-mouseOver",
			(event: MouseEvent, gameObject?: GameObject) => {
				if (gameObject && gameObject instanceof Draggable) {
					if (gameObject.dragging) {
						this.setState(2);
					} else if (gameObject.canInteract(event)) {
						this.setState(1);
					}
				} else this.setState(0);
			}
		);
	}

	update() {
		const screenCenterX =
			this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY =
			this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.dot.setPosition(screenCenterX, screenCenterY);
		this.open.setPosition(screenCenterX, screenCenterY);
		this.grab.setPosition(screenCenterX, screenCenterY);
	}
}
