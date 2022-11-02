import { Component, OnInit,Input ,ChangeDetectionStrategy } from '@angular/core';
import { NgtPhysicBody } from '@angular-three/cannon';
import {NgtTriple } from '@angular-three/core';
@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss'],
  providers: [NgtPhysicBody],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaneComponent implements OnInit {

  @Input()position?: NgtTriple;
  rotation = [-Math.PI / 2, 0, 0] as NgtTriple;
  plane : any = [1000,1000];
   planeRef = this.physicBody.usePlane(() => ({
     args: this.plane,
     rotation: this.rotation,
     position: this.position,
   }));

   constructor(private physicBody : NgtPhysicBody){

  }

  ngOnInit(): void {
  }

}
