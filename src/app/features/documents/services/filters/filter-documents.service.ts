import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MonthNumber } from '@shared/types/month-number.type';
import { Document } from '@features/documents/document.interface';

@Injectable()
export class FilterDocumentsService {
  private filteredDocuments$!: Observable<Document[]>;

  filterDocumentsByMonth(
    documents: Observable<Document[]>,
    monthNumber: MonthNumber
  ): Observable<Document[]> {
    if (typeof monthNumber == 'string')
      monthNumber = parseInt(monthNumber) as MonthNumber;

    this.filteredDocuments$ = documents.pipe(
      map((documents) =>
        documents.filter((document) => {
          const createDate = new Date(document.createDate);

          return createDate.getMonth() + 1 == monthNumber;
        })
      )
    );

    return this.filteredDocuments$;
  }

  filterDocumentsByYear(
    documents: Observable<Document[]>,
    year: string | number
  ): Observable<Document[]> {
    if (typeof year == 'string') year = parseInt(year);

    this.filteredDocuments$ = documents.pipe(
      map((documents) =>
        documents.filter((document) => {
          const createDate = new Date(document.createDate);

          return createDate.getFullYear() == year;
        })
      )
    );

    return this.filteredDocuments$;
  }
}
