import { Scene3D } from "@enable3d/phaser-extension";
import { Vector3 } from "three";
import GameObject from "../../classes/GameObject";

export default class Doorway extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Doorway",
			assets: {
				door: "/gltf/furnature/doorway.glb",
				wall: "/gltf/furnature/wallDoorway.glb",
			},
		});
	}

	onLoad(): void {
		this.add(this.assets.door);
		this.children[0].position.add(new Vector3(0.25, 0, 0));
		this.add(this.assets.wall);
	}
}
