import { Injectable } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { GetDocumentsService } from '../get-documents.service';

@Injectable()
export class DocumentStoreService {
  private documents$ = new BehaviorSubject<Document[]>([]);

  private dateStore$ = new BehaviorSubject<DateStore>({
    months: {
      numbers: [],
      words: [],
    },
    years: [],
  });

  constructor(private getDocumentsService: GetDocumentsService) {
    this.getDocumentsService.getDocuments().subscribe((documents) => {
      this.documents$.next(documents);
    });

    this.getDocumentsService
      .getDocumentUtilsDateStore()
      .subscribe((dateStore) => {
        this.dateStore$.next(dateStore);
      });
  }

  getDocuments(): Observable<Document[]> {
    return this.documents$;
  }

  getDocumentByCardCode(cardCode: string): Observable<Document> {
    const documents$ = this.getDocuments();

    const document$ = documents$.pipe(
      map((documents) => {
        let document;

        document = documents.find((d) => d.cardCode == cardCode) ?? {};

        return document as Document;
      })
    );

    return document$.pipe(
      tap((document) => {
        if (!document) throw new Error('could not get document');
      }),
      catchError(
        this.handleError<Document>(
          'DocumentStoreService',
          `getDocumentByCardCode w/ cardCode=${cardCode}`
        )
      )
    );
  }

  getDocumentUtilsDateStore(): Observable<DateStore> {
    return this.dateStore$;
  }

  private handleError<T>(
    serviceName = '',
    operation = 'operation',
    result = {} as T
  ) {
    return (error: any): Observable<T> => {
      console.log(`${serviceName}: ${operation} failed: ${error.message}`);

      return of(result);
    };
  }
}
