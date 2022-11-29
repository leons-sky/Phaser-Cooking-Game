import { Scene3D } from "@enable3d/phaser-extension";
import { DefinedGameObject } from "../classes/GameObject";
import Apple from "./food/Apple";
import Cake from "./food/Cake";
import Waffle from "./food/Waffle";
import Doorway from "./furnature/Doorway";
import Stove from "./furnature/Stove";
import Table from "./furnature/Table";
import Wall from "./furnature/Wall";

interface GameObjects {
	[x: string]: typeof DefinedGameObject;
}

export const Food = {
	APPLE: Apple,
	CAKE: Cake,
	WAFFLE: Waffle,
};

export const Furnature = {
	DOORWAY: Doorway,
	STOVE: Stove,
	TABLE: Table,
	WALL: Wall,
};

export async function preload(gameObjects: GameObjects, scene: Scene3D) {
	for (const key of Object.keys(gameObjects)) {
		let object = gameObjects[key];
		const obj = new object(scene);
		await obj.preloadAssets();
	}
}
