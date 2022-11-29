import { Scene3D } from "@enable3d/phaser-extension";
import { MeshStandardMaterial, Vector3 } from "three";
import GameObject from "../../classes/GameObject";

export default class Cake extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Cake",
			assets: {
				model: "/gltf/food/cakeSlice.glb",
			},
		});
	}

	onLoad() {
		for (let i = 0; i < 6; i++) {
			const slice = this.assets.model.clone();
			slice.rotateY(60 * i * (Math.PI / 180));
			this.add(slice);
		}
	}

	addToScene(scene?: Scene3D) {
		super.addToScene(scene);

		this.scene.third.physics.add.existing(this, {
			shape: "cylinder",
			radius: 0.325,
			height: 0.25,
			offset: new Vector3(0, -0.125, 0),
		});

		return this;
	}
}
