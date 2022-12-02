import Third from "@enable3d/phaser-extension/dist/third";
import Behaviour from "./Behaviour";
import ExtendedScene3D from "./ExtendedScene3D";

export default class Behaviour3D<
	T extends ExtendedScene3D
> extends Behaviour<T> {
	/**
	 * A reference to the current scene.
	 */
	scene: T;

	/**
	 * A reference to the enabled3d.Third instance.
	 */
	third: Third;

	constructor(scene: T) {
		super(scene);

		this.scene = scene;
		this.third = scene.third;
	}
}
