import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '@features/documents/document.interface';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { Order } from '@shared/order.type';

@Pipe({
  name: 'sortDocumentsByDate',
})
export class SortDocumentsByDatePipe implements PipeTransform {
  constructor(private sortDocumentsService: SortDocumentsService) {}

  transform(
    documents: Observable<Document[]>,
    order: Order
  ): Observable<Document[]> {
    return this.sortDocumentsService.sortDocumentsByCreateDate(
      documents,
      order
    );
  }
}