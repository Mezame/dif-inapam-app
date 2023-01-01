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
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/services/error-handlers/firebase-error-handler.service';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class AddAssistantsService {
  assistantsCollection = collection(
    this.firestore,
    'assistants'
  ) as CollectionReference<DocumentData>;

  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'AddAssistantsService'
    );
  }

  addAssistant(
    assistant: Assistant | Partial<Assistant>
  ): Observable<DocumentReference<DocumentData>> {
    const assistantRef$ = from(addDoc(this.assistantsCollection, assistant));

    return assistantRef$.pipe(
      take(1),
      tap((docRef) => {
        console.log(`added assistant w/ id=${docRef.id}`);
      }),
      catchError(
        this.handleError<DocumentReference<DocumentData>>('addAssistant')
      )
    );
  }

  setAssistant(
    assistant: Assistant | Partial<Assistant>,
    id?: string
  ): Observable<any> {
    let assistantRes$: Observable<any>;
    let assistantId: string;

    if (id) {
      assistantId = id;
      const docRef = doc(this.firestore, 'assistants', assistantId);

      assistantRes$ = from(setDoc(docRef, assistant)).pipe(
        map((res) => {
          if (res == undefined) {
            return true;
          } else {
            throw new Error('could not set assistant');
          }
        })
      );
    } else {
      const docRef = doc(this.assistantsCollection);

      assistantId = docRef.id;

      const newAssistant = {
        ...assistant,
        metadata: {
          id: assistantId,
          timestamp: serverTimestamp(),
        },
      };

      assistantRes$ = from(setDoc(docRef, newAssistant)).pipe(
        map((res) => {
          if (res == undefined) {
            const ref = newAssistant.metadata;
            return ref;
          } else {
            throw new Error('could not set assistant');
          }
        })
      );
    }

    return assistantRes$.pipe(
      take(1),
      tap((_) => {
        console.log(`set assistant w/ id=${assistantId}`);
      }),
      catchError(this.handleError<any>('setAssistant'))
    );
  }
}
