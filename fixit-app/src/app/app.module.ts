import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from './pages/map/map.component';
import {AppComponent} from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from './components/header/header.component';
import {routes} from './app.routes';



@NgModule({
  declarations: [
    MapComponent,
    AppComponent,
    HeaderComponent
  ],
  imports: [
      RouterModule.forRoot(routes),
      CommonModule,
      RouterOutlet
  ],
  exports: [RouterModule]
})
export class AppModule { }
