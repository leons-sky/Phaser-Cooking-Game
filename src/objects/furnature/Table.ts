import ExtendedScene3D from "../../classes/base/ExtendedScene3D";
import GameObject from "../../classes/base/GameObject";

export default class Table extends GameObject {
	constructor(scene: ExtendedScene3D) {
		super(scene, {
			name: "Table",
			assets: {
				model: "/models/furnature/table.glb",
			},
		});
	}

	static create(scene: ExtendedScene3D) {
		return new Table(scene);
	}
}
