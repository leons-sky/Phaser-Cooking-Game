import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class Wall extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new Wall({
			name: "Wall",
			assets: {
				model: {
					path: "/models/furnature/wall.glb",
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
