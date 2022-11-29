import Behaviour from "../classes/base/Behaviour";
import ExtendedScene3D from "../classes/base/ExtendedScene3D";

export type Scripts = Behaviour[];

const BASE_SCRIPTS = ["MouseEvents"];

const SCRIPTS: { [x: string]: string[] } = {
	MainScene: ["Player", "DevCamera", "Debug", "Map", "TestFood"],
};

export async function getScripts(scene: ExtendedScene3D): Promise<Scripts> {
	const scriptNames = SCRIPTS[scene.name as string];

	const scripts: Scripts = [];
	for (const scriptName of BASE_SCRIPTS) {
		const module = await import(
			/* @vite-ignore */ `./base/${scriptName}.ts`
		);
		scripts.push(new module.default(scene));
	}
	for (const scriptName of scriptNames) {
		const module = await import(/* @vite-ignore */ `./${scriptName}.ts`);
		scripts.push(new module.default(scene));
	}

	return scripts;
}
