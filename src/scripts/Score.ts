import Behaviour from "../classes/base/Behaviour";
import GameState from "../classes/base/GameState";
import InterfaceScene from "../scenes/InterfaceScene";

export default class Score extends Behaviour<InterfaceScene> {
	private text: Phaser.GameObjects.Text;

	constructor(scene: InterfaceScene) {
		super(scene);

		this.scene = scene;

		this.text = this.scene.add.text(10, 10, "Score: 0", {
			fontFamily: "sans-serif",
			fontSize: "50px",
		});
		this.text.setVisible(false);
	}

	checkEnabledState(state: GameState) {
		this.enabled = !!state.getValue("firstPerson");
		if (this.enabled) {
			this.text.setVisible(true);
		} else {
			this.text.setVisible(false);
		}
	}

	start() {
		this.scene.main?.state.listen("score", (_, newValue) => {
			this.text.text = `Score: ${newValue ?? -1}`;
		});
	}
}
