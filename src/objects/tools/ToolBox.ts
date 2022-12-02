import Ingredient from "../../classes/item/food/Ingredient";
import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import { Raycaster, Vector3 } from "three";
import StaticTool from "../../classes/item/StaticTool";
import { raycastSceneForGameObjects } from "../../utils/Raycast";
import { GameObjectOptions } from "../../classes/base/GameObject";
import Tool from "../../classes/item/Tool";

export default class ToolBox extends StaticTool {
	private toolClass?: typeof Tool;
	private image?: Phaser.GameObjects.Image;

	constructor(options: GameObjectOptions) {
		super(options);
	}

	static create() {
		return new ToolBox({
			name: "IngredientBox",
			assets: {
				model: {
					path: "/models/furnature/cardboardBoxClosed.glb",
					offset: new Vector3(-0.165, -0.1275, 0.165),
					scale: 1.5,
				},
			},
			physics: true,
		});
	}

	onAddToScene(scene: ExtendedScene3D) {
		let key = "";
		if (this.toolClass) {
			const temp = this.toolClass.create() as Tool;
			key = temp.getPreviewImageKey();
			temp.destroy();
		}
		this.image = scene.add.image(0, 0, key);
	}

	setIngredient(ingredientClass: typeof Ingredient) {
		this.ingredientClass = ingredientClass;
		const temp = this.ingredientClass.create() as Ingredient;
		if (!this.image)
			throw new Error("Must be added to scene before setting ingredient");
		this.image.setTexture(temp.getPreviewImageKey());
		temp.destroy();
	}

	onActivate() {
		if (!this.ingredientClass || !this.scene) return;

		const ingredient = this.ingredientClass.create();
		ingredient.position.set(
			this.position.x,
			this.position.y + 0.4,
			this.position.z
		);
		ingredient.addToScene(this.scene);
	}

	update() {
		if (!this.scene || !this.image) return;

		const cam = this.scene.third.camera;
		const forward = cam.getWorldDirection(new Vector3());
		const direction = new Vector3()
			.copy(this.position)
			.sub(new Vector3().copy(cam.position));
		if (forward.dot(direction) < 0) {
			this.image.setVisible(false);
			return;
		}
		const imagePos = this.scene.third.transform.from3dto2d(this.position);
		const raycaster = new Raycaster();
		raycaster.setFromCamera(imagePos, cam);
		const intersection = raycastSceneForGameObjects(raycaster, this.scene);
		if (!intersection) {
			this.image.setVisible(false);
			return;
		} else {
			this.image.setVisible(true);
		}

		const distance = cam.position.distanceTo(this.position);
		const size = 3 / distance;
		this.image.setPosition(imagePos.x, imagePos.y);
		this.image.setScale(size);
	}

	destroy() {
		this.image?.destroy();
		super.destroy();
	}
}
