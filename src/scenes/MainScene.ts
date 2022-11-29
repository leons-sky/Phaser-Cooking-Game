import { Color, MeshStandardMaterial } from "three";
import { getScripts } from "../scripts";
import * as three from "three";
import ExtendedScene3D from "../classes/ExtendedScene3D";

export default class MainScene extends ExtendedScene3D {
	constructor() {
		super({
			key: "MainScene",
		});
	}

	init() {
		this.accessThirdDimension();
	}

	preload() {
		this.third.renderer.outputEncoding = three.sRGBEncoding;
		this.third.renderer.physicallyCorrectLights = true;
		this.third.physics.debug?.enable();
	}

	async create() {
		console.log("MainScene: Create");

		console.log("MainScene: WarpSpeed");

		const { lights, ground } = await this.third.warpSpeed();
		if (ground) {
			ground.material = new MeshStandardMaterial({
				color: new Color(191 / 255, 146 / 255, 78 / 255),
			});
		}

		const intensity = 1;
		if (lights?.hemisphereLight) {
			lights.hemisphereLight.intensity = intensity;
		}
		if (lights?.ambientLight) {
			lights.ambientLight.intensity = intensity;
		}
		if (lights?.directionalLight) {
			lights.directionalLight.intensity = intensity;
		}

		this.scripts = await getScripts(this);

		for (const script of this.scripts) {
			script.start();
		}

		console.log("MainScene: Start scripts");
	}

	update(time: number, delta: number) {
		for (const script of this.scripts) {
			script.update(time, delta);
		}
	}
}
