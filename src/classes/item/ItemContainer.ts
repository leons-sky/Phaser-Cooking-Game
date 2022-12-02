import { Event } from "three";
import Item, { ItemOptions } from "./Item";
import Tool from "./Tool";

export interface ItemContainerOptions extends ItemOptions {
	maxItems?: number;
}

interface ItemEvent extends Event {
	item: Item;
}

export default class ItemContainer extends Tool {
	private inventory: Item[] = [];
	private maxItems: number = 1;

	constructor(options: ItemContainerOptions) {
		super(options);

		this.maxItems = options.maxItems ?? this.maxItems;

		this.addEventListener("itemAdded", (event) => {
			this.onItemAdded((event as ItemEvent).item);
		});

		this.addEventListener("itemRemoved", (event) => {
			this.onItemRemoved((event as ItemEvent).item);
		});
	}

	isFull() {
		return this.inventory.length === this.maxItems;
	}

	isEmpty() {
		return this.inventory.length === 0;
	}

	getItems() {
		return [...this.inventory];
	}

	getItem(index: number) {
		return this.inventory[index];
	}

	hasItem(item: Item) {
		return !!this.inventory.filter((i) => i === item)[0];
	}

	canAddItem(item: Item): boolean {
		return !this.isFull() && !this.hasItem(item);
	}

	addItem(item: Item): boolean {
		if (!this.canAddItem(item)) return false;

		this.inventory.push(item);
		this.dispatchEvent({
			type: "itemAdded",
			item: item,
		});
		return true;
	}

	removeItem(item: Item): boolean {
		if (!this.hasItem(item)) return false;
		this.inventory = this.inventory.filter((i) => i !== item);
		this.dispatchEvent({
			type: "itemRemoved",
			item: item,
		});
		return true;
	}

	onItemAdded(item: Item) {}

	onItemRemoved(item: Item) {}
}
