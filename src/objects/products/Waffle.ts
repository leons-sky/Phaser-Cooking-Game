import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import GameObject from "../../classes/base/GameObject";

export default class Waffle extends GameObject {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Waffle",
			assets: {
				model: "/models/food/waffle.glb",
			},
			physics: true,
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Waffle(scene);
	}
}
