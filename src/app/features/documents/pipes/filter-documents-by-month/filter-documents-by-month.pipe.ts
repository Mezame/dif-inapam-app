import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from '@features/documents/document.interface';
import { MonthNumber } from '@shared/types/month-number.type';
import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';

@Pipe({
  name: 'filterDocumentsByMonth',
})
export class FilterDocumentsByMonthPipe implements PipeTransform {
  constructor(private filterDocumentsService: FilterDocumentsService) {}

  transform(
    documents$: Observable<Document[]>,
    monthNumber: MonthNumber | string
  ): Observable<Document[]> {
    if (!documents$) return of([]);

    return this.filterDocumentsService.filterDocumentsByMonth(
      documents$,
      monthNumber as MonthNumber
    );
  }
}
