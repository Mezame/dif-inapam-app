import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function elderBirthdateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const error = { isNotElder: true } as ValidationErrors;
    const birthdate = control.value as Date;
    const currentDate = new Date();

    const isElder = currentDate.getFullYear() - birthdate.getFullYear() > 65;

    console.log(isElder);

    return !isElder ? error : null;
  };
}
