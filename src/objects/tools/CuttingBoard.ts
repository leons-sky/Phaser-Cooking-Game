import Draggable, { DraggableOptions } from "../../classes/item/Draggable";

export default class CuttingBoard extends Draggable {
	constructor(options: DraggableOptions) {
		super(options);
	}

	static create() {
		return new CuttingBoard({
			name: "CuttingBoard",
			uniqueId: "CUTTING_BOARD",
			assets: {
				model: {
					path: "/models/food/cuttingBoard.GLB",
				},
			},
			physics: {
				mass: 15,
			},
		});
	}
}
