import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class WallCorner extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new WallCorner({
			name: "WallCorner",
			assets: {
				model: {
					path: "/models/furnature/wallCorner.glb",
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
