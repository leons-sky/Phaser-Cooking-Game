import { Scene3D } from "@enable3d/phaser-extension";
import { Apple, AppleHalf } from "./ingredients/Apple";
import { Avocado, AvocadoHalf } from "./ingredients/Avocado";
import Bacon from "./ingredients/Bacon";
import Cake from "./products/Cake";
import { Egg, EggShelled } from "./ingredients/Egg";
import { Lemon, LemonHalf } from "./ingredients/Lemon";
import Meat from "./ingredients/Meat";
import { Mushroom, MushroomHalf } from "./ingredients/Mushroom";
import { Tomato, TomatoSlice } from "./ingredients/Tomato";
import Waffle from "./products/Waffle";
import Doorway from "./structure/Doorway";
import Wall from "./structure/Wall";
import Stove from "./furnature/Stove";
import Table from "./furnature/Table";
import ElectricStove from "./furnature/StoveElectric";
import { Onion, OnionHalf } from "./ingredients/Onion";
import Glass from "./tools/Glass";
import GameObject from "../classes/base/GameObject";
import FryingPan from "./tools/FryingPan";
import LargeFridge from "./furnature/LargeFridge";
import Cabinet from "./furnature/Cabinet";
import Sink from "./furnature/Sink";
import StoveHood from "./furnature/StoveHood";
import CabinetDrawer from "./furnature/CabinetDrawer";
import Bar from "./furnature/Bar";
import BarEnd from "./furnature/BarEnd";
import DoorwayWide from "./structure/DoorwayWide";
import Knife from "./tools/Knife";
import WallHalf from "./structure/WallHalf";
import WallCorner from "./structure/WallCorner";
import CabinetCornerRound from "./furnature/CabinetCornerRound";
import IngredientBox from "./tools/IngredientBox";
import Food from "../classes/item/food/Food";
import Roof from "./structure/Roof";
import CuttingBoard from "./tools/CuttingBoard";

interface GameObjects {
	[x: string]: typeof GameObject;
}

export const Ingredients = {
	APPLE: Apple,
	APPLE_HALF: AppleHalf,
	AVOCADO: Avocado,
	AVOCADO_HALF: AvocadoHalf,
	BACON: Bacon,
	EGG: Egg,
	EGG_SHELLED: EggShelled,
	LEMON: Lemon,
	LEMON_HALF: LemonHalf,
	MEAT: Meat,
	MUSHROOM: Mushroom,
	MUSHROOM_HALF: MushroomHalf,
	ONION: Onion,
	ONION_HALF: OnionHalf,
	TOMATO: Tomato,
	TOMATO_SLICE: TomatoSlice,
};

export const Products = {
	CAKE: Cake,
	WAFFLE: Waffle,
};

export const Tools = {
	GLASS: Glass,
	KNIFE: Knife,
	FRYING_PAN: FryingPan,
	INGREDIENT_BOX: IngredientBox,
	CUTTING_BOARD: CuttingBoard,
};

export const Structure = {
	DOORWAY: Doorway,
	DOORWAY_WIDE: DoorwayWide,
	WALL: Wall,
	WALL_HALF: WallHalf,
	WALL_CORNER: WallCorner,
	ROOF: Roof,
};

export const Furnature = {
	STOVE: Stove,
	STOVE_ELECTRIC: ElectricStove,
	STOVE_HOOD: StoveHood,
	SINK: Sink,
	CABINET: Cabinet,
	CABINET_DRAWER: CabinetDrawer,
	CABINET_CORNER_ROUND: CabinetCornerRound,
	BAR: Bar,
	BAR_END: BarEnd,
	LARGE_FRIDGE: LargeFridge,
	TABLE: Table,
};

export async function preload(gameObjects: GameObjects, scene: Scene3D) {
	for (const key of Object.keys(gameObjects)) {
		let object = gameObjects[key];
		const obj = object.create();
		await obj.preloadAssets(scene);
		obj.destroy();
	}
}

export function preloadImages(gameObjects: GameObjects, scene: Scene3D) {
	for (const key of Object.keys(gameObjects)) {
		let object = gameObjects[key];
		const obj = object.create();
		if (obj instanceof Food) {
			obj.preloadImage(scene);
		}
		obj.destroy();
	}
}
