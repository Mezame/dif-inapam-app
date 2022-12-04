import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Document } from '@features/documents/document.interface';
import { Order } from '@shared/order.type';

@Injectable()
export class SortDocumentsService {
  private orderedDocuments$!: Observable<Document[]>;
  orderFn!: (a: Document, b: Document) => number;

  sortDocumentsByCreateDate(documents: Observable<Document[]>, order: Order) {
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
