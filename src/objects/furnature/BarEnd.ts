import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class BarEnd extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new BarEnd({
			name: "BarEnd",
			assets: {
				model: {
					path: "/models/furnature/kitchenBarEnd.GLB",
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
		this.body.setRestitution(0);
	}
}
