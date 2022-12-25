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

@Injectable()
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
        let document;

        querySnapshot.forEach((doc) => (document = doc.data()));

        return document as unknown as Document;
      })
    );

    return document$.pipe(
      tap((document) => {
        if (!document) throw new Error('could not get document');
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
      map((createDate) => {
        return createDate.data() as DateStore;
      })
    );

    return dateStore$.pipe(
      take(1),
      tap((dateStore) => {
        if (!dateStore) throw new Error('could not get dateStore');
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
