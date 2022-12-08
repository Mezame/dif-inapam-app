import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  transform(date: string): string {
    let convertedDate: string;
    const dated = new Date(date);

    convertedDate = dated.toLocaleDateString('es-MX', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return convertedDate;
  }
}
