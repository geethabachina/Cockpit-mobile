import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login/login.component';
import { CoreComponent } from './core.component';
import { LogoutComponent } from './logout/logout.component';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';
import { ModalPopUpComponent } from './modal-pop-up/modal-pop-up.component';

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LoginComponent,
    CoreComponent,
    LogoutComponent,
    MapComponent,
    InfoComponent,
    ModalPopUpComponent
  ]
})
export class CoreModule { }
