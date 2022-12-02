import { Scene3D } from "@enable3d/phaser-extension";
import GameState from "./GameState";

export default class ExtendedScene3D extends Scene3D {
	public state: GameState;
	public name?: string;
	public readonly type: string = "ExtendedScene3D";

	constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
		super(config);

		this.name = typeof config == "string" ? config : config.key;
		this.state = new GameState();
	}
}
