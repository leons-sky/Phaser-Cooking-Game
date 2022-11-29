import ExtendedScene3D from "../base/ExtendedScene3D";
import { AssetUrlOptions, GameObjectOptions } from "../base/GameObject";
import Ingredient from "./Ingredient";

interface CookableOptions extends GameObjectOptions {
	assets: {
		raw: string | AssetUrlOptions;
		cooked: string | AssetUrlOptions;
	};
	refreshCollisionBox: boolean;
}

export default class Cookable extends Ingredient {
	private _cooked: boolean = false;
	private shouldRefreshCollisionBox: boolean = true;

	constructor(scene: ExtendedScene3D, options: CookableOptions) {
		super(scene, options);

		this.shouldRefreshCollisionBox = options.refreshCollisionBox;
	}

	get cooked() {
		return this._cooked;
	}

	construct(): void {
		this.add(this.assets.raw);
	}

	// TODO - Remove this after testing
	onActivate() {
		this.cook();
	}

	cook() {
		if (this._cooked) throw new Error("Already cooked");
		this._cooked = true;

		this.remove(this.children[0]);
		this.add(this.assets.cooked);

		if (this.shouldRefreshCollisionBox) {
			this.refreshCollisionBox();
		}
	}
}
