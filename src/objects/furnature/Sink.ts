import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class Sink extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new Sink({
			name: "Sink",
			assets: {
				model: {
					path: "/models/furnature/kitchenSink.GLB",
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
