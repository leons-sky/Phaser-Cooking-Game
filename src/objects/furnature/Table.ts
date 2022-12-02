import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class Table extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new Table({
			name: "Table",
			assets: {
				model: {
					path: "/models/furnature/table.GLB",
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
