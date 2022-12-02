import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class DoorwayWide extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new DoorwayWide({
			name: "DoorwayWide",
			assets: {
				model: {
					path: "/models/furnature/wallDoorwayWide.glb",
					scale: 2,
				},
			},
			// physics: true,
		});
	}

	// createCollisionBox() {
	// 	this.scene?.third.physics.add.existing(this, {
	// 		shape: "mesh",
	// 		collisionFlags: 5,
	// 	});
	// }
}
