import Behaviour from "../classes/Behaviour";

export default class Camera extends Behaviour {
	private speed: number;

	constructor(scene: any, audio: any) {
		super(scene, audio);

		this.speed = 0.04;
	}

	update() {
		// if (this.tap.isDown) {
		// 	this.third.camera.translateX(
		// 		-(this.tap.currentPosition.x - this.tap.lastPosition.x) *
		// 			this.speed *
		// 			2
		// 	);

		// 	this.third.camera.translateY(
		// 		(this.tap.currentPosition.y - this.tap.lastPosition.y) *
		// 			this.speed *
		// 			2
		// 	);
		// }

		if (this.keyboard.key("KeyW").isDown) {
			this.third.camera.translateZ(-this.speed);
		}
		if (this.keyboard.key("KeyS").isDown) {
			this.third.camera.translateZ(this.speed);
		}
		if (this.keyboard.key("KeyA").isDown) {
			this.third.camera.translateX(-this.speed);
		}
		if (this.keyboard.key("KeyD").isDown) {
			this.third.camera.translateX(this.speed);
		}
	}
}
