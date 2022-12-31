import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Assistant } from '@features/assistants/assistant.interface';
import { catchError, Observable, of, take, tap } from 'rxjs';

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
    const assistants$ = collectionData(
      this.assistantsCollectionRef
    ) as Observable<Assistant[]>;

    return assistants$.pipe(
      take(1),
      tap((assistants) => {
        if (assistants.length > 0) {
          console.log('got assistants');
        } else {
          console.log('there were no assistants')
        }
      }),
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
