import { LineSegments, Raycaster } from "three";
import ExtendedScene3D from "../classes/base/ExtendedScene3D";
import GameObject from "../classes/base/GameObject";
import {
	FindFirstAncestorWhichIsA,
	FindFirstAncestorWhichEquals,
} from "./Find";

export function raycastSceneForGameObjects(
	raycaster: Raycaster,
	scene: ExtendedScene3D,
	ignore?: {
		objects?: GameObject | GameObject[];
		classes?: typeof GameObject | typeof GameObject[];
	},
	only?: {
		objects?: GameObject | GameObject[];
		classes?: typeof GameObject | typeof GameObject[];
	}
) {
	const children = scene.third.scene.children
		.filter((child) => {
			if (!ignore) return true;
			if (ignore.objects) {
				if (ignore.objects instanceof GameObject) {
					if (
						child === ignore.objects ||
						FindFirstAncestorWhichEquals(child, ignore.objects)
					)
						return false;
				} else {
					for (const obj of ignore.objects) {
						if (
							child === obj ||
							FindFirstAncestorWhichEquals(child, obj)
						)
							return false;
					}
				}
			}
			if (ignore.classes) {
				if (ignore.classes instanceof Array) {
					for (const cls of ignore.classes) {
						if (child instanceof cls) return false;
					}
				} else {
					if (child instanceof ignore.classes) return false;
				}
			}
			return true;
		})
		.filter((child) => {
			if (!only) return true;
			if (only.objects) {
				if (only.objects instanceof GameObject) {
					if (
						child !== only.objects &&
						!FindFirstAncestorWhichEquals(child, only.objects)
					)
						return false;
				} else {
					let flag = false;
					for (const obj of only.objects) {
						if (
							child === obj ||
							FindFirstAncestorWhichEquals(child, obj)
						) {
							flag = true;
							break;
						}
					}
					if (!flag) return false;
				}
			}
			if (only.classes) {
				if (only.classes instanceof Array) {
					let flag = false;
					for (const cls of only.classes) {
						if (child instanceof cls) {
							flag = true;
							break;
						}
					}
					if (!flag) return false;
				} else {
					if (!(child instanceof only.classes)) return false;
				}
			}
			return true;
		});
	const intersections = raycaster.intersectObjects(children, true);

	if (!intersections) return null;

	const meshIntersections = intersections.filter(
		(obj) => !(obj.object instanceof LineSegments)
	);

	if (meshIntersections.length == 0) return null;

	const gameObject = FindFirstAncestorWhichIsA(
		meshIntersections[0].object,
		GameObject
	);

	if (gameObject) {
		meshIntersections[0].object = gameObject;
		return meshIntersections[0];
	}

	return null;
}
