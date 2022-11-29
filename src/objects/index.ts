import { Scene3D } from "@enable3d/phaser-extension";
import GameObject from "../classes/GameObject";
import Apple from "./food/Apple";
import Cake from "./food/Cake";
import Waffle from "./food/Waffle";
import Doorway from "./furnature/Doorway";
import Stove from "./furnature/Stove";
import Table from "./furnature/Table";
import Wall from "./furnature/Wall";

export const Food = {
	preload: async function (scene: Scene3D) {
		for (const key of Object.keys(this)) {
			const object = this[key];
			if (object.prototype instanceof GameObject) {
				const obj = new object(scene);
				await obj.preloadAssets();
			}
		}
	},
	APPLE: Apple,
	CAKE: Cake,
	WAFFLE: Waffle,
};

export const Furnature = {
	preload: async function (scene: Scene3D) {
		for (const key of Object.keys(this)) {
			const object = this[key];
			if (object.prototype instanceof GameObject) {
				const obj = new object(scene);
				await obj.preloadAssets();
			}
		}
	},
	DOORWAY: Doorway,
	STOVE: Stove,
	TABLE: Table,
	WALL: Wall,
};
