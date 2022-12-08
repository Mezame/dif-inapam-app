import { Observable, tap } from 'rxjs';
import { Document } from '@features/documents/document.interface';

export function getMonthsNumbers(documents: Observable<Document[]>): string[] {
  let months: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const monthNumber = (createDate.getMonth() + 1).toString();

          if (!months.includes(monthNumber)) {
            months.push(monthNumber);
          }
        });
      })
    )
    .subscribe();

  return months;
}

export function getMonthsWords(documents: Observable<Document[]>): string[] {
  let months: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const monthWord = createDate.toLocaleDateString('es-MX', {
            month: 'long',
          });

          if (!months.includes(monthWord)) {
            months.push(monthWord);
          }
        });
      })
    )
    .subscribe();

  return months;
}
