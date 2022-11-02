import { Component,ChangeDetectionStrategy, OnInit,Input, HostListener , Output,EventEmitter } from '@angular/core';
import { NgtPhysicBody, NgtPhysicRaycastVehicle, WheelInfoOptions } from '@angular-three/cannon';
import {NgtComponentStore, NgtState, NgtTriple,Ref} from '@angular-three/core';
import { Observable } from 'rxjs';


const keyControlMap = {
  ' ': 'brake',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'forward',
  r: 'reset',
} as const;

type KeyCode = keyof typeof keyControlMap;

const keyCodes = Object.keys(keyControlMap) as KeyCode[];
const isKeyCode = (v: unknown): v is KeyCode => keyCodes.includes(v as KeyCode);


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers:[NgtPhysicBody,NgtPhysicRaycastVehicle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleComponent extends NgtComponentStore implements OnInit {
  @Input() position?: NgtTriple;
  @Input() rotation?: NgtTriple;
  @Input() angularVelocity?: NgtTriple;

  readonly chassisRef = this.physicBody.useBox<THREE.Mesh>(() => ({
    allowSleep: false,
    angularVelocity: this.angularVelocity,
    args: [1.7, 1, 4],
    mass: 500,
    onCollide: (e) => {console.log(e)},
    position: this.position,
    rotation: this.rotation,
  }));

  private readonly back = -1.15;
  private readonly force = 1500;
  private readonly front = 1.3;
  private readonly height = -0.04;
  private readonly maxBrake = 50;
  private readonly steer = 0.5;
  private readonly width = 1.2;
  readonly radius = 0.7;

  private backward = false;
  private brake = false;
  private forward = false;
  private left = false;
  private reset = false;
  private right = false;

  readonly wheelInfo: WheelInfoOptions = {
    axleLocal: [-1, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // set to same as Physics Gravity
    frictionSlip: 2,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius: this.radius,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };


  readonly wheelInfo1: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [-this.width / 2, this.height, this.front],
    isFrontWheel: true,
  };
  readonly wheelInfo2: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [this.width / 2, this.height, this.front],
    isFrontWheel: true,
  };
  readonly wheelInfo3: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [-this.width / 2, this.height, this.back],
    isFrontWheel: false,
  };
  readonly wheelInfo4: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [this.width / 2, this.height, this.back],
    isFrontWheel: false,
  };

  readonly wheels = [new Ref(), new Ref(), new Ref(), new Ref()];

  readonly raycastVehicleRef = this.physicRaycastVehicle.useRaycastVehicle(() => ({
    chassisBody: this.chassisRef.ref as Ref,
    wheelInfos: [this.wheelInfo1, this.wheelInfo2, this.wheelInfo3, this.wheelInfo4],
    wheels: this.wheels,
  }));
positions: any;
  constructor(private physicBody: NgtPhysicBody,
    private physicRaycastVehicle: NgtPhysicRaycastVehicle) {
      super();

     }

  ngOnInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  private onKeyUp(event: KeyboardEvent) {
    if (!isKeyCode(event.key)) return;
    this[keyControlMap[event.key]] = false;
  }

  @HostListener('window:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    if (!isKeyCode(event.key)) return;
    this[keyControlMap[event.key]] = true;
  }

  onBeforeRender() {
    const {
      forward,
      backward,
      force,
      chassisRef,
      raycastVehicleRef,
      left,
      right,
      steer,
      brake,
      maxBrake,
      position,
      angularVelocity,
      rotation,
      reset,
    } = this;

     this.chassisRef.api.position.subscribe((res)=>this.positions = res)
    if (raycastVehicleRef.ref.value && chassisRef.ref.value && this.wheels.every((wheel) => wheel.value)) {
      for (let e = 2; e < 4; e++) {
        raycastVehicleRef.api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2);
      }

      for (let s = 0; s < 2; s++) {
        raycastVehicleRef.api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s);
      }

      for (let b = 2; b < 4; b++) {
        raycastVehicleRef.api.setBrake(brake ? maxBrake : 0, b);
      }

      if (reset && position && rotation && angularVelocity) {
        chassisRef.api.position.set(...position);
        chassisRef.api.velocity.set(0, 0, 0);
        chassisRef.api.angularVelocity.set(...angularVelocity);
        chassisRef.api.rotation.set(...rotation);
      }
    }
  }

  ready(event:any){
    event.rotation.x += 0.1;
    event.updateProjectionMatrix();
    // event.object.position.set(res[0],res[1],res[2])
    // this.chassisRef.api.position.subscribe((res)=>{
    // })
  }
}
