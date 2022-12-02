import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class StoveHood extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new StoveHood({
			name: "StoveHood",
			assets: {
				model: {
					path: "/models/furnature/hoodLarge.glb",
					scale: 2,
				},
			},
			physics: true,
		});
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			collisionFlags: 1,
		});
	}
}
