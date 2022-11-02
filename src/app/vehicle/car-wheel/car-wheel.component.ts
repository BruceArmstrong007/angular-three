import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';
import { NgtPhysicBody } from '@angular-three/cannon';
import { NgtGLTFLoader } from '@angular-three/soba/loaders';
import {Ref } from '@angular-three/core';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Observable } from 'rxjs';
interface WheelGLTF extends GLTF {
  materials: Record<'Chrom' | 'Rubber' | 'Steel', THREE.Material>;
  nodes: Record<'wheel_1' | 'wheel_2' | 'wheel_3', THREE.Mesh>;
}

@Component({
  selector: 'app-car-wheel',
  templateUrl: './car-wheel.component.html',
  styleUrls: ['./car-wheel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarWheelComponent implements OnInit {
  @Input() ref!: Ref;
  @Input() radius = 0.7;
  @Input() leftSide = false;

  readonly wheel$ = this.gltfLoader.load('assets/wheel.glb') as Observable<any>;
  constructor(private gltfLoader: NgtGLTFLoader, private physicBody: NgtPhysicBody) { }

  ngOnInit(): void {
    this.physicBody.useCompoundBody(
      () => ({
        collisionFilterGroup: 0,
        mass: 1,
        material: 'wheel',
        shapes: [
          {
            args: [this.radius, this.radius, 0.5, 16],
            rotation: [0, 0, -Math.PI / 2],
            type: 'Cylinder',
          },
        ],
        type: 'Kinematic',
      }),
      true,
      this.ref
    );
  }

}
