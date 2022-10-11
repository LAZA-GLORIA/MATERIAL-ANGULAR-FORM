import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PaysVisites } from '../models/pays-vistes.model';
import { PaysVisitesService } from '../services/pays-visites-services';
import { map, Observable, startWith } from 'rxjs';


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
export class FormulaireMesInfosPersosComponent implements OnInit{
  //formulaireInfosPersos!: FormGroup;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  paysVisites: PaysVisites[] = [];
  filteredPaysVisites$!: Observable<PaysVisites[]>;

  genreControl = new FormControl(null, [Validators.required]);
  nomControl = new FormControl(null, [Validators.required]);
  prenomControl = new FormControl(null, [Validators.required]);
  nirControl = new FormControl(null, [Validators.required]);
  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  paysVisitesControl = new FormControl();

  //userForm
  options = this.formBuilder.group({
      genre: this.genreControl,
      nom: this.nomControl,
      prenom: this.prenomControl,
      nir: this.nirControl,
      email: this.emailControl,
      paysVisites: this.paysVisitesControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private paysVisitesService: PaysVisitesService) { }

  ngOnInit(): void {  
    this.paysVisites = this.paysVisitesService.getAllPaysVisites();
    this.filteredPaysVisites$ = this.paysVisitesControl.valueChanges.pipe(
      startWith(''),
      map((value) => value ? this.filter(value) : this.paysVisites.slice())
    )
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.paysVisites.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(element: PaysVisites): void {
    const index = this.paysVisites.indexOf(element);

    if (index >= 0) {
      this.paysVisites.splice(index, 1);
    }
  }

  filter(value: PaysVisites) {
    const filtervalue=value.name.toLowerCase();
    return this.paysVisites.filter(
      (element) => element.name.toLowerCase().indexOf(filtervalue) === 0
      );
  }

}




