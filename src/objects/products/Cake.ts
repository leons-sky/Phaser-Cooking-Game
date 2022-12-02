import { Vector3 } from "three";
import Food from "../../classes/item/food/Food";
import { ItemOptions } from "../../classes/item/Item";

export default class Cake extends Food {
	constructor(options: ItemOptions) {
		super(options);
	}

	static create() {
		return new Cake({
			name: "Cake",
			uniqueId: "CAKE",
			assets: {
				model: {
					path: "/models/food/cakeSlice.glb",
					offset: new Vector3(0, -0.15, 0),
				},
			},
			physics: {
				mass: 3,
			},
		});
	}

	construct() {
		for (let i = 0; i < 6; i++) {
			const slice = this.assets.model.clone();
			slice.rotateY(60 * i * (Math.PI / 180));
			this.add(slice);
		}
	}

	onActivate() {
		this.body.applyForceY(1);
		this.removeSlice();
	}

	removeSlice() {
		const slice = this.children[0];

		if (this.children.length <= 1) {
			this.destroy();
		} else {
			this.remove(slice);
			this.refreshCollisionBox();
		}
	}
}
