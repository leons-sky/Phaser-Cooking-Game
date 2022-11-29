import ExtendedScene3D from "../base/ExtendedScene3D";
import { GameObjectOptions } from "../base/GameObject";
import Interactable from "../base/Interactable";

export default class Ingredient extends Interactable {
	constructor(scene: ExtendedScene3D, options: GameObjectOptions) {
		super(scene, options);
	}

	createCollisionBox() {
		this.scene.third.physics.add.existing(this, {
			shape: "hull",
			mass:
				typeof this._options.physics !== "boolean"
					? this._options.physics?.mass
					: undefined,
		});
	}
}
