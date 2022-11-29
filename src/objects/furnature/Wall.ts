import { Scene3D } from "@enable3d/phaser-extension";
import { Vector3 } from "three";
import GameObject from "../../classes/GameObject";

export default class Wall extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Wall",
			assets: {
				model: "/gltf/furnature/wall.glb",
			},
		});
	}

	addToScene(scene?: Scene3D) {
		super.addToScene(scene);

		// this.scene.third.physics.createCollisionShape(
		// 	"box",
		// 	{
		// 		height: 1,
		// 		width: 1,
		// 		depth: 0.1,
		// 		offset: new Vector3(-0.5, -0.5, 0),
		// 	},
		// 	this
		// );

		this.scene.third.physics.add.box({
			height: 1,
			width: 1,
			depth: 0.1,
		});

		return this;
	}
}
