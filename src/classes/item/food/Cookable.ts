import { AssetUrlOptions } from "../../base/GameObject";
import { FoodOptions, FoodState } from "./Food";
import Ingredient from "./Ingredient";

export interface CookableState extends FoodState {
	cooked?: boolean;
}

export interface CookableOptions extends FoodOptions {
	defaultState?: CookableState;
	assets: {
		raw: string | AssetUrlOptions;
		cooked: string | AssetUrlOptions;
	};
	refreshCollisionBox?: boolean;
}

export default class Cookable extends Ingredient {
	private shouldRefreshCollisionBox: boolean = true;

	constructor(options: CookableOptions) {
		options.defaultState = options.defaultState ?? {};
		if (options.defaultState.cooked == null) {
			options.defaultState.cooked = false;
		}

		super(options);

		this.shouldRefreshCollisionBox =
			options.refreshCollisionBox ?? this.shouldRefreshCollisionBox;
	}

	get cooked() {
		return this.getState("cooked");
	}

	construct(): void {
		this.add(this.cooked ? this.assets.cooked : this.assets.raw);
	}

	cook() {
		if (this.cooked) return;
		this.setState("cooked", true);

		this.remove(this.children[0]);
		this.add(this.assets.cooked);
		this.calculateShadows();

		if (this.shouldRefreshCollisionBox) {
			this.refreshCollisionBox();
		}
	}
}
