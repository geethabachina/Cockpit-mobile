import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { LogoutComponent } from './core/logout/logout.component';
import { CoreComponent } from './core/core.component';
import { MapComponent } from './core/map/map.component';
import { InfoComponent } from './core/info/info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'core',
    component: CoreComponent,
    children: [
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

