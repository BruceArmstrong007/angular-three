import { Component, Input } from '@angular/core';
import { NgtPhysicBody } from '@angular-three/cannon';

@Component({
  selector: 'app-obstacle',
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.scss'],
  providers: [NgtPhysicBody],
})
export class ObstacleComponent {
  @Input() position?: any;
  @Input() rotation?: any;
  boxRef = this.physicBody.useBox(() => ({
    mass: 1,
    position: this.position,
    rotation: this.rotation,
  }));

  constructor(private physicBody: NgtPhysicBody) {}
}
