import {
	ExtendedObject3D,
	FirstPersonControls,
} from "@enable3d/phaser-extension";
import { Matrix4, Vector3 } from "three";
import Behaviour3D from "../classes/base/Behaviour3D";
import ExtendedScene3D from "../classes/base/ExtendedScene3D";
import GameState from "../classes/base/GameState";

const KEYS = "W, A, S, D, Q, E, shift, up, left, down, right";
interface Keys {
	W: Phaser.Input.Keyboard.Key;
	A: Phaser.Input.Keyboard.Key;
	S: Phaser.Input.Keyboard.Key;
	D: Phaser.Input.Keyboard.Key;
	Q: Phaser.Input.Keyboard.Key;
	E: Phaser.Input.Keyboard.Key;

	up: Phaser.Input.Keyboard.Key;
	left: Phaser.Input.Keyboard.Key;
	down: Phaser.Input.Keyboard.Key;
	right: Phaser.Input.Keyboard.Key;

	shift: Phaser.Input.Keyboard.Key;
}

export default class DevCamera extends Behaviour3D<ExtendedScene3D> {
	private object: ExtendedObject3D;
	private controls: FirstPersonControls;
	private keys: Keys;

	private pointerMoveX: number;
	private pointerMoveY: number;
	private speed: number = 0.3;
	private rotationSpeed: number = 2;
	private position: Vector3 = new Vector3(0, 7, -10);

	constructor(scene: any) {
		super(scene);

		this.pointerMoveX = 0;
		this.pointerMoveY = 0;

		this.object = new ExtendedObject3D();
		this.object.name = "DevCamera";
		this.controls = new FirstPersonControls(
			this.third.camera,
			this.object,
			{}
		);
		this.keys = this.input.keyboard.addKeys(KEYS) as Keys;
	}

	checkEnabledState(state: GameState) {
		this.enabled = state.getValue("dev");
	}

	start() {
		this.third.scene.add(this.object);

		this.scene.input
			.on("pointerdown", () => {
				if (!this.enabled) return;
				this.scene.input.mouse.requestPointerLock();
			})
			.on("pointerup", () => {
				if (!this.enabled) return;
				this.scene.input.mouse.releasePointerLock();
			})
			.on("pointermove", (pointer: Phaser.Input.Pointer) => {
				if (!this.enabled) return;
				if (this.scene.input.mouse.locked) {
					this.pointerMoveX = pointer.movementX;
					this.pointerMoveY = pointer.movementY;
					this.controls.update(
						this.pointerMoveX * this.rotationSpeed,
						this.pointerMoveY * this.rotationSpeed
					);
				}
			});

		this.controls.update(0, 0);
	}

	private dumpKeyState(): void {
		const direction = new Vector3();
		if (this.keys.W.isDown) direction.add(new Vector3(0, 0, 1));
		if (this.keys.S.isDown) direction.add(new Vector3(0, 0, -1));
		if (this.keys.A.isDown) direction.add(new Vector3(-1, 0, 0));
		if (this.keys.D.isDown) direction.add(new Vector3(1, 0, 0));
		if (this.keys.Q.isDown) direction.add(new Vector3(0, -1, 0));
		if (this.keys.E.isDown) direction.add(new Vector3(0, 1, 0));

		this.move(direction);
	}

	public move(direction: Vector3): void {
		const cam = this.scene.third.camera,
			rotation = new Matrix4().extractRotation(cam.matrixWorld),
			up = new Vector3(0, 1, 0).applyMatrix4(rotation).normalize(),
			right = new Vector3(1, 0, 0).applyMatrix4(rotation).normalize(),
			forward = cam.getWorldDirection(new Vector3());

		this.position.add(right.multiplyScalar(direction.x * this.speed));
		this.position.add(up.multiplyScalar(direction.y * this.speed));
		this.position.add(forward.multiplyScalar(direction.z * this.speed));
		cam.position.set(this.position.x, this.position.y, this.position.z);
		//update position
	}

	public update(): void {
		this.controls.update(0, 0);
		this.dumpKeyState();
	}
}
