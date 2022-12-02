import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class Stove extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new Stove({
			name: "Stove",
			assets: {
				model: {
					path: "/models/furnature/kitchenStove.glb",
					// offset: new Vector3(-0.425, -0.425, 0.45),
					scale: 2,
				},
			},
			physics: true,
		});
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			// width: 0.9,
			// height: 0.85,
			// depth: 0.9,
			collisionFlags: 1,
		});
		this.body.setRestitution(0);
	}
}
