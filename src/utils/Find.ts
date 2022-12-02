import { Object3D } from "three";

export function FindFirstChild(
	object: Object3D,
	name: string,
	recursive: boolean = false
): Object3D | null {
	for (const child of object.children) {
		if (child.name === name) {
			return child;
		}
		if (recursive) {
			let find = FindFirstChild(child, name, true);
			if (find) {
				return find;
			}
		}
	}
	return null;
}

export function FindFirstChildWhichIsA(
	object: Object3D,
	objectClass: any,
	recursive: boolean = false
): Object3D | null {
	for (const child of object.children) {
		if (child instanceof objectClass) {
			return child;
		}
		if (recursive) {
			let find = FindFirstChildWhichIsA(child, objectClass, true);
			if (find) {
				return find;
			}
		}
	}
	return null;
}

export function FindFirstAncestor(
	object: Object3D,
	name: string
): Object3D | null {
	const parent = object.parent;
	if (parent) {
		if (parent.name === name) {
			return parent;
		}
		return FindFirstAncestor(parent, name);
	}
	return null;
}

export function FindFirstAncestorWhichIsA(
	object: Object3D,
	objectClass: any
): Object3D | null {
	const parent = object.parent;
	if (parent) {
		if (parent instanceof objectClass) {
			return parent;
		}
		return FindFirstAncestorWhichIsA(parent, objectClass);
	}
	return null;
}

export function FindFirstAncestorWhichEquals(
	object: Object3D,
	otherObject: Object3D
): Object3D | null {
	const parent = object.parent;
	if (parent) {
		if (parent === otherObject) {
			return parent;
		}
		return FindFirstAncestorWhichIsA(parent, otherObject);
	}
	return null;
}
