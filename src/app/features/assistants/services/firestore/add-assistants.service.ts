import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { Assistant } from '@features/assistants/assistant.interface';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class AddAssistantsService {
  assistantsCollection = collection(
    this.firestore,
    'assistants'
  ) as CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {}

  addAssistant(
    assistant: Assistant
  ): Observable<DocumentReference<DocumentData>> {
    const assistantRef$ = from(addDoc(this.assistantsCollection, assistant));

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

  setAssistant(assistant: Assistant, id?: string) {
    let assistantRef$: Observable<any>;
    let assistantId: string;

    if (id) {
      assistantId = id;
      const docRef = doc(this.firestore, 'assistants', assistantId);

      assistantRef$ = from(setDoc(docRef, assistant));

      assistantRef$.pipe(
        map((docRef) => {
          if (docRef == undefined) {
            return assistantId;
          } else {
            throw new Error('could not set assistant');
          }
        })
      );
    } else {
      const docRef = doc(this.assistantsCollection);
      assistantId = docRef.id;

      assistantRef$ = from(
        setDoc(docRef, {
          ...assistant,
          metadata: {
            id: assistantId,
            timestamp: serverTimestamp(),
          },
        })
      ).pipe(
        map((_) => {
          if (assistantId) {
            return assistantId;
          } else {
            throw new Error('could not set assistant');
          }
        })
      );
    }

    return assistantRef$.pipe(
      take(1),
      tap((_) => {
        console.log(`setted assistant w/ id=${assistantId}`);
      }),
      catchError(this.handleError('AddAssistantsService', 'setAssistant'))
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
