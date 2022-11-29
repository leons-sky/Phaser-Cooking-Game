import Behaviour from "../classes/Behaviour";
import { Food, Furnature } from "../objects";

export default class Camera extends Behaviour {
	async start() {
		for (let i = 0; i < 5; i++) {
			const wall = new Furnature.WALL(this.scene).addToScene();
			wall.position.set(i, 0, -2);
		}
		const doorway = new Furnature.DOORWAY(this.scene).addToScene();
		doorway.position.set(-1, 0, -2);
		const cake = new Food.CAKE(this.scene);
		cake.position.set(2, 0, 0);
		cake.addToScene();
		const cake2 = new Food.CAKE(this.scene);
		cake2.addToScene();
		cake2.remove(cake2.children[0], cake2.children[1]);

		// const stove = new Furnature.STOVE(this.scene);
	}
}
