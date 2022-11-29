import { Scene3D } from "@enable3d/phaser-extension";
import GameObject from "../../classes/GameObject";

export default class Waffle extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Waffle",
			assets: {
				model: "/gltf/food/waffle.glb",
			},
		});
	}
}
