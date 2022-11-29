import { ExtendedObject3D, Scene3D } from "@enable3d/phaser-extension";
import { Event, Material, MeshStandardMaterial, Object3D } from "three";

interface AssetUrls {
	[x: string]: string;
}

interface Assets {
	[x: string]: Object3D<Event>;
}

const loadedModels: Assets = {};

interface GameObjectOptions {
	name: string;
	assets: AssetUrls;
	material?: Material;
}

export default class GameObject extends ExtendedObject3D {
	protected scene: Scene3D;
	protected loaded: boolean;
	private _assets: Assets;
	protected readonly assetUrls: AssetUrls;

	constructor(scene: Scene3D, options: GameObjectOptions) {
		super();

		this.scene = scene;
		this.name = options.name;
		this.material = options.material ?? new MeshStandardMaterial();

		this._assets = {};
		this.assetUrls = options.assets;
		this.loaded = false;
	}

	get assets(): Assets {
		return this._assets;
	}

	async preloadAssets() {
		for (const key of Object.keys(this.assetUrls)) {
			const url = this.assetUrls[key];
			if (!loadedModels["/assets" + url]) {
				const gltf = await this.scene.third.load.gltf("/assets" + url);
				loadedModels["/assets" + url] = gltf.scene.children[0];
			}
		}
	}

	protected loadAssets() {
		for (const key of Object.keys(this.assetUrls)) {
			const url = this.assetUrls[key];
			if (!loadedModels["/assets" + url]) {
				throw new Error(`/assets${url} has not been preloaded`);
			}
			this._assets[key] = loadedModels["/assets" + url].clone();
		}
	}

	load(): this {
		if (this.loaded) throw new Error("Assets already loaded");
		this.loaded = true;

		this.loadAssets();
		this.onLoad();

		return this;
	}

	addToScene(scene?: Scene3D): this {
		if (scene) this.scene = scene;
		if (!this.loaded) this.load();

		this.scene.third.scene.add(this);
		return this;
	}

	onLoad(): void {
		this.add(this.assets.model);
	}
}

export declare class DefinedGameObject extends GameObject {
	constructor(scene: Scene3D);
}
