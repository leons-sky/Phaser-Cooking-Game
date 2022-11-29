import ExtendedScene3D from "./ExtendedScene3D";
import GameObject, { GameObjectOptions } from "./GameObject";

export default class Interactable extends GameObject {
	constructor(scene: ExtendedScene3D, options: GameObjectOptions) {
		super(scene, options);

		this.addEventListener("mouseDown", () => {
			this.onActivate();
			this.onMouseDown();
		});

		this.addEventListener("mouseUp", () => {
			this.onMouseUp();
		});

		this.addEventListener("mouseEnter", () => {
			this.onMouseEnter();
		});

		this.addEventListener("mouseExit", () => {
			this.onMouseExit();
		});
	}

	onActivate() {}

	onMouseDown() {}

	onMouseUp() {}

	onMouseEnter() {}

	onMouseExit() {}
}
