import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '@features/documents/document.interface';
import { MonthNumber } from '@shared/monthNumber.type';
import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';

@Pipe({
  name: 'filterDocumentsByMonth',
})
export class FilterDocumentsByMonthPipe implements PipeTransform {
  constructor(private filterDocumentsService: FilterDocumentsService) {}

  transform(
    documents: Observable<Document[]>,
    monthNumber: MonthNumber
  ): Observable<Document[]> {
    return this.filterDocumentsService.filterDocumentsByMonth(
      documents,
      monthNumber
    );
  }
}
