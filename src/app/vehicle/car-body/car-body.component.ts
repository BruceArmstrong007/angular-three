import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';
import { NgtGLTFLoader } from '@angular-three/soba/loaders';
import {NgtTriple,Ref } from '@angular-three/core';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Observable } from 'rxjs';

const beetleMaterials = [
  'Black paint',
  'Black plastic',
  'Chrom',
  'Glass',
  'Headlight',
  'Interior (dark)',
  'Interior (light)',
  'License Plate',
  'Orange plastic',
  'Paint',
  'Reflector',
  'Reverse lights',
  'Rubber',
  'Steel',
  'Tail lights',
  'Underbody',
] as const;
type BeetleMaterial = typeof beetleMaterials[number];

const beetleNodes = [
  'chassis_1',
  'chassis_2',
  'chassis_3',
  'chassis_4',
  'chassis_5',
  'chassis_6',
  'chassis_7',
  'chassis_8',
  'chassis_9',
  'chassis_10',
  'chassis_11',
  'chassis_12',
  'chassis_13',
  'chassis_14',
  'chassis_15',
  'chassis_16',
] as const;
type BeetleNode = typeof beetleNodes[number];

interface BeetleGLTF extends GLTF {
  materials: Record<BeetleMaterial, THREE.Material>;
  nodes: Record<BeetleNode, THREE.Mesh>;
}



@Component({
  selector: 'app-car-body',
  templateUrl: './car-body.component.html',
  styleUrls: ['./car-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarBodyComponent implements OnInit {
  @Input() ref!: Ref;
  @Input() position?: NgtTriple;
  @Input() rotation?: NgtTriple;

  carBody$ = this.gltfLoader.load('assets/Beetle.glb') as Observable<any>;
  constructor(private gltfLoader: NgtGLTFLoader) {

  }

  ngOnInit(): void {
  }

}
