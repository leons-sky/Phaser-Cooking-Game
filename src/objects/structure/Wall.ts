import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import GameObject from "../../classes/base/GameObject";

export default class Wall extends GameObject {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Wall",
			assets: {
				model: {
					path: "/models/furnature/wall.glb",
					offset: new Vector3(-0.5, -0.65, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Wall(scene);
	}

	createCollisionBox() {
		this.scene.third.physics.add.existing(this, {
			shape: "box",
			width: 1,
			height: 1.3,
			depth: 0.05,
			collisionFlags: 1,
		});
	}
}
