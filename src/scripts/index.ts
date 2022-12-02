import Behaviour from "../classes/base/Behaviour";
import GameState, { StateChangeEvent } from "../classes/base/GameState";

export type Scripts = Behaviour<Phaser.Scene>[];

const SCRIPTS: { [x: string]: string[] } = {
	MainScene: [
		"SellFood",
		"MouseEvents",
		"Player",
		"DevCamera",
		"DevTools",
		"Map",
	],
	InterfaceScene: ["Reticle", "Score"],
};

export async function getScripts(
	scene: Phaser.Scene,
	sceneName: string
): Promise<Scripts> {
	const scriptNames = SCRIPTS[sceneName];

	const scripts: Scripts = [];
	for (const scriptName of scriptNames) {
		const module = await import(/* @vite-ignore */ `./${scriptName}.ts`);
		scripts.push(new module.default(scene));
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
