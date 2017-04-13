import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component'
import { WeatherService} from './services/weather/weather.service'

import {OrderFilterPipe} from './directives/weather.directive'

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    OrderFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent,WeatherComponent]
})
export class AppModule { }
