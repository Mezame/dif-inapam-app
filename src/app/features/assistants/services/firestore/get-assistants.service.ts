import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Assistant } from '@features/assistants/assistant.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetAssistantsService {
  private assistantsCollectionRef = collection(
    this.firestore,
    'assistants'
  ) as CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {}

  getAssistants(): Observable<Assistant[]> {
    const assistant$ = collectionData(
      this.assistantsCollectionRef
    ) as Observable<Assistant[]>;

    return assistant$.pipe(
      catchError(
        this.handleError<Assistant[]>(
          'GetAssistantsService',
          'getAssistants',
          []
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
