import Entity from "../base/Entity";
import { GameObjectOptions } from "../base/GameObject";

export default class StaticTool extends Entity {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			collisionFlags: 1,
		});
		this.body.setRestitution(0);
	}
}
