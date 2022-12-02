import {
	ExtendedObject3D,
	FirstPersonControls,
} from "@enable3d/phaser-extension";
import { Raycaster, Vector2, Vector3 } from "three";
import Behaviour3D from "../classes/base/Behaviour3D";
import GameState from "../classes/base/GameState";
import MainScene from "../scenes/MainScene";

const KEYS = "W, A, S, D, shift, up, left, down, right";
interface Keys {
	W: Phaser.Input.Keyboard.Key;
	A: Phaser.Input.Keyboard.Key;
	S: Phaser.Input.Keyboard.Key;
	D: Phaser.Input.Keyboard.Key;

	up: Phaser.Input.Keyboard.Key;
	left: Phaser.Input.Keyboard.Key;
	down: Phaser.Input.Keyboard.Key;
	right: Phaser.Input.Keyboard.Key;

	shift: Phaser.Input.Keyboard.Key;
}

export default class Player extends Behaviour3D<MainScene> {
	private object: ExtendedObject3D;
	private controls: FirstPersonControls;
	private keys: Keys;

	private raycaster: Raycaster | null = null;
	private movement = { x: 0, y: 0, z: 0 };
	private pointerMoveX: number;
	private pointerMoveY: number;
	private walkSpeed: number;
	private rotationSpeed: number;
	// private collide: boolean;

	constructor(scene: MainScene) {
		super(scene);

		this.walkSpeed = 6;
		this.rotationSpeed = 10;
		// this.collide = false;

		this.pointerMoveX = 0;
		this.pointerMoveY = 0;

		this.object = new ExtendedObject3D();
		this.object.name = "Player";
		this.controls = new FirstPersonControls(
			this.third.camera,
			this.object,
			{}
		);
		this.keys = this.input.keyboard.addKeys(KEYS) as Keys;
	}

	checkEnabledState(state: GameState): void {
		this.enabled = !state.getValue("dev");
	}

	start() {
		this.scene.state.setValue("firstPerson", true);

		this.object.position.set(-2, 0, 3);
		this.scene.third.physics.add.existing(this.object, {
			shape: "capsule",
			mass: 1.8,
			radius: 0.25,
			offset: { y: 0.9 },
			height: 1,
		});
		this.object.body.setAngularFactor(0, 0, 0);
		this.object.body.setFriction(0.4);
		this.object.body.setGravity(0, -200, 0);

		this.third.scene.add(this.object);

		this.scene.input
			.on("pointerdown", () => {
				if (!this.enabled) return;
				this.scene.input.mouse.requestPointerLock();
			})
			.on("pointermove", (pointer: Phaser.Input.Pointer) => {
				if (!this.enabled) return;
				if (this.scene.input.mouse.locked) {
					this.pointerMoveX = pointer.movementX;
					this.pointerMoveY = pointer.movementY;
					this.controls.update(this.pointerMoveX, this.pointerMoveY);
				}
			});

		this.controls.update(0, 0);
	}

	private triggerMovement(direction: Vector2): void {
		this.move(direction);

		let moveX = this.pointerMoveX !== -1 ? this.pointerMoveX / 5 : 0,
			moveY = this.pointerMoveY !== -1 ? this.pointerMoveY / 5 : 0;

		this.look(moveX, moveY, this.controls);
	}

	private dumpKeyState(): void {
		if (
			this.keys.W.isUp &&
			this.keys.A.isUp &&
			this.keys.S.isUp &&
			this.keys.D.isUp
		)
			this.idle();
		else {
			const direction = new Vector2();
			if (this.keys.W.isDown) direction.add(new Vector2(0, -1));
			if (this.keys.S.isDown) direction.add(new Vector2(0, 1));
			if (this.keys.A.isDown) direction.add(new Vector2(-1, 0));
			if (this.keys.D.isDown) direction.add(new Vector2(1, 0));

			this.triggerMovement(direction);
		}
	}

	public idle(): void {
		this.object.body.setVelocityX(0);
		this.object.body.setVelocityZ(0);
		this.object.body.setAngularVelocityY(0);
	}

	public move(dir: Vector2): void {
		if (!this.raycaster) return;

		const cam = this.scene.third.camera,
			direction = cam.getWorldDirection(this.raycaster.ray.direction),
			flatDirection = new Vector2(direction.x, direction.z).normalize();

		let velocity = new Vector2();

		if (dir.x > 0) {
			velocity.x += -flatDirection.y;
			velocity.y += flatDirection.x;
		}
		if (dir.x < 0) {
			velocity.x += flatDirection.y;
			velocity.y += -flatDirection.x;
		}
		if (dir.y < 0) {
			velocity.x += flatDirection.x;
			velocity.y += flatDirection.y;
		}
		if (dir.y > 0) {
			velocity.x += -flatDirection.x;
			velocity.y += -flatDirection.y;
		}

		velocity = velocity.multiplyScalar(this.walkSpeed);

		this.object.body.setVelocityX(velocity.x);
		this.object.body.setVelocityZ(velocity.y);

		this.object.body.setAngularVelocityY(0);
	}

	//-------------------------------------------- player look

	public look(x: number, y: number, camera: FirstPersonControls): void {
		camera.update(x, y);

		//object's body rotates with camera

		const v3 = new Vector3(),
			rotation = this.scene.third.camera.getWorldDirection(v3),
			theta = Math.atan2(rotation.x, rotation.z),
			rotationMan = this.object.getWorldDirection(v3),
			thetaMan = Math.atan2(rotationMan.x, rotationMan.z),
			l = Math.abs(theta - thetaMan);

		let d = Math.PI / 24;

		if ((l > d && l > Math.PI - d) || theta < thetaMan)
			this.rotationSpeed *= -1;
		if (this.object.body)
			this.object.body.setAngularVelocityY(this.rotationSpeed);
	}

	public update(): void {
		this.controls.update(0, 0);
		this.dumpKeyState();

		this.raycaster = new Raycaster();
		const pos = new Vector3(),
			cam = this.scene.third.camera,
			movementY = (num: number) => {
				return num - this.movement.y;
			};

		this.raycaster.setFromCamera(
			{
				x: 0.6 - this.movement.x,
				y: movementY(-0.8),
			},
			cam
		);

		pos.copy(this.raycaster.ray.direction);
		pos.multiplyScalar(0.8 + this.movement.z);
		pos.add(this.raycaster.ray.origin);

		this.raycaster.ray.origin.copy(cam.position);

		// this.object.body.on.collision((_otherObject, event) => {
		// if (event !== "end") this.collide = true;
		// else this.collide = false;
		// });
	}
}
