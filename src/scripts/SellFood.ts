import { ExtendedObject3D } from "@enable3d/phaser-extension";
import Behaviour3D from "../classes/base/Behaviour3D";
import MainScene from "../scenes/MainScene";

export default class SellFood extends Behaviour3D<MainScene> {
	private object: ExtendedObject3D;

	constructor(scene: MainScene) {
		super(scene);

		this.object = scene.third.physics.add.box(
			{
				height: 2,
				width: 0.2,
				depth: 2,
				collisionFlags: 1,
				x: -5.2,
				y: 1,
				z: 6,
			},
			{
				standard: {
					color: 0x000000,
				},
			}
		);
		this.object.name = "SellFoodHere";
		this.object.castShadow = false;
		this.object.receiveShadow = false;
	}

	// start() {
	// 	this.object.body.checkCollisions = true;
	// 	this.object.body.needUpdate = true;
	// 	this.object.body.on.collision((otherObject, event) => {
	// 		console.log(otherObject);
	// 		if (event == "start") {
	// 			if (!(otherObject instanceof Food)) return;
	// 			const scoring = otherObject.getState("scoring") as {
	// 				reward: number;
	// 				state: {};
	// 			};
	// 			if (scoring.reward > 0) {
	// 				this.scene.state.setValue(
	// 					"score",
	// 					this.scene.state.getValue("score") + scoring.reward
	// 				);
	// 			}
	// 			otherObject.destroy();
	// 		}
	// 	});
	// 	console.log("start");
	// }
}
