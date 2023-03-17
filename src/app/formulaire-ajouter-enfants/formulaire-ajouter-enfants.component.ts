import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-ajouter-enfants',
  templateUrl: './formulaire-ajouter-enfants.component.html',
  styleUrls: ['./formulaire-ajouter-enfants.component.scss'],
})
export class FormulaireAjouterEnfantsComponent implements OnInit{
  childUserForm = this.fb.group({
    genre: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
    children: this.fb.array([])
    // children= new FormArray([])
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addChildren();
  }

  onSupprimerEnfant(childrenIndex: number) {
    this.apichildren.removeAt(childrenIndex);
  }

  get apichildren() {
    return this.childUserForm.controls["children"] as FormArray;
  }

  addChildren() {
     const childrenForm = this.fb.group({
      genre: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]]
    });

    this.apichildren.push(childrenForm);
  }

  ProceedSave(){
    console.log(this.childUserForm.value);
  }
}
