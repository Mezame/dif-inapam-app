import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleFormError'
})
export class SingleFormErrorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
