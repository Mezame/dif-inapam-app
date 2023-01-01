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
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
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
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
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
          console.log('got documents');
        } else {
          console.log('did not found any document');
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

        return document!;
      })
    );

    return document$.pipe(
      take(1),
      tap((document) => {
        if (!document)
          throw new Error(`did not found any document w/ cardCode=${cardCode}`);

        console.log(`got document w/ cardCode=${cardCode}`);
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
      map((dateStore) => {
        return dateStore.data() as DateStore;
      })
    );

    return dateStore$.pipe(
      take(1),
      tap((dateStore) => {
        if (!dateStore) throw new Error('did not found any date store');

        console.log(`got date store`);
      }),
      catchError(this.handleError<DateStore>('getDocumentUtilsDateStore'))
    );
  }
}
