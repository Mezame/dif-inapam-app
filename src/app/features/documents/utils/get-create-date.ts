import { Observable, tap } from 'rxjs';
import { Document } from '@features/documents/document.interface';
import { number } from 'echarts/core';

export function getMonthsNumbers(
  documents: Observable<Document[]>,
  year: string
): string[] {
  let monthsNumbers: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const documentMonth = (createDate.getMonth() + 1).toString();
          const documentYear = createDate.getFullYear().toString();

          if (!monthsNumbers.includes(documentMonth) && year == documentYear) {
            monthsNumbers.push(documentMonth);
          }
        });

        monthsNumbers.sort((a, b) => parseInt(a) - parseInt(b));
      })
    )
    .subscribe();

  return monthsNumbers;
}

export function getMonthsWords(
  documents: Observable<Document[]>,
  year: string
): string[] {
  let monthsWords: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.sort(
          (a, b) => Date.parse(a.createDate) - Date.parse(b.createDate)
        );

        documents.forEach((document) => {
          const createDate = new Date(document.createDate);
          const documentMonth = createDate.toLocaleDateString('es-MX', {
            month: 'long',
          });
          const documentYear = createDate.getFullYear().toString();

          if (!monthsWords.includes(documentMonth) && year == documentYear) {
            monthsWords.push(documentMonth);
          }
        });
      })
    )
    .subscribe();

  return monthsWords;
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

        years.sort((a, b) => parseInt(a) - parseInt(b));
      })
    )
    .subscribe();

  return years;
}
