import { Scene } from "three";
import { getScripts, ScriptManager } from "../scripts";
import * as explorer from "../utils/Explorer.js";
import MainScene from "./MainScene";

const SVG_IMAGES: { [key: string]: string } = {
	handGrab: "/assets/images/hand/grab.svg",
	handOpen: "/assets/images/hand/open.svg",
};

const PNG_IMAGES: { [key: string]: string } = {
	smoke: "/assets/images/particles/smoke.png",
};

export default class InterfaceScene extends Phaser.Scene {
	private scriptManager?: ScriptManager;
	public main?: MainScene;

	constructor() {
		super({
			key: "InterfaceScene",
		});
	}

	preload() {
		this.scene.bringToTop("InterfaceScene");
		this.main = this.scene.get("MainScene") as MainScene;
		this.scriptManager = new ScriptManager(this.main.state);

		for (const key of Object.keys(SVG_IMAGES)) {
			this.load.svg(key, SVG_IMAGES[key]);
		}

		for (const key of Object.keys(PNG_IMAGES)) {
			this.load.image(key, PNG_IMAGES[key]);
		}
	}

	async create() {
		console.log("InterfaceScene: Create");

		this.scriptManager?.addScripts(
			await getScripts(this, "InterfaceScene")
		);
		this.scriptManager?.start();

		console.log("InterfaceScene: Start scripts");

		this.main?.state.listen("explorer", (_, value) => {
			explorer.toggle(value);
			if (value) {
				explorer.render(this.main?.third.scene as Scene);
			}
		});
	}

	update(time: number, delta: number) {
		this.scriptManager?.update(time, delta);
	}
}
