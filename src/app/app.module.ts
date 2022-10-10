import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonOverviewExampleComponent } from './button-overview-example/button-overview-example.component';
import { MaterialExampleModule } from 'src/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonOverviewExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
