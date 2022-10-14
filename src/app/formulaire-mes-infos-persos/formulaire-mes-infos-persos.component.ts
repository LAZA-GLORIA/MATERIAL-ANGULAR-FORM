import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  paysPlaceholder: string[] = [];
  paysVisites: string[] = ["France", "Allemagne", "Pays-Bas", "Danemark", "Italie"];
  filteredPaysVisites$!: Observable<string[]>;

  nirControl = new FormControl(null, [Validators.required,methodeNirValidator()]);
  cleNirControl = new FormControl(null, [Validators.required]);
  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  paysVisitesControl = new FormControl();

  //userForm
  userForm = this.formBuilder.group({
      genre: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      //nir: [null, [Validators.required, methodeNirValidator()]],
      nir: this.nirControl,
      //cleNir: [null, [Validators.required]],
      cleNir: this.cleNirControl,
      email: this.emailControl,
      paysVisites: this.paysVisitesControl
  }, 
  {
    validators: [ methodeCleNirValidator()]
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

  //parametre cle, booleen si cle valide avec equation 

}

{
  nirStrength: {
    hasNumeric: false
  }
}

{
  cleNirInvalide: {
    hasclenir: true
    hasnir: true
    hasfinale: false
  }
}

function methodeNirValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    if(value.length > 13) return {nirStrength:true}
    const hasNumeric = /[1-97]/.test(value);

    const nirValide = hasNumeric;
    console.log(hasNumeric);

    return !nirValide ? {nirStrength:true}: null;

  }
}

function methodeCleNirValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
  const nirControl: number = parseInt(control.get('nir')?.value);
  const cleNirControl: number = control.get('cleNir')?.value;
  //const cleNirControlString: string = control.get('cleNir')?.value;

  const newCleNir: number = (97 - (nirControl%97));

 // if (cleNirControlString.length > 2) return { identityRevealed: true };
 
  // const hasclenir = /[$newCleNir]/.test(control.value);
  // const hasnir = /[$nirControl]/.test(control.value);


  // console.log(`MODULO: ${hasclenir} - VALEUR: ${newCleNir}`);
  // console.log(`NIR: ${hasnir} - VALEUR: ${nirControl}`);

  console.log(`VALEUR CLE NIR: ${cleNirControl}`);

  // const hasfinale = hasclenir && hasnir;

  //return hasfinale ? null : { cleNirInvalide: true };
 return cleNirControl === nirControl ? null : { identityRevealed: true };
}
}

//   function methodeCleNirValidator(): ValidatorFn {
//     return (control:AbstractControl) : ValidationErrors | null => {
//       const value = control.value;
//       if (!value) {
//         return null;
//       }

//       if(value.length > 2) return {cleNirStrength:true}
//       const hasNumeriCle = /[97 - (this.nirValide)%97)]+/.test(value);
//       //const hasNumeriCle = /[hasNumeric]+/.test(value);
//       const CleNirValide = hasNumeriCle;
  
//       return !CleNirValide ? {cleNirStrength:true}: null;
  
//     }
// }

// function methodeCleNirValidator(): ValidatorFn {
//   return (control:AbstractControl) : ValidationErrors | null => {
//     const value = control.value;
//     if(value.length >= 8) return {cleNirStrength:true};
//   }
// }

