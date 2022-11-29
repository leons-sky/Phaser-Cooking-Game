import { Scene3D } from "@enable3d/phaser-extension";
import { AudioManager } from "@yandeu/audio";
import { Scripts } from "../../scripts";
import GameState from "./GameState";

export default class ExtendedScene3D extends Scene3D {
	protected scripts: Scripts;
	public audio: AudioManager;
	public state: GameState;
	public name?: string;
	public readonly type: string = "ExtendedScene3D";

	constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
		super(config);

		this.name = typeof config == "string" ? config : config.key;
		this.scripts = [];
		this.audio = new AudioManager();
		this.state = new GameState();
	}
}
