import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class LargeFridge extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new LargeFridge({
			name: "LargeFridge",
			assets: {
				model: {
					path: "/models/furnature/kitchenFridgeLarge.GLB",
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
