import Behaviour from "../classes/base/Behaviour";
import { Furnature, Structure } from "../objects";

export default class Camera extends Behaviour {
	async start() {
		for (let i = 0; i < 5; i++) {
			const wall = new Structure.WALL(this.scene);
			wall.position.set(i, 0.65, -2);
			wall.addToScene();
		}
		const doorway = new Structure.DOORWAY(this.scene);
		doorway.position.set(-1, 0.65, -2);
		doorway.addToScene();

		// const stove = new Furnature.STOVE(this.scene);
	}
}
