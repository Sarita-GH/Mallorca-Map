import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComponenteStart} from './start/start.component';
import {MapComponent} from './map/map.component';
const routes: Routes = [
  { path: '', component: ComponenteStart },
  { path: 'mapa', component: MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
