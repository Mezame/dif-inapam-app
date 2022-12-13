import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '@features/documents/document.interface';
import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';

@Pipe({
  name: 'filterDocumentsByYear',
})
export class FilterDocumentsByYearPipe implements PipeTransform {
  constructor(private filterDocumentsService: FilterDocumentsService) {}

  transform(
    documents: Observable<Document[]>,
    year: string | number
  ): Observable<Document[]> {
    return this.filterDocumentsService.filterDocumentsByYear(documents, year);
  }
}
