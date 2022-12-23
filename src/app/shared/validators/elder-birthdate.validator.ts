import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function elderBirthdateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const error = { isNotElder: true } as ValidationErrors;
    const birthdate =
      typeof control.value == 'string'
        ? new Date(control.value)
        : (control.value as Date);
    const currentDate = new Date();
    const elderAge = 60;

    const isElder = currentDate.getFullYear() - birthdate.getFullYear() > elderAge;

    return !isElder ? error : null;
  };
}
