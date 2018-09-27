import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
      CommonModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM'
      })
  ],
  exports: [
      MapComponent
  ],
  providers: [CamelizePipe]
})
export class MapModule { }
