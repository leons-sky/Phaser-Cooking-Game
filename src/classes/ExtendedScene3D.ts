import { Scene3D } from "@enable3d/phaser-extension";
import { AudioManager } from "@yandeu/audio";
import { Scripts } from "../scripts";

export default class ExtendedScene3D extends Scene3D {
	protected scripts: Scripts;
	protected audio: AudioManager;
	public key?: string;

	constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
		super(config);

		this.key = typeof config == "string" ? config : config.key;
		this.scripts = [];
		this.audio = new AudioManager();
	}
}
