import { Injectable } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { Order } from '@shared/types/order.type';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class SortDocumentsService {
  private orderedDocuments$!: Observable<Document[]>;
  private orderFn!: (a: Document, b: Document) => number;

  sortDocumentsByCreateDate(
    documents: Observable<Document[]>,
    order: Order
  ): Observable<Document[]> {
    if (order == 'asc') {
      this.orderFn = (a, b) => {
        return Date.parse(b.createDate) - Date.parse(a.createDate);
      };
    }

    if (order == 'des') {
      this.orderFn = (a, b) => {
        return Date.parse(a.createDate) - Date.parse(b.createDate);
      };
    }

    this.orderedDocuments$ = documents.pipe(
      map((documents) => {
        return documents.sort(this.orderFn);
      })
    );

    return this.orderedDocuments$;
  }
}
