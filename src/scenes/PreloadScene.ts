import { Scene3D } from "@enable3d/phaser-extension";
import {
	preload,
	Furnature,
	Ingredients,
	Products,
	Structure,
	Tools,
} from "../objects";

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

		await preload(Structure, this);
		await preload(Furnature, this);
		await preload(Ingredients, this);
		await preload(Products, this);
		await preload(Tools, this);

		this.scene.launch("MainScene");
	}
}
