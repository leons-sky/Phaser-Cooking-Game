import Behaviour from "../classes/base/Behaviour";
import GameState from "../classes/base/GameState";
import DevCamera from "./DevCamera";
import DevTools from "./DevTools";
import MouseEvents from "./MouseEvents";
import Player from "./Player";
import Reticle from "./Reticle";
import Score from "./Score";
import SellFood from "./SellFood";
import Map from "./Map";

export type Scripts = Behaviour<Phaser.Scene>[];

const SCRIPTS: { [x: string]: typeof Behaviour<Phaser.Scene>[] } = {
	MainScene: [SellFood, MouseEvents, Player, DevCamera, DevTools, Map],
	InterfaceScene: [Reticle, Score],
};

export async function getScripts(
	scene: Phaser.Scene,
	sceneName: string
): Promise<Scripts> {
	const scriptNames = SCRIPTS[sceneName];

	const scripts: Scripts = [];
	for (const script of scriptNames) {
		scripts.push(new script(scene));
	}

	return scripts;
}

export class ScriptManager {
	private state: GameState;
	private scripts: Scripts;
	private started: boolean = false;

	constructor(state: GameState, scripts: Scripts = []) {
		this.scripts = scripts;
		this.state = state;

		state.addEventListener("stateChange", () => {
			for (const script of this.scripts) {
				script.checkEnabledState(state);

				if (script.enabled && !script.started && this.started) {
					script.started = true;
					script.start();
				}
			}
		});
	}

	addScripts(scripts: Scripts) {
		this.scripts = this.scripts.concat(scripts);
		for (const script of scripts) {
			script.checkEnabledState(this.state);
		}

		if (this.started) {
			for (const script of this.scripts) {
				if (!script.enabled || script.started) continue;
				script.started = true;
				script.start();
			}
		}
	}

	start() {
		if (this.started) return;
		this.started = true;

		for (const script of this.scripts) {
			script.checkEnabledState(this.state);

			if (!script.enabled || script.started) continue;
			script.started = true;
			script.start();
		}
	}

	update(time: number, delta: number) {
		for (const script of this.scripts) {
			if (!script.enabled) continue;
			script.update(time, delta);
		}
	}
}
