import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleError',
})
export class SingleErrorPipe implements PipeTransform {
  transform(errors: any, priorities: string[]) {
    if (!errors) return null;

    const singleError: any = {};

    priorities.some((priority) => {
      if (errors[priority]) {
        singleError[priority] = errors[priority];

        return true;
      }

      return;
    });

    return singleError;
  }
}
