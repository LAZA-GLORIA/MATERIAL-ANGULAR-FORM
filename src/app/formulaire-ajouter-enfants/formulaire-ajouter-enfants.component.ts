import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulaire-ajouter-enfants',
  templateUrl: './formulaire-ajouter-enfants.component.html',
  styleUrls: ['./formulaire-ajouter-enfants.component.scss']
})
export class FormulaireAjouterEnfantsComponent implements OnInit {
  formulaireAjouterEnfants!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulaireAjouterEnfants = this.formBuilder.group({
      genre: [null],
      nom: [null],
      prenom: [null]
    });
  }

  onSubmitForm(): void {
    console.log(this.formulaireAjouterEnfants.value)
  }

}
