import { Quaternion, Vector3 } from "three";
import ExtendedScene3D from "../base/ExtendedScene3D";
import { MouseEvent } from "../base/Interactable";
import Item, { ItemOptions } from "./Item";

export interface DraggableOptions extends ItemOptions {
	dragRotationOffset?: Quaternion;
}

export default class Draggable extends Item {
	private distance: number = 0;
	private baseAcceleration: number = 8;
	private dragRotationOffset: Quaternion = new Quaternion();
	private rotationDelta: number = 0;

	constructor(options: DraggableOptions) {
		options.physics = true;
		options.defaultState = options.defaultState ?? {};
		options.defaultState.dragging = false;
		options.defaultState.canDrag = true;

		super(options);

		this.dragRotationOffset =
			options.dragRotationOffset ?? this.dragRotationOffset;
	}

	get dragging(): boolean {
		return this.getState("dragging") as boolean;
	}

	get canDrag(): boolean {
		return this.getState("canDrag") as boolean;
	}

	canInteract(event: MouseEvent) {
		return (event.distance ? event.distance < 4 : false) && this.canDrag;
	}

	onAddToScene(scene: ExtendedScene3D) {
		// scene.input.on("wheel", (_0: any, _1: any, _2: any, deltaY: number) => {
		// 	if (!this.dragging) return;

		// 	this.scrollDelta = deltaY * 0.5;
		// });
		const Q = scene.input.keyboard.addKey("Q");
		Q.on("down", () => {
			if (!this.dragging) return;

			this.rotationDelta += 1;
		});
		Q.on("up", () => {
			if (!this.dragging) return;

			this.rotationDelta -= 1;
		});

		const E = scene.input.keyboard.addKey("E");
		E.on("down", () => {
			if (!this.dragging) return;

			this.rotationDelta -= 1;
		});
		E.on("up", () => {
			if (!this.dragging) return;

			this.rotationDelta += 1;
		});
	}

	onMouseLeftDown(event: MouseEvent) {
		this.setState("dragging", true);
		this.distance = event.distance as number;

		if (this.destroyed || !this.body) return;
		this.body.setGravity(0, -5, 0);
		// this.body.setAngularFactor(0, 1, 0);
	}

	onMouseLeftUp() {
		this.setState("dragging", false);
		this.rotationDelta = 0;

		if (this.destroyed || !this.body) return;
		this.body.setGravity(0, -30, 0);
		// this.body.setAngularFactor(1, 1, 1);
	}

	update(time: number, delta: number) {
		if (!this.body || !this.scene || this.destroyed || !this.dragging)
			return;

		const cam = this.scene.third.camera,
			direction = cam.getWorldDirection(new Vector3()),
			desiredPos = new Vector3()
				.copy(cam.position)
				.add(direction.multiplyScalar(this.distance));

		const velocity = new Vector3()
			.copy(desiredPos)
			.sub(new Vector3().copy(this.position))
			.multiplyScalar((this.baseAcceleration / this.distance) * 2);
		this.body.setVelocity(velocity.x, velocity.y, velocity.z);

		let desiredRotation = new Quaternion().setFromAxisAngle(
			new Vector3(0, 1, 0),
			this.rotation.y
		);
		desiredRotation = desiredRotation.multiply(this.dragRotationOffset);
		const change = this.quaternion.invert().multiply(desiredRotation);
		const theta = 2 * Math.acos(change.w);
		let torque;
		if (theta === 0) {
			torque = new Vector3();
		} else {
			torque = new Vector3(change.x, change.y, change.z).multiplyScalar(
				1 / Math.sin(theta / 2)
			);
		}
		torque = torque.normalize();

		if (
			Math.abs(this.rotation.x) > 0.05 ||
			Math.abs(this.rotation.z) > 0.05
		) {
			this.body.setAngularVelocity(torque.x, torque.y, torque.z);
		} else {
			this.body.setAngularVelocity(0, 0, 0);
		}
		this.body.setAngularVelocityY(
			this.body.angularVelocity.y + this.rotationDelta
		);

		// this.body.setAngularVelocity(
		// 	-this.rotation.x,
		// 	this.scrollDelta,
		// 	-this.rotation.z
		// );
		// this.scrollDelta -=
		// 	Math.abs(this.scrollDelta) < 0.1 ? 0 : this.scrollDelta * 0.5;
	}
}
