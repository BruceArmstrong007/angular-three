import { Component,ChangeDetectionStrategy,HostListener } from '@angular/core';
import { NgtResize, NgtStore } from '@angular-three/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [NgtStore,NgtResize],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-three';
  isDebugDisabled = false;

   positions = [...Array(80)].map(() => ({
    position: [40 - Math.random() * 80, 20, 40 - Math.random() * 80],
    rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
  })) as Array<any>;


  @HostListener('window:keyup', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    if (event.key === '?') {
      this.isDebugDisabled = !this.isDebugDisabled;
    }
  }
}
