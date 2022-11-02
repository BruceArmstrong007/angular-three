import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgtCanvas,NgtRadianPipe,NgtMathPipe } from '@angular-three/core';
import { NgtSobaEnvironment } from '@angular-three/soba/staging';
import {NgtPerspectiveCamera} from '@angular-three/core/cameras'
import { NgtStats } from '@angular-three/core/stats';
import { NgtAmbientLight, NgtDirectionalLight, NgtHemisphereLight, NgtSpotLight } from '@angular-three/core/lights';
import { NgtColorAttribute, NgtVector2Attribute, NgtFogAttribute } from '@angular-three/core/attributes';
import { NgtGroup } from '@angular-three/core/group';
import { NgtPhysics,NgtCannonDebug } from '@angular-three/cannon';
import {NgtMesh, NgtInstancedMesh} from '@angular-three/core/meshes';
import {NgtPlaneGeometry ,NgtBoxGeometry} from '@angular-three/core/geometries';
import {NgtShadowMaterial ,NgtMeshLambertMaterial, NgtMeshStandardMaterial, NgtMeshBasicMaterial} from '@angular-three/core/materials';
import {NgtSobaOrbitControls,NgtSobaTransformControls, NgtSobaFirstPersonControls, NgtSobaFlyControls} from '@angular-three/soba/controls'
import {NgtObjectPassThrough} from '@angular-three/core';
import { NgtSobaDetailed,NgtSobaDetailedContent} from '@angular-three/soba/performances';
import { NgtValueAttribute } from '@angular-three/core/attributes';


import { PlaneComponent } from './plane/plane.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CarBodyComponent } from './vehicle/car-body/car-body.component';
import { CarWheelComponent } from './vehicle/car-wheel/car-wheel.component';
import { ObstacleComponent } from './obstacle/obstacle.component';


@NgModule({
  declarations: [
    AppComponent,
    PlaneComponent,
    VehicleComponent,
    CarBodyComponent,
    CarWheelComponent,
    ObstacleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgtCanvas,
    NgtStats,
    NgtAmbientLight,
    NgtHemisphereLight,
    NgtDirectionalLight,
    NgtColorAttribute,
    NgtFogAttribute,
    NgtVector2Attribute,
    NgtPhysics,
    NgtMesh,
    NgtInstancedMesh,
    NgtPlaneGeometry,
    NgtMeshStandardMaterial,
    NgtShadowMaterial,
    NgtBoxGeometry,
    NgtMeshLambertMaterial,
    NgtSobaOrbitControls,
    NgtObjectPassThrough,
    NgtSobaTransformControls,
    NgtGroup,
    NgtValueAttribute,
    NgtRadianPipe,
    NgtMathPipe,
    NgtPerspectiveCamera,
    NgtSpotLight,
    NgtSobaFirstPersonControls,
    NgtCannonDebug,
    NgtSobaEnvironment,
    NgtSobaDetailed,
    NgtMeshBasicMaterial,
    NgtSobaDetailedContent,
    NgtSobaFlyControls
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
