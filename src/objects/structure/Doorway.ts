import { Vector3 } from "three";
import GameObject, { GameObjectOptions } from "../../classes/base/GameObject";

export default class Doorway extends GameObject {
	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new Doorway({
			name: "Doorway",
			assets: {
				door: {
					path: "/models/furnature/doorway.GLB",
					scale: 2,
				},
				wall: {
					path: "/models/furnature/wallDoorway.GLB",
					scale: 2,
				},
			},
			physics: true,
		});
	}

	construct(): void {
		this.add(this.assets.door);
		this.children[0].position.add(new Vector3(0.5, 0, 0));
		this.add(this.assets.wall);
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			collisionFlags: 1,
		});
	}
}
