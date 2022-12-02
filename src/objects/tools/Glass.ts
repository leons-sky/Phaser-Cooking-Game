import Tool from "../../classes/item/Tool";
import { DraggableOptions } from "../../classes/item/Draggable";

export default class Glass extends Tool {
	constructor(options: DraggableOptions) {
		super(options);
	}

	static create() {
		return new Glass({
			name: "Glass",
			uniqueId: "GLASS",
			assets: {
				model: {
					path: "/models/food/glass.glb",
					// offset: new Vector3(0, -0.085, 0),
				},
			},
			physics: true,
		});
	}
}
