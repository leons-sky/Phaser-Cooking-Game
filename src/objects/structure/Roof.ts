import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class Roof extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new Roof({
			name: "Roof",
			assets: {
				model: {
					path: "/models/furnature/floorFull.glb",
					scale: 2,
				},
			},
			physics: true,
			shadows: {
				cast: false,
				receive: false,
			},
		});
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			collisionFlags: 1,
		});
	}
}
