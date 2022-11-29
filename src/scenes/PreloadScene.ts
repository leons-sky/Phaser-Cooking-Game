import { Scene3D } from "@enable3d/phaser-extension";
import { preload, Food, Furnature } from "../objects";

export default class PreloadScene extends Scene3D {
	constructor() {
		super({
			key: "PreloadScene",
		});
	}

	init() {
		this.accessThirdDimension();
	}

	async preload() {
		console.log("PreloadScene: Preload");

		console.log("PreloadScene: Preload assets");

		await preload(Furnature, this);
		await preload(Food, this);

		this.scene.launch("MainScene");
	}
}
