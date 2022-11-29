import Behaviour from "../classes/base/Behaviour";

export default class Debug extends Behaviour {
	private debugging: boolean = false;

	constructor(scene: any) {
		super(scene);

		this.input.keyboard.on("keydown-I", () => {
			if (this.third.physics.debug) {
				if (this.debugging) {
					this.third.physics.debug.disable();
				} else {
					this.third.physics.debug.enable();
				}
				this.debugging = !this.debugging;
			}
		});

		this.input.keyboard.on("keydown-L", () => {
			this.scene.state.setValue(
				"explorer",
				!this.scene.state.getValue("explorer")
			);
		});
	}
}
