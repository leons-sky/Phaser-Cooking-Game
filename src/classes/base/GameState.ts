import { Event, EventDispatcher } from "three";
import Copy from "../../utils/Copy";

interface State {
	[key: string]: any;
}

export interface ValueChangeEvent extends Event {
	key: string;
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
		return Copy(this.data[key]);
	}

	setValue(key: string, value: any) {
		const oldValue = this.data[key];
		this.data[key] = value;

		this.dispatchEvent({
			type: "valueChange",
			key: key,
			oldValue: Copy(oldValue),
			newValue: Copy(value),
		});
		this.dispatchEvent({
			type: "stateChange",
			state: Copy(this.data),
		});
	}

	getState() {
		return Copy(this.data);
	}

	setState(value: State) {
		this.data = value;

		this.dispatchEvent({
			type: "stateChange",
			state: Copy(value),
		});
	}

	listen(key: string, callback: (oldValue: any, newValue: any) => void) {
		callback(null, this.getValue(key));
		this.addEventListener("valueChange", (e) => {
			const event = e as ValueChangeEvent;
			if (event.key !== key) return;
			callback(event.oldValue, event.newValue);
		});
	}
}
