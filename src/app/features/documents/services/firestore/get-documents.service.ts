import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetDocumentsService {
  private documentsCollectionRef = collection(
    this.firestore,
    'documents'
  ) as CollectionReference<DocumentData>;

  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private loggerService: LoggerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'GetDocumentsService'
    );
  }

  getDocuments(): Observable<Document[]> {
    const documents$ = collectionData(
      this.documentsCollectionRef
    ) as Observable<Document[]>;

    return documents$.pipe(
      take(1),
      tap((documents) => {
        if (documents.length > 0) {
          this.loggerService.info('got documents');
        } else {
          this.loggerService.info('did not found any document');
        }
      }),
      catchError(this.handleError<Document[]>('getDocuments', []))
    );
  }

  getDocumentByCardCode(cardCode: string): Observable<Document> {
    const cardCodeQuery = query(
      this.documentsCollectionRef,
      where('cardCode', '==', cardCode)
    );

    const querySnapshot$ = from(getDocs(cardCodeQuery));

    const document$ = querySnapshot$.pipe(
      map((querySnapshot) => {
        let document: Document;

        querySnapshot.forEach((doc) => (document = doc.data() as Document));

        if (!document!)
          throw new Error(`did not found any document w/ cardCode=${cardCode}`);

        return document!;
      })
    );

    return document$.pipe(
      take(1),
      tap((document) => {
        if (document)
          this.loggerService.info(`got document w/ cardCode=${cardCode}`);
      }),
      catchError(
        this.handleError<Document>(
          `getDocumentByCardCode w/ cardCode=${cardCode}`
        )
      )
    );
  }

  getDocumentUtilsDateStore(): Observable<DateStore> {
    const docRef = doc(this.firestore, 'documentUtils', 'dateStore');

    const docSnap$ = from(getDoc(docRef));

    const dateStore$ = docSnap$.pipe(
      map((documentData) => {
        const dateStore = documentData.data() as DateStore;

        if (!dateStore) throw new Error('did not found any date store');

        return dateStore;
      })
    );

    return dateStore$.pipe(
      take(1),
      tap((dateStore) => {
        if (dateStore) this.loggerService.info(`got date store`);
      }),
      catchError(this.handleError<DateStore>('getDocumentUtilsDateStore'))
    );
  }
}
