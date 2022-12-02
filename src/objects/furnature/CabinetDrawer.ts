import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class CabinetDrawer extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new CabinetDrawer({
			name: "CabinetDrawer",
			assets: {
				model: {
					path: "/models/furnature/kitchenCabinetDrawer.glb",
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
