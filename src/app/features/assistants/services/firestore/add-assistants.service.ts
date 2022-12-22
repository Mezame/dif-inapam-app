import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { Assistant } from '@features/assistants/assistant.interface';
import { catchError, from, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class AddAssistantsService {
  constructor(private firestore: Firestore) {}

  addAssistant(
    assistant: Assistant
  ): Observable<DocumentReference<DocumentData>> {
    const assistantsCollection = collection(this.firestore, 'assistants');

    const assistantRef$ = from(addDoc(assistantsCollection, assistant));

    return assistantRef$.pipe(
      take(1),
      tap((docRef) => {
        console.log(`added assistant w/ id=${docRef.id}`);
      }),
      catchError(
        this.handleError<DocumentReference<DocumentData>>(
          'AddAssistantsService',
          'addAssistant'
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
