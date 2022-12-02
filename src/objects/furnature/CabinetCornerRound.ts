import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class CabinetCornerRound extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new CabinetCornerRound({
			name: "CabinetCornerRound",
			assets: {
				model: {
					path: "/models/furnature/kitchenCabinetCornerRound.GLB",
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
