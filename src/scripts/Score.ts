import Behaviour from "../classes/base/Behaviour";
import GameState from "../classes/base/GameState";
import InterfaceScene from "../scenes/InterfaceScene";

export default class Score extends Behaviour<InterfaceScene> {
	private scoreText: Phaser.GameObjects.Text;
	private highScoreText: Phaser.GameObjects.Text;

	constructor(scene: InterfaceScene) {
		super(scene);

		this.scene = scene;

		this.scoreText = this.scene.add.text(10, 10, "Score: 0", {
			fontFamily: "sans-serif",
			fontSize: "50px",
		});
		const highScore = localStorage.getItem("highScore");
		this.highScoreText = this.scene.add.text(
			10,
			60,
			`HighScore: ${highScore ? Number(highScore) : 0}`,
			{
				fontFamily: "sans-serif",
				fontSize: "20px",
			}
		);
		this.scoreText.setVisible(false);
		this.highScoreText.setVisible(false);
	}

	checkEnabledState(state: GameState) {
		this.enabled = !!state.getValue("firstPerson");
		if (this.enabled) {
			this.scoreText.setVisible(true);
			this.highScoreText.setVisible(true);
		} else {
			this.scoreText.setVisible(false);
			this.highScoreText.setVisible(false);
		}
	}

	start() {
		this.scene.main?.state.listen("score", (_, newValue) => {
			let highScoreStr = localStorage.getItem("highScore");
			let highScore = 0;
			if (highScoreStr) {
				highScore = Number(highScoreStr);
			}
			if (highScore < newValue) {
				highScore = newValue;
				localStorage.setItem("highScore", highScore.toString());
			}
			this.highScoreText.text = `HighScore: ${highScore}`;
			this.scoreText.text = `Score: ${newValue ?? -1}`;
		});
	}
}
