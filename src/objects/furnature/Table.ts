import { Scene3D } from "@enable3d/phaser-extension";
import GameObject from "../../classes/GameObject";

export default class Table extends GameObject {
	constructor(scene: Scene3D) {
		super(scene, {
			name: "Table",
			assets: {
				model: "/gltf/furnature/table.glb",
			},
		});
	}
}
