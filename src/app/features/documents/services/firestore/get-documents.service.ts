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
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetDocumentsService {
  private documentsCollectionRef = collection(
    this.firestore,
    'documents'
  ) as CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {}

  getDocuments(): Observable<Document[]> {
    const documents$ = collectionData(
      this.documentsCollectionRef
    ) as Observable<Document[]>;

    return documents$.pipe(
      take(1),
      tap((documents) => {
        if (documents) {
          console.log('got documents');
        }
      }),
      catchError(
        this.handleError<Document[]>('GetDocumentService', 'getDocuments', [])
      )
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
        if (!document) throw new Error(`could not get document w/ cardCode=${cardCode}`);

        console.log(`got document w/ cardCode=${cardCode}`);
      }),
      catchError(
        this.handleError<Document>(
          'GetDocumentService',
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
        if (!dateStore) throw new Error('could not get date store');

        console.log(`got date store`);
      }),
      catchError(
        this.handleError<DateStore>(
          'GetDocumentService',
          'getDocumentUtilsDateStore'
        )
      )
    );
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
