import Entity, { EntityOptions, EntityState } from "../base/Entity";

export interface ItemOptions extends EntityOptions {
	uniqueId: string;
}

export default class Item extends Entity {
	static readonly items: {
		[id: string]: Item;
	} = {};

	public readonly uniqueId: string;

	constructor(options: ItemOptions) {
		super(options);

		const id = options.uniqueId.toUpperCase();
		if (Item.items[id] && !(this instanceof Item.items[id].constructor))
			throw new Error(
				`Multiple item types with same unique id ${id}, conflict: ${Item.items[id].constructor.name} and ${this.constructor.name}`
			);

		this.uniqueId = id;
		Item.items[id] = this;
	}

	static getItemById(uniqueId: string): Item | null {
		return this.items[uniqueId];
	}

	static findItemsById(items: Item[], uniqueId: string, maxCount?: number) {
		return items
			.filter((item) => item.uniqueId == uniqueId)
			.filter((_, index) => !maxCount || (maxCount && index < maxCount));
	}

	static findItemsWithState(items: Item[], state: EntityState) {
		return items.filter((item) => {
			const itemState = item.getAllState();
			for (const key of Object.keys(state)) {
				if (
					JSON.stringify(state[key]) !==
					JSON.stringify(itemState[key])
				) {
					return false;
				}
			}
			return true;
		});
	}
}
