import { Canvas, enable3d } from "@enable3d/phaser-extension";
import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import PreloadScene from "./scenes/PreloadScene";

const config: Phaser.Types.Core.GameConfig = {
	parent: "app",
	type: Phaser.WEBGL,
	transparent: true,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),
		height: window.innerHeight * Math.max(1, window.devicePixelRatio / 2),
	},
	scene: [PreloadScene, MainScene],
	...Canvas({
		antialias: true,
	}),
};

window.addEventListener("load", () => {
	enable3d(() => {
		return new Phaser.Game(config);
	}).withPhysics("/lib/ammo");
});
