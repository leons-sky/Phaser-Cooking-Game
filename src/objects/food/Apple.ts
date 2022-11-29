import { Scene3D } from "@enable3d/phaser-extension";
import { Vector3 } from "three";
import GameObject from "../../classes/GameObject";

export default class Apple extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Apple",
			assets: {
				model: "/gltf/food/apple.glb",
				half: "/gltf/food/appleHalf.glb",
			},
		});
	}

	addToScene(scene?: Scene3D) {
		super.addToScene(scene);

		this.scene.third.physics.add.existing(this, {
			shape: "sphere",
			radius: 0.1,
			offset: new Vector3(0, -0.09, 0),
		});

		return this;
	}
}
