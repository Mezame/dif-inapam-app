import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Document } from '@features/documents/document.interface';

@Pipe({
  name: 'filterDocumentsByMonth',
})
export class FilterDocumentsByMonthPipe implements PipeTransform {
  private filteredDocuments$!: Observable<Document[]>;

  transform(
    value: Observable<Document[]>,
    monthNumber: number
  ): Observable<Document[]> {
    this.filteredDocuments$ = value.pipe(
      map((documents) =>
        documents.filter((document) => {
          const createDate = new Date(document.createDate);

          return createDate.getMonth() + 1 == monthNumber;
        })
      )
    );

    return this.filteredDocuments$;
  }
}
