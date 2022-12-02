import Behaviour3D from "../classes/base/Behaviour3D";
import ExtendedScene3D from "../classes/base/ExtendedScene3D";

export default class DevTools extends Behaviour3D<ExtendedScene3D> {
	start() {
		this.scene.state.listen("debug", (_, value) => {
			if (this.third.physics.debug) {
				if (value) {
					this.third.physics.debug.enable();
				} else {
					this.third.physics.debug.disable();
				}
			}
		});

		this.input.keyboard.on("keydown-I", () => {
			this.scene.state.setValue(
				"debug",
				!this.scene.state.getValue("debug")
			);
		});

		this.input.keyboard.on("keydown-L", () => {
			this.scene.state.setValue(
				"explorer",
				!this.scene.state.getValue("explorer")
			);
		});
		this.input.keyboard.on("keydown-O", () => {
			this.scene.state.setValue("dev", !this.scene.state.getValue("dev"));
		});
	}
}
