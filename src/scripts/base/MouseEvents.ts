import { LineSegments, Raycaster, Vector2 } from "three";
import Behaviour from "../../classes/base/Behaviour";
import GameObject from "../../classes/base/GameObject";
import { FindFirstAncestorWhichIsA } from "../../utils/Find";

const _mouseDownEvent = { type: "mouseDown" };
const _mouseUpEvent = { type: "mouseUp" };
const _mouseEnterEvent = { type: "mouseEnter" };
const _mouseExitEvent = { type: "mouseExit" };

export default class MouseEvents extends Behaviour {
	private raycaster: Raycaster;
	private currentGameObject: GameObject | null = null;

	constructor(scene: any) {
		super(scene);

		this.raycaster = new Raycaster();
	}

	raycast(position: { x: number; y: number }) {
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
		const intersection = this.raycaster.intersectObjects(
			this.third.scene.children,
			true
		);

		if (!intersection) return;

		const meshes = intersection.filter(
			(obj) => !(obj.object instanceof LineSegments)
		);

		if (meshes.length == 0) return;

		return FindFirstAncestorWhichIsA(meshes[0].object, GameObject);
	}

	start() {
		this.tap.on.move((event) => {
			const gameObject = this.raycast(event.position) as GameObject;

			if (gameObject !== this.currentGameObject) {
				if (gameObject) {
					gameObject.dispatchEvent(_mouseEnterEvent);
				}
				if (this.currentGameObject) {
					this.currentGameObject.dispatchEvent(_mouseExitEvent);
				}
			}

			this.currentGameObject = gameObject;
		});

		this.tap.on.down((event) => {
			const gameObject =
				this.currentGameObject ?? this.raycast(event.position);

			if (gameObject) gameObject.dispatchEvent(_mouseDownEvent);
		});

		this.tap.on.up((event) => {
			const gameObject =
				this.currentGameObject ?? this.raycast(event.position);

			if (gameObject) gameObject.dispatchEvent(_mouseUpEvent);
		});
	}
}
