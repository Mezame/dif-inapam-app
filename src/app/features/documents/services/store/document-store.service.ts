import { Injectable } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  skip,
  switchMap,
  tap,
} from 'rxjs';
import { GetDocumentsService } from '../firestore/get-documents.service';

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

  getDocumentByCardCode(cardCode: string) {
    const document$ = this.documents$.pipe(
      switchMap(async (documents) =>
        documents.find((document) => document.cardCode == cardCode)
      )
    );

    return document$.pipe(
      tap((document) => {
        if (!document) throw new Error('could not get document');
      }),
      catchError((error: any): Observable<Document | undefined> => {
        console.log(
          `DocumentStoreService: getDocumentByCardCode failed: ${error.message}`
        );

        return of(undefined);
      })
    );
  }

  getDocumentUtilsDateStore(): Observable<DateStore> {
    return this.dateStore$;
  }
}
