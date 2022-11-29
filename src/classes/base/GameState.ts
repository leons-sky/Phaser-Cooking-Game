import { Event, EventDispatcher } from "three";

interface State {
	[key: string]: any;
}

export interface ValueChangeEvent extends Event {
	oldValue: any;
	newValue: any;
}

export interface StateChangeEvent extends Event {
	state: State;
}

export default class GameState extends EventDispatcher {
	private data: State;

	constructor() {
		super();

		this.data = {};
	}

	getValue(key: string) {
		return this.data[key];
	}

	setValue(key: string, value: any) {
		const oldValue = this.data[key];
		this.data[key] = value;

		this.dispatchEvent({
			type: "valueChange",
			oldValue: oldValue,
			newValue: value,
		});
	}

	getState() {
		return this.data;
	}

	setState(value: State) {
		this.data = value;

		this.dispatchEvent({
			type: "stateChange",
			state: value,
		});
	}

	listen(key: string, callback: (oldValue: any, newValue: any) => void) {
		callback(null, this.getValue(key));
		this.addEventListener("valueChange", (event) => {
			const { oldValue, newValue } = event as ValueChangeEvent;
			callback(oldValue, newValue);
		});
	}
}
