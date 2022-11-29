import { Scene3D } from "@enable3d/phaser-extension";
import GameObject from "../../classes/GameObject";

export default class Stove extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Stove",
			assets: {
				model: "/gltf/furnature/kitchenStove.glb",
			},
		});
	}
}
