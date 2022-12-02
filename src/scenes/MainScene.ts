import { MeshStandardMaterial } from "three";
import { getScripts, ScriptManager } from "../scripts";
import * as three from "three";
import ExtendedScene3D from "../classes/base/ExtendedScene3D";
import Entity from "../classes/base/Entity";
import { Ingredients, preloadImages } from "../objects";

export default class MainScene extends ExtendedScene3D {
	private scriptManager: ScriptManager;

	constructor() {
		super({
			key: "MainScene",
		});

		this.scriptManager = new ScriptManager(this.state);
	}

	init() {
		this.accessThirdDimension();
	}

	preload() {
		this.third.renderer.outputEncoding = three.sRGBEncoding;
		this.third.renderer.physicallyCorrectLights = true;

		this.state.setState({
			dev: false,
			debug: false,
			explorer: false,
			score: 0,
		});

		preloadImages(Ingredients, this);
		// preloadImages(Products, this)
	}

	async create() {
		console.log("MainScene: Create");

		console.log("MainScene: WarpSpeed");

		await this.third.warpSpeed("-ground", "-orbitControls", "-light");

		this.third.lights.hemisphereLight({
			intensity: 1,
		});

		this.third.lights.ambientLight({
			intensity: 1,
		});

		const ground = this.third.physics.add.ground({
			collisionFlags: 1,
			width: 15,
			height: 10,
			name: "Ground",
			y: -0.48,
			z: 6,
		});
		ground.body.setFriction(0.8);
		ground.material = new MeshStandardMaterial({
			color: 0x875735,
		});

		const sun = this.third.lights.directionalLight({
			intensity: 2,
			color: 0xffffff,
		});

		sun.castShadow = true;
		sun.position.set(-10, 100, -10);
		// this.third.lights.helper.directionalLightHelper(sun);

		sun.shadow.mapSize.width = 10000;
		sun.shadow.mapSize.height = 10000;

		const d = 30;
		sun.shadow.camera.left = -d;
		sun.shadow.camera.right = d;
		sun.shadow.camera.top = d;
		sun.shadow.camera.bottom = -d;

		sun.shadow.camera.far = 35000;
		sun.shadow.bias = 0;

		this.scriptManager.addScripts(await getScripts(this, "MainScene"));
		this.scriptManager.start();

		console.log("MainScene: Start scripts");

		Entity.startAll();

		console.log("MainScene: Start entities");

		this.scene.launch("InterfaceScene");
	}

	update(time: number, delta: number) {
		this.scriptManager.update(time, delta);
		Entity.updateAll(time, delta);
	}
}
