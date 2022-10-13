import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-ajouter-enfants',
  templateUrl: './formulaire-ajouter-enfants.component.html',
  styleUrls: ['./formulaire-ajouter-enfants.component.scss']
})
export class FormulaireAjouterEnfantsComponent {
  //formulaireAjouterEnfants!: FormGroup;

  // genreControl = new FormControl("Genre");
  // nomControl = new FormControl();
  // prenomControl = new FormControl();

  childUserForm = this.formBuilder.group({
      genre: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) { }



  onSupprimerEnfant(){
    console.log("hello");
  }



}
