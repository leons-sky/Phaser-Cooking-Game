import Phaser from "phaser";
import GameState from "./GameState";

const app = document.getElementById("app") as HTMLElement;

export default class Behaviour<T extends Phaser.Scene> {
	/**
	 * Reference to the domElement
	 */
	domElement: HTMLElement = app;

	/**
	 * If the behaviour is enabled
	 */
	enabled: boolean = true;

	started: boolean = false;

	/**
	 * A reference to the current scene.
	 */
	scene: T;

	/**
	 * A reference to the Phaser.Game instance.
	 *
	 * This property will only be available if defined in the Scene Injection Map.
	 */
	game: Phaser.Game;

	/**
	 * A reference to the global Cache.
	 *
	 * This property will only be available if defined in the Scene Injection Map.
	 */
	cache: Phaser.Cache.CacheManager;

	/**
	 * A reference to the global Data Manager.
	 *
	 * This property will only be available if defined in the Scene Injection Map.
	 */
	registry: Phaser.Data.DataManager;

	/**
	 * A reference to the Sound Manager.
	 *
	 * This property will only be available if defined in the Scene Injection Map and the plugin is installed.
	 */
	sound:
		| Phaser.Sound.NoAudioSoundManager
		| Phaser.Sound.HTML5AudioSoundManager
		| Phaser.Sound.WebAudioSoundManager;

	/**
	 * A Scene specific Event Emitter.
	 *
	 * This property will only be available if defined in the Scene Injection Map.
	 */
	events: Phaser.Events.EventEmitter;

	/**
	 * The Scene Camera Manager.
	 *
	 * This property will only be available if defined in the Scene Injection Map.
	 */
	cameras: Phaser.Cameras.Scene2D.CameraManager;

	/**
	 * A Scene specific Data Manager Plugin.
	 *
	 * See the `registry` property for the global Data Manager.
	 *
	 * This property will only be available if defined in the Scene Injection Map and the plugin is installed.
	 */
	data: Phaser.Data.DataManager;

	/**
	 * The Scene Input Manager Plugin.
	 *
	 * This property will only be available if defined in the Scene Injection Map and the plugin is installed.
	 */
	input: Phaser.Input.InputPlugin;

	/**
	 * The Scene Time and Clock Plugin.
	 *
	 * This property will only be available if defined in the Scene Injection Map and the plugin is installed.
	 */
	time: Phaser.Time.Clock;

	/**
	 * A reference to the global Plugin Manager.
	 *
	 * The Plugin Manager is a global system that allows plugins to register themselves with it, and can then install
	 * those plugins into Scenes as required.
	 */
	plugins: Phaser.Plugins.PluginManager;

	/**
	 * A reference to the renderer instance Phaser is using, either Canvas Renderer or WebGL Renderer.
	 */
	renderer:
		| Phaser.Renderer.Canvas.CanvasRenderer
		| Phaser.Renderer.WebGL.WebGLRenderer;

	constructor(scene: T) {
		this.scene = scene;
		this.game = scene.game;
		this.cache = scene.cache;
		this.registry = scene.registry;
		this.sound = scene.sound;
		this.cameras = scene.cameras;
		this.events = scene.events;
		this.data = scene.data;
		this.input = scene.input;
		this.time = scene.time;
		this.plugins = scene.plugins;
		this.renderer = scene.renderer;
	}

	/**
	 * This method should be overriden by your own Behaviours.
	 *
	 * This method is called during game initialization.
	 */
	init() {}

	/**
	 * This method should be overriden by your own Behaviours.
	 *
	 * This method is called at the start of the game.
	 */
	start() {}

	/**
	 * This method should be overridden by your own Behaviours.
	 *
	 * This method is called once per game step while the scene is running.
	 * @param time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
	 * @param delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
	 */
	update(time: number, delta: number) {}

	checkEnabledState(state: GameState) {}
}
