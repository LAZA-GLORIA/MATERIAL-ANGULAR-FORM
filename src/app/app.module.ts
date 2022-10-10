import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatSliderModule } from '@angular/material/slider';
import { ButtonOverviewExampleComponent } from './button-overview-example/button-overview-example.component';
import { MaterialExampleModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormulaireMesInfosPersosComponent } from './formulaire-mes-infos-persos/formulaire-mes-infos-persos.component';
import { FormulaireAjouterEnfantsComponent } from './formulaire-ajouter-enfants/formulaire-ajouter-enfants.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonOverviewExampleComponent,
    FormulaireComponent,
    PageAccueilComponent,
    HeaderComponent,
    FormulaireMesInfosPersosComponent,
    FormulaireAjouterEnfantsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // MatSliderModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
