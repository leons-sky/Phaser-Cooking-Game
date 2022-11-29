import { ExtendedObject3D, Scene3D } from "@enable3d/phaser-extension";
import { Material, MeshStandardMaterial, Object3D, Vector3 } from "three";
import {
	FindFirstChild,
	FindFirstChildWhichIsA,
	FindFirstAncestor,
	FindFirstAncestorWhichIsA,
} from "../../utils/Find";

import ExtendedScene3D from "./ExtendedScene3D";

export interface AssetUrlOptions {
	path: string;
	offset?: Vector3;
}

export interface AssetUrls {
	[x: string]: string | AssetUrlOptions;
}

interface Assets {
	[x: string]: Object3D;
}

const loadedModels: Assets = {};

export interface PhysicsOptions {
	mass: number;
}

export interface GameObjectOptions {
	name: string;
	assets: AssetUrls;
	material?: Material;
	physics?: boolean | PhysicsOptions;
}

export default class GameObject extends ExtendedObject3D {
	protected scene: ExtendedScene3D;
	protected loaded: boolean;
	private _assets: Assets;
	protected readonly _options: GameObjectOptions;
	protected readonly hasPhysics: boolean;
	protected readonly assetUrls: AssetUrls;

	constructor(scene: ExtendedScene3D, options: GameObjectOptions) {
		super();

		this._options = options;

		this.scene = scene;
		this.name = options.name;
		this.material = options.material ?? new MeshStandardMaterial();
		this.hasPhysics = !!options.physics;

		this._assets = {};
		this.assetUrls = options.assets;
		this.loaded = false;
	}

	static create(scene: ExtendedScene3D): GameObject {
		return new GameObject(scene, {
			name: "GameObject",
			assets: {},
		});
	}

	get assets(): Assets {
		return this._assets;
	}

	async preloadAssets() {
		for (const key of Object.keys(this.assetUrls)) {
			const data = this.assetUrls[key];
			let assetPath = typeof data === "string" ? data : data.path;
			if (!loadedModels["/assets" + assetPath]) {
				const gltf = await this.scene.third.load.gltf(
					"/assets" + assetPath
				);
				const child = gltf.scene.children[0];
				if (typeof data !== "string" && data.offset) {
					child.position.add(data.offset);
				}
				loadedModels["/assets" + assetPath] = child;
			}
		}
	}

	protected loadAssets() {
		for (const key of Object.keys(this.assetUrls)) {
			const data = this.assetUrls[key];
			let assetPath = typeof data === "string" ? data : data.path;
			if (!loadedModels["/assets" + assetPath]) {
				throw new Error(`/assets${assetPath} has not been preloaded`);
			}
			this._assets[key] = loadedModels["/assets" + assetPath].clone();
		}
	}

	load(): this {
		if (this.loaded) throw new Error("Assets already loaded");
		this.loaded = true;

		this.loadAssets();
		this.construct();

		return this;
	}

	addToScene(scene?: ExtendedScene3D): this {
		if (scene) this.scene = scene;
		if (!this.loaded) this.load();

		this.scene.third.scene.add(this);
		if (this.hasPhysics) {
			this.createCollisionBox();
		}
		return this;
	}

	construct(): void {
		this.add(this.assets.model);
	}

	createCollisionBox() {
		this.scene.third.physics.add.existing(this, {
			shape: "mesh",
			mass:
				typeof this._options.physics !== "boolean"
					? this._options.physics?.mass
					: 1,
		});
	}

	refreshCollisionBox() {
		this.scene.third.physics.destroy(this);
		this.createCollisionBox();
	}

	findFirstChild(name: string, recursive: boolean) {
		return FindFirstChild(this, name, recursive);
	}

	findFirstChildWhichIsA(objectClass: any, recursive: boolean) {
		return FindFirstChildWhichIsA(this, objectClass, recursive);
	}

	findFirstAncestor(name: string) {
		return FindFirstAncestor(this, name);
	}

	findFirstAncestorWhichIsA(objectClass: any) {
		return FindFirstAncestorWhichIsA(this, objectClass);
	}

	destroy(): void {
		this.scene.third.physics.destroy(this);
		this.parent?.remove(this);
	}

	anchored(anchor: boolean = true) {
		if (!this.body) throw new Error("GameObject has no physics");
		if (anchor) {
			this.body.setCollisionFlags(1);
		} else {
			this.body.setCollisionFlags(0);
		}
		this.body.needUpdate = true;
	}
}

export declare class DefinedGameObject extends GameObject {
	constructor(scene: Scene3D);
}
