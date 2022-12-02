import { GameObjectOptions } from "./GameObject";
import Interactable from "./Interactable";
import Copy from "../../utils/Copy";

type StateValue = boolean | string | number | EntityState | null | undefined;

export interface EntityState {
	[x: string]: StateValue;
}

export interface EntityOptions extends GameObjectOptions {
	defaultState?: EntityState;
}

export default class Entity extends Interactable {
	static entities: Entity[] = [];
	static started: boolean = false;

	static startAll() {
		this.started = true;
		for (const entity of this.entities) {
			entity.start();
		}
	}

	static updateAll(time: number, delta: number) {
		for (const entity of this.entities) {
			entity.update(time, delta);
		}
	}

	private state: EntityState;

	constructor(options: EntityOptions) {
		super(options);

		this.state = options.defaultState ? Copy(options.defaultState) : {};

		Entity.entities.push(this);

		if (Entity.started) {
			this.start();
		}
	}

	static create(defaultState?: EntityState): Entity {
		return new Entity({
			name: "Entity",
			assets: {},
			defaultState: defaultState,
		});
	}

	getAllState() {
		return Copy(this.state);
	}

	getState(key: string) {
		return this.state[key];
	}

	setState(key: string, value: StateValue) {
		this.state[key] = Copy(value);
	}

	start() {}

	update(time: number, delta: number) {}
}
