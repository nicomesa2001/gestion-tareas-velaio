import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static uniqueName(people: FormArray): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;

      if (!control.parent) {
        return null;
      }

      const isDuplicate = people.controls.some((personControl) => {
        const personNameControl = personControl.get('name');

        if (personNameControl && personNameControl.value === name && personControl !== control.parent) {
          return true;
        }
        return false;
      });

      return isDuplicate ? { duplicateName: true } : null;
    };
  }
}
