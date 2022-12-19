import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { Document } from '@features/documents/document.interface';
import { catchError, from, Observable, of, tap } from 'rxjs';

@Injectable()
export class AddDocumentsService {
  constructor(private firestore: Firestore) {}

  addDocument(document: Document) {
    const documentsCollection = collection(this.firestore, 'documents');

    const documentRef$ = from(addDoc(documentsCollection, document));

    return documentRef$.pipe(
      tap((docRef) => {
        console.log(`added document w/ id=${docRef.id}`);
      }),
      catchError(
        this.handleError<DocumentReference<DocumentData>>(
          'AddDocumentsService',
          'addDocument'
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
