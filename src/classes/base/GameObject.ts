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
	scale?: number | Vector3;
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
	shadows?: {
		cast?: boolean;
		receive?: boolean;
	};
}

export default class GameObject extends ExtendedObject3D {
	protected scene?: ExtendedScene3D;
	protected loaded: boolean;
	private _assets: Assets;
	protected readonly _options: GameObjectOptions;
	protected readonly hasPhysics: boolean;
	protected readonly assetUrls: AssetUrls;
	public destroyed: boolean = false;

	constructor(options: GameObjectOptions) {
		super();

		this._options = options;

		this.name = options.name + this.id;
		this.material = options.material ?? new MeshStandardMaterial();
		this.hasPhysics = !!options.physics;

		this._assets = {};
		this.assetUrls = options.assets;
		this.loaded = false;

		this.type = "GameObject";
	}

	static create(): GameObject {
		return new GameObject({
			name: "GameObject",
			assets: {},
		});
	}

	get assets(): Assets {
		return this._assets;
	}

	async preloadAssets(scene: Scene3D) {
		for (const key of Object.keys(this.assetUrls)) {
			const data = this.assetUrls[key];
			let assetPath = typeof data === "string" ? data : data.path;
			if (!loadedModels["/assets" + assetPath]) {
				const gltf = await scene.third.load.gltf("/assets" + assetPath);
				const child = gltf.scene.children[0];
				if (typeof data !== "string") {
					if (data.offset) child.position.add(data.offset);
					if (data.scale) {
						if (data.scale instanceof Vector3)
							child.scale.multiply(data.scale);
						else child.scale.multiplyScalar(data.scale);
					}
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

	load() {
		if (this.loaded) throw new Error("Assets already loaded");
		this.loaded = true;

		this.loadAssets();
		this.construct();
	}

	addToScene(scene: ExtendedScene3D) {
		this.scene = scene;
		if (!this.loaded) this.load();

		scene.third.scene.add(this);
		this.refreshCollisionBox();
		this.calculateShadows();

		this.onAddToScene(scene);
	}

	onAddToScene(scene: ExtendedScene3D) {}

	construct() {
		this.add(this.assets.model);
	}

	calculateShadows() {
		const shadows = this._options.shadows ?? {};
		this.traverse((object) => {
			if (object.isMesh) {
				object.castShadow =
					shadows.cast !== undefined ? shadows.cast : true;
				object.receiveShadow =
					shadows.receive !== undefined ? shadows.receive : true;
			}
		});
	}

	createCollisionBox() {
		this.scene?.third.physics.add.existing(this, {
			shape: "mesh",
			mass:
				typeof this._options.physics !== "boolean"
					? this._options.physics?.mass
					: 1,
		});
	}

	refreshCollisionBox() {
		if (!this.hasPhysics) return;

		if (this.body) this.destroyCollisionBox();
		this.createCollisionBox();
		this.body.setGravity(0, -30, 0);
	}

	destroyCollisionBox() {
		if (!this.scene) return;
		// this.scene?.third.physics.destroy(this);
		// reimplementation of above method to resolve bug where multiple rigid bodies are removed
		if (!this.body) return;
		const physics = this.scene.third.physics;
		// @ts-expect-error: threeObject does not exist on btRigidBody.
		const obj = this.body.ammo.threeObject;
		if (!obj.body) return;
		if (obj.body.ammo) physics.physicsWorld.removeRigidBody(obj.body.ammo);
		obj.body.destructor();
		obj.body = null;
		obj.hasBody = false;
		for (let i = 0; i < physics.rigidBodies.length; i++) {
			if (physics.rigidBodies[i] === obj) {
				physics.rigidBodies.splice(i, 1);
				i--;
			}
		}
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

	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;

		this.destroyCollisionBox();
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
