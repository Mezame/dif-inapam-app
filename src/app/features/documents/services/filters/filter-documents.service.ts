import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MonthNumber } from '@shared/month-number.type';
import { Document } from '@features/documents/document.interface';

@Injectable()
export class FilterDocumentsService {
  private filteredDocuments$!: Observable<Document[]>;

  filterDocumentsByMonth(
    documents: Observable<Document[]>,
    monthNumber: MonthNumber
  ): Observable<Document[]> {
    this.filteredDocuments$ = documents.pipe(
      map((documents) =>
        documents.filter((document) => {
          const createDate = new Date(document.createDate);

          return createDate.getMonth() + 1 == parseInt(monthNumber);
        })
      )
    );

    return this.filteredDocuments$;
  }
}
