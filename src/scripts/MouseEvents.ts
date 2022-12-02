import { Object3D, Raycaster, Vector2 } from "three";
import Behaviour3D from "../classes/base/Behaviour3D";
import GameObject from "../classes/base/GameObject";
import MainScene from "../scenes/MainScene";
import { raycastSceneForGameObjects } from "../utils/Raycast";

export default class MouseEvents extends Behaviour3D<MainScene> {
	private raycaster: Raycaster;
	private currentGameObject: GameObject | null = null;

	constructor(scene: any) {
		super(scene);

		this.raycaster = new Raycaster();
	}

	raycast(position: Vector2) {
		let mouse: Vector2;
		if (this.scene.state.getValue("firstPerson")) {
			mouse = new Vector2(0, 0);
		} else {
			mouse = new Vector2(
				(position.x / this.domElement.clientWidth) * 2 - 1,
				-(position.y / this.domElement.clientHeight) * 2 + 1
			);
		}

		this.raycaster.setFromCamera(mouse, this.third.camera);

		return raycastSceneForGameObjects(this.raycaster, this.scene);
	}

	start() {
		const objectsWithPointerDown: {
			left: Object3D[];
			right: Object3D[];
		} = {
			left: [],
			right: [],
		};

		this.input.mouse.disableContextMenu();
		this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
			const pos = new Vector2(pointer.position.x, pointer.position.y);

			const result = this.raycast(pos);
			if (pointer.leftButtonDown()) {
				if (result) {
					objectsWithPointerDown.left.push(result.object);

					const event = {
						type: "mouseLeftDown",
						pointer: pointer,
						distance: result.distance,
					};
					result.object.dispatchEvent(event);
					this.events.emit(
						"gameObject-mouseLeftDown",
						event,
						result.object
					);
				}
				// console.log("left click");
			}

			if (pointer.rightButtonDown()) {
				if (result) {
					objectsWithPointerDown.right.push(result.object);

					const event = {
						type: "mouseRightDown",
						pointer: pointer,
						distance: result.distance,
					};
					result.object.dispatchEvent(event);
					this.events.emit(
						"gameObject-mouseRightDown",
						event,
						result.object
					);
				}
				// console.log("right click");
			}
		});

		this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
			if (pointer.leftButtonReleased()) {
				for (const gameObject of objectsWithPointerDown.left) {
					const event = {
						type: "mouseLeftUp",
						pointer: pointer,
					};
					gameObject.dispatchEvent(event);
					this.events.emit(
						"gameObject-mouseLeftUp",
						event,
						gameObject
					);
				}
				objectsWithPointerDown.left = [];
			}

			if (pointer.rightButtonReleased()) {
				for (const gameObject of objectsWithPointerDown.right) {
					const event = {
						type: "mouseRightUp",
						pointer: pointer,
					};
					gameObject.dispatchEvent(event);
					this.events.emit(
						"gameObject-mouseRightUp",
						event,
						gameObject
					);
				}
				objectsWithPointerDown.right = [];
			}
		});

		this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
			const result = this.raycast(
				new Vector2(pointer.position.x, pointer.position.y)
			);

			if (result?.object !== this.currentGameObject) {
				if (result) {
					const event = {
						type: "mouseEnter",
						pointer: pointer,
						distance: result?.distance,
					};
					result.object.dispatchEvent(event);
					this.events.emit(
						"gameObject-mouseEnter",
						event,
						result.object
					);
				}
				if (this.currentGameObject) {
					const event = {
						type: "mouseExit",
						pointer: pointer,
					};
					this.currentGameObject.dispatchEvent(event);
					this.events.emit(
						"gameObject-mouseExit",
						event,
						result?.object
					);
				}
			}

			this.events.emit(
				"gameObject-mouseOver",
				{
					type: "mouseOver",
					pointer: pointer,
					distance: result?.distance,
				},
				result?.object
			);
			this.currentGameObject = result?.object as GameObject;
		});
	}
}
