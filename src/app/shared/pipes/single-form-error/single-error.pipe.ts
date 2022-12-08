import { Pipe, PipeTransform } from '@angular/core';

interface documentFormControlErrors {
  minlength?: {};
  maxlength?: {};
  pattern?: {};
}

@Pipe({
  name: 'singleError',
})
export class SingleErrorPipe implements PipeTransform {
  transform(
    errors: documentFormControlErrors | null,
    priorities: string[]
  ): documentFormControlErrors | null {
    if (!errors) return null;

    const singleError: documentFormControlErrors = {};

    priorities.some((priority) => {
      if (errors[priority as keyof documentFormControlErrors]) {
        singleError[priority as keyof documentFormControlErrors] =
          errors[priority as keyof documentFormControlErrors];

        return true;
      }

      return;
    });

    return singleError;
  }
}
