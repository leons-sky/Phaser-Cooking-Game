import { Scene3D } from "@enable3d/phaser-extension";
import { Food, Furnature } from "../objects";

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

		await Furnature.preload(this);
		await Food.preload(this);

		this.scene.launch("MainScene");
	}
}
