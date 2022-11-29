import Behaviour from "../classes/base/Behaviour";
import { Ingredients } from "../objects";

export default class TestFood extends Behaviour {
	async start() {
		for (const [i, Ingredient] of Object.values(Ingredients).entries()) {
			const instance = new Ingredient(this.scene);
			instance.position.set(-5 + i * 0.5, 0.1, 0);
			instance.addToScene();
			// instance.anchored(true);
		}
	}
}
