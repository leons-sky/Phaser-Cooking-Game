import { Scene3D } from "@enable3d/phaser-extension";
import { DefinedGameObject } from "../classes/base/GameObject";
import { Apple, AppleHalf } from "./ingredients/Apple";
import { Avocado, AvocadoHalf } from "./ingredients/Avocado";
import Bacon from "./ingredients/Bacon";
import Cake from "./products/Cake";
import Egg from "./ingredients/Egg";
import { Lemon, LemonHalf } from "./ingredients/Lemon";
import Meat from "./ingredients/Meat";
import { Mushroom, MushroomHalf } from "./ingredients/Mushroom";
import { Tomato, TomatoSlice } from "./ingredients/Tomato";
import Waffle from "./products/Waffle";
import Doorway from "./structure/Doorway";
import Wall from "./structure/Wall";
import Stove from "./furnature/Stove";
import Table from "./furnature/Table";

interface GameObjects {
	[x: string]: typeof DefinedGameObject;
}

export const Ingredients = {
	APPLE: Apple,
	APPLE_HALF: AppleHalf,
	AVOCADO: Avocado,
	AVOCADO_HALF: AvocadoHalf,
	BACON: Bacon,
	EGG: Egg,
	LEMON: Lemon,
	LEMON_HALF: LemonHalf,
	MEAT: Meat,
	MUSHROOM: Mushroom,
	MUSHROOM_HALF: MushroomHalf,
	TOMATO: Tomato,
	TOMATO_SLICE: TomatoSlice,
};

export const Products = {
	CAKE: Cake,
	WAFFLE: Waffle,
};

export const Structure = {
	DOORWAY: Doorway,
	WALL: Wall,
};

export const Furnature = {
	STOVE: Stove,
	TABLE: Table,
};

export async function preload(gameObjects: GameObjects, scene: Scene3D) {
	for (const key of Object.keys(gameObjects)) {
		let object = gameObjects[key];
		const obj = new object(scene);
		await obj.preloadAssets();
	}
}
