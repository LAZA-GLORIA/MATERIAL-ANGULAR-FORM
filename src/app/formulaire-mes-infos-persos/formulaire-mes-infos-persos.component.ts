import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formulaire-mes-infos-persos',
  templateUrl: './formulaire-mes-infos-persos.component.html',
  styleUrls: ['./formulaire-mes-infos-persos.component.scss']
})
export class FormulaireMesInfosPersosComponent{
  //formulaireInfosPersos!: FormGroup;

  paysVisites: string[] = [];
  filteredPaysVisites$!: Observable<string[]>;

  genreControl = new FormControl(null, [Validators.required]);
  nomControl = new FormControl(null, [Validators.required]);
  prenomControl = new FormControl(null, [Validators.required]);
  nirControl = new FormControl(null, [Validators.required]);
  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  paysVisitesControl = new FormControl();

  options = this.formBuilder.group({
      genre: this.genreControl,
      nom: this.nomControl,
      prenom: this.prenomControl,
      nir: this.nirControl,
      email: this.emailControl,
      paysVisites: this.paysVisitesControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) { }

  // ngOnInit(): void {
  //   this.formulaireInfosPersos = this.formBuilder.group({
  //     genre: [null],
  //     nom: [null],
  //     prenom: [null],
  //     nir: [null],
  //     adresseEmail: [null],
  //     paysVisite: [null]
  //   });
  // }

  // onSubmitForm(): void {
  //   console.log(this.formulaireInfosPersos.value);
  // }

}
