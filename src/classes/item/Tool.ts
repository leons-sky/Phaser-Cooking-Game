import Draggable, { DraggableOptions } from "./Draggable";

export default class Tool extends Draggable {
	constructor(options: DraggableOptions) {
		super(options);
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			mass:
				typeof this._options.physics !== "boolean"
					? this._options.physics?.mass
					: 5,
		});
		this.body.setRestitution(0);
	}
}
