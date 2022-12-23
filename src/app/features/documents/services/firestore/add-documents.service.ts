import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Document } from '@features/documents/document.interface';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class AddDocumentsService {
  constructor(private firestore: Firestore) {}

  addDocument(document: Document): Observable<DocumentReference<DocumentData>> {
    const documentsCollection = collection(this.firestore, 'documents');

    const documentRef$ = from(addDoc(documentsCollection, document));

    return documentRef$.pipe(
      take(1),
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

  setDocument(id: string, document: Document): Observable<unknown> {
    const docRef = doc(this.firestore, 'documents', id);

    const documentRef$ = from(setDoc(docRef, document)).pipe(
      map((docRef) => {
        if (docRef == undefined) {
          return id;
        } else {
          throw new Error('could not set document');
        }
      })
    );

    return documentRef$.pipe(
      take(1),
      tap((_) => {
        console.log(`setted document w/ id=${id}`);
      }),
      catchError(
        this.handleError<unknown>('AddDocumentsService', 'setDocument')
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
