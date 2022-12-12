import { Observable, tap } from 'rxjs';
import { Document } from '@features/documents/document.interface';

export function getMonthsNumbers(documents: Observable<Document[]>, year: string): string[] {
  let months: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const monthNumber = (createDate.getMonth() + 1).toString();
          const documentYear = createDate.getFullYear().toString();

          if (!months.includes(monthNumber) && year == documentYear) {
            months.push(monthNumber);
          }
        });
      })
    )
    .subscribe();

  return months;
}

export function getMonthsWords(documents: Observable<Document[]>, year: string): string[] {
  let months: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const monthWord = createDate.toLocaleDateString('es-MX', {
            month: 'long',
          });
          const documentYear = createDate.getFullYear().toString();

          if (!months.includes(monthWord) && year == documentYear) {
            months.push(monthWord);
          }
        });
      })
    )
    .subscribe();

  return months;
}

export function getYears(documents: Observable<Document[]>): string[] {
  let years: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const documentYear = createDate.getFullYear().toString();

          if (!years.includes(documentYear)) {
            years.push(documentYear);
          }
        });
      })
    )
    .subscribe();

  return years;
}
