import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class WallHalf extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new WallHalf({
			name: "WallHalf",
			assets: {
				model: {
					path: "/models/furnature/wallHalf.GLB",
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
