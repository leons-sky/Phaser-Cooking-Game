import { Vector3 } from "three";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import GameObject from "../../classes/base/GameObject";

export default class Doorway extends GameObject {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Doorway",
			assets: {
				door: {
					path: "/models/furnature/doorway.glb",
					offset: new Vector3(-0.5, -0.65, 0),
				},
				wall: {
					path: "/models/furnature/wallDoorway.glb",
					offset: new Vector3(-0.5, -0.65, 0),
				},
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Doorway(scene);
	}

	construct(): void {
		this.add(this.assets.door);
		this.children[0].position.add(new Vector3(0.25, 0, 0));
		this.add(this.assets.wall);
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
