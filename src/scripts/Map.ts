import Behaviour3D from "../classes/base/Behaviour3D";
import { Furnature, Ingredients, Structure, Tools } from "../objects";
import MainScene from "../scenes/MainScene";

export default class Camera extends Behaviour3D<MainScene> {
	async start() {
		for (let i = 0; i < 3; i++) {
			const wall = Structure.WALL.create();
			wall.position.set(i * 2, 0, 10);
			wall.addToScene(this.scene);
		}
		{
			const doorway = Structure.DOORWAY.create();
			doorway.position.set(-2, 0, 10);
			doorway.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL.create();
			wall.position.set(-4, 0, 10);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL_CORNER.create();
			wall.position.set(6, 0, 10);
			wall.addToScene(this.scene);
		}
		for (let i = 0; i < 3; i++) {
			const wall = Structure.WALL.create();
			wall.rotateY(Math.PI * 0.5);
			wall.position.set(7 + 0.1, 0, 9 - i * 2 - 0.1);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL_CORNER.create();
			wall.rotateY(Math.PI * 0.5);
			wall.position.set(7.1, 0, 3);
			wall.addToScene(this.scene);
		}
		for (let i = -1; i < 4; i++) {
			const wall = Structure.WALL.create();
			wall.rotateY(Math.PI);
			wall.position.set(i * 2, 0, 1.9);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL_CORNER.create();
			wall.rotateY(Math.PI * -0.5);
			wall.position.set(-5.1, 0, 8.9);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL.create();
			wall.rotateY(Math.PI * -0.5);
			wall.position.set(-5.1, 0, 6.9);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.DOORWAY_WIDE.create();
			wall.rotateY(Math.PI * -0.5);
			wall.position.set(-5.1, 0, 4.9);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL_CORNER.create();
			wall.rotateY(Math.PI);
			wall.position.set(-4, 0, 1.9);
			wall.addToScene(this.scene);
		}
		{
			const wall = Structure.WALL.create();
			wall.rotateY(Math.PI * -0.5);
			wall.position.set(-5.1, 0, 2.9);
			wall.addToScene(this.scene);
		}

		{
			const roof = Structure.ROOF.create();
			roof.rotateY(Math.PI);
			roof.position.set(8, 2.5, 1);
			roof.scale.set(10, 2, 5);
			roof.addToScene(this.scene);
		}

		for (let i = 0; i < 2; i++) {
			const stove = Furnature.STOVE_ELECTRIC.create();
			stove.position.set(5 + i * 0.85, 0, 9);
			stove.rotateY(Math.PI);
			stove.addToScene(this.scene);

			const hood = Furnature.STOVE_HOOD.create();
			hood.position.set(5 + i * 0.85, 1.5, 9.35);
			hood.rotateY(Math.PI);
			hood.addToScene(this.scene);
		}

		for (let i = 1; i < 3; i++) {
			const cabinet = Furnature.CABINET.create();
			cabinet.position.set(5 - i * 0.85, 0, 9);
			cabinet.rotateY(Math.PI);
			cabinet.addToScene(this.scene);
		}

		{
			const sink = Furnature.SINK.create();
			sink.position.set(4, 0, 7);
			sink.addToScene(this.scene);
		}
		for (let i = 1; i < 3; i++) {
			const cabinet = Furnature.CABINET_DRAWER.create();
			cabinet.position.set(4 - 0.85 * i, 0, 7);
			cabinet.addToScene(this.scene);
		}
		{
			const cabinet = Furnature.CABINET_CORNER_ROUND.create();
			cabinet.position.set(4 - 3 * 0.85, 0, 7);
			cabinet.addToScene(this.scene);
		}
		{
			const cabinet = Furnature.CABINET_CORNER_ROUND.create();
			cabinet.position.set(4 - 3 * 0.85, 0, 7 - 1.8);
			cabinet.rotateY(-Math.PI * 0.5);
			cabinet.addToScene(this.scene);
		}
		{
			const cabinet = Furnature.CABINET_CORNER_ROUND.create();
			cabinet.position.set(4 + 2 * 0.85, 0, 7);
			cabinet.rotateY(Math.PI * 0.5);
			cabinet.addToScene(this.scene);
		}
		{
			const cabinet = Furnature.CABINET_CORNER_ROUND.create();
			cabinet.position.set(4 + 2 * 0.85, 0, 7 - 1.8);
			cabinet.rotateY(Math.PI);
			cabinet.addToScene(this.scene);
		}
		for (let i = -1; i < 2; i++) {
			const cabinet = Furnature.CABINET_DRAWER.create();
			cabinet.position.set(4 - 0.85 * i, 0, 7 - 1.8);
			cabinet.rotateY(Math.PI);
			cabinet.addToScene(this.scene);
		}

		{
			const fridge = Furnature.LARGE_FRIDGE.create();
			fridge.position.set(5 - 3 * 0.85 - 0.1, 0, 9.2);
			fridge.rotateY(Math.PI);
			fridge.addToScene(this.scene);
		}

		{
			const cabinet = Furnature.CABINET.create();
			cabinet.position.set(5 - 3 * 0.85 - 1.2, 0, 9);
			cabinet.rotateY(Math.PI);
			cabinet.addToScene(this.scene);
		}

		{
			const cabinet = Furnature.CABINET_DRAWER.create();
			cabinet.position.set(5 + 2 * 0.85, 0, 9);
			cabinet.rotateY(Math.PI);
			cabinet.addToScene(this.scene);
		}

		for (let i = 0; i < 6; i++) {
			const bar = Furnature.BAR.create();
			bar.position.set(0.2, 0, 10 - 0.1 - i * 0.85);
			bar.rotateY(Math.PI * 0.5);
			bar.addToScene(this.scene);
		}

		{
			const bar = Furnature.BAR_END.create();
			bar.position.set(0.2 - 0.42, 0, 10 - 6 * 0.85 - 0.31);
			bar.rotateY(Math.PI * -0.5);
			bar.addToScene(this.scene);
		}

		{
			const bar = Furnature.BAR_END.create();
			bar.position.set(0.2, 0, 10 - 6 * 0.85 - 1.1 + 0.1);
			bar.rotateY(Math.PI * 0.5);
			bar.addToScene(this.scene);
		}

		for (let i = 0; i < 2; i++) {
			const bar = Furnature.BAR.create();
			bar.position.set(0.2, 0, 10 - 6 * 0.85 - 0.1 - 1.1 - i * 0.85);
			bar.rotateY(Math.PI * 0.5);
			bar.addToScene(this.scene);
		}

		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(6, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.APPLE);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(5.5, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.AVOCADO);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(5, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.LEMON);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(4.5, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.MUSHROOM);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(4, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.ONION);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(3.5, 0.1275, 2.25);
			box.addToScene(this.scene);
			box.rotateY(Math.PI * 0.5);
			box.setIngredient(Ingredients.TOMATO);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(3, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.EGG_SHELLED);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(2.5, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.MEAT);
		}
		{
			const box = Tools.INGREDIENT_BOX.create();
			box.position.set(2, 0.1275, 2.25);
			box.rotateY(Math.PI * 0.5);
			box.addToScene(this.scene);
			box.setIngredient(Ingredients.BACON);
		}

		{
			const board = Tools.CUTTING_BOARD.create();
			board.position.set(4, 0.87, 5.6);
			board.rotateY(Math.PI * 0.5);
			board.addToScene(this.scene);
		}

		{
			const pan = Tools.FRYING_PAN.create();
			pan.position.set(3, 1, 5.5);
			pan.addToScene(this.scene);
		}
		{
			const knife = Tools.KNIFE.create();
			knife.position.set(4.5, 1, 6);
			knife.rotateY(Math.PI * 0.5);
			knife.addToScene(this.scene);
		}
	}
}
