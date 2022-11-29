import { Color, MeshStandardMaterial } from "three";
import { getScripts } from "../scripts";
import * as three from "three";
import ExtendedScene3D from "../classes/base/ExtendedScene3D";
import * as explorer from "../utils/Explorer.js";

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

		this.state.addEventListener("stateChange", console.log);

		this.state.setState({
			dev: false,
			explorer: false,
		});
	}

	async create() {
		console.log("MainScene: Create");

		console.log("MainScene: WarpSpeed");

		const { lights } = await this.third.warpSpeed(
			"-ground",
			"-orbitControls"
		);

		const ground = this.third.physics.add.ground({
			collisionFlags: 1,
			width: 200,
			height: 200,
			name: "Ground",
			y: -0.5,
		});
		ground.body.setFriction(0.8);
		ground.material = new MeshStandardMaterial({
			color: new Color(191 / 255, 146 / 255, 78 / 255),
		});

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
			if (!script.enabled) continue;
			script.start();
		}

		console.log("MainScene: Start scripts");

		this.state.listen("explorer", (_, value) => {
			explorer.toggle(value);
			if (value) {
				explorer.render(this.third.scene);
			}
		});
	}

	update(time: number, delta: number) {
		for (const script of this.scripts) {
			if (!script.enabled) continue;
			script.update(time, delta);
		}
	}
}
