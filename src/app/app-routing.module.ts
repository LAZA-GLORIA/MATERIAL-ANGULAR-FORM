import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ButtonOverviewExampleComponent } from "./button-overview-example/button-overview-example.component";
import { FormulaireComponent } from "./formulaire/formulaire.component";
import { PageAccueilComponent } from "./page-accueil/page-accueil.component";

const routes: Routes = [
    { path: '', component: PageAccueilComponent },
    { path: 'formulaire', component: FormulaireComponent },
    { path: 'bouton', component: ButtonOverviewExampleComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}