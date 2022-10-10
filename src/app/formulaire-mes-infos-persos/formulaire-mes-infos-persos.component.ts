import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulaire-mes-infos-persos',
  templateUrl: './formulaire-mes-infos-persos.component.html',
  styleUrls: ['./formulaire-mes-infos-persos.component.scss']
})
export class FormulaireMesInfosPersosComponent implements OnInit {
  formulaireInfosPersos!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulaireInfosPersos = this.formBuilder.group({
      genre: [null],
      nom: [null],
      prenom: [null],
      nir: [null],
      adresseEmail: [null],
      paysVisite: [null]
    });
  }

  onSubmitForm(): void {
    console.log(this.formulaireInfosPersos.value);
  }

}
