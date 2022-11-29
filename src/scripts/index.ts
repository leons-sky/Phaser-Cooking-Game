import Behaviour from "../classes/Behaviour";
import ExtendedScene3D from "../classes/ExtendedScene3D";

export type Scripts = Behaviour[];

const SCRIPTS: { [x: string]: string[] } = {
	MainScene: ["Camera", "Map"],
};

export async function getScripts(scene: ExtendedScene3D): Promise<Scripts> {
	const scriptNames = SCRIPTS[scene.key as string];

	const scripts: Scripts = [];
	for (const scriptName of scriptNames) {
		const module = await import(`./${scriptName}.ts`);
		scripts.push(new module.default(scene));
	}

	return scripts;
}
