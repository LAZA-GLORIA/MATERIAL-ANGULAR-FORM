import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulaire-ajouter-enfants',
  templateUrl: './formulaire-ajouter-enfants.component.html',
  styleUrls: ['./formulaire-ajouter-enfants.component.scss']
})
export class FormulaireAjouterEnfantsComponent {
  //formulaireAjouterEnfants!: FormGroup;

  genreControl = new FormControl("Genre");
  nomControl = new FormControl();
  prenomControl = new FormControl();

  options = this.formBuilder.group({
      genre: this.genreControl,
      nom: this.nomControl,
      prenom: this.prenomControl,
  });

  constructor(private formBuilder: FormBuilder) { }

  // ngOnInit(): void {
  //   this.formulaireAjouterEnfants = this.formBuilder.group({
  //     genre: [null],
  //     nom: [null],
  //     prenom: [null]
  //   });
  // }

  // onSubmitForm(): void {
  //   console.log(this.formulaireAjouterEnfants.value)
  // }

}
