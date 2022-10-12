import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


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
export class FormulaireMesInfosPersosComponent {
  //formulaireInfosPersos!: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  paysPlaceholder: string[] = ["Espagne"];
  paysVisites: string[] = ["France", "Allemagne", "Pays-Bas", "Danemark", "Italie"];
  filteredPaysVisites$!: Observable<string[]>;

  genreControl = new FormControl(null, [Validators.required]);
  nomControl = new FormControl(null, [Validators.required]);
  prenomControl = new FormControl(null, [Validators.required]);
  nirControl = new FormControl(null, [Validators.required, Validators.pattern('[01-97]$')]);
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

  @ViewChild('paysVisitesInput', { static: false })
  paysVisitesInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;

  constructor(private formBuilder: FormBuilder) { 
    this.filteredPaysVisites$ = this.paysVisitesControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => value ? this.__filter(value) : this.paysVisites.slice())
      //map((value) => value ? this.filter(value) : this.paysVisites.slice())
    );
  }

  // ngOnInit(): void {  
  //   this.paysVisites = this.paysVisitesService.getAllPaysVisites();
   
  // }

  add(event: MatChipInputEvent): void {
    //const value = (event.value || '').trim();

    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input; //'input' is deprecated. Use `MatChipInputEvent#chipInput.inputElement` instead.
      //const input = event.chipInput;
      const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.paysPlaceholder.push(value.trim());
    }

    // Clear the input value
    //event.chipInput!.clear();

     // Reset the input value
     if (input) {
      input.value = '';
    }

    this.paysVisitesControl.setValue(null);
  }
}

  remove(element: string): void {
    const index = this.paysPlaceholder.indexOf(element);

    if (index >= 0) {
      this.paysPlaceholder.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.paysPlaceholder.push(event.option.viewValue);
    this.paysVisitesInput.nativeElement.value = '';
    this.paysVisitesControl.setValue(null);
  }

  private __filter(value: string): string[] {
    const filtervalue=value.toLowerCase();
    return this.paysVisites.filter(
      (element) => element.toLowerCase().indexOf(filtervalue) === 0
      );
  }

}



