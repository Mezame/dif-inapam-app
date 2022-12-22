import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, tap } from 'rxjs';

@Injectable()
export class DeleteAssistantsService {
  constructor(private firestore: Firestore) {}

  deleteAssistant(id: string): Observable<unknown> {
    const docRef = doc(this.firestore, 'assistants/' + id);

    const assistantRef$ = from(deleteDoc(docRef));

    return assistantRef$.pipe(
      map((docRef) => {
        if (docRef == undefined) {
          return id;
        } else {
          throw new Error('could not delete assistant');
        }
      }),
      tap((_) => {
        console.log(`deleted assistant w/ id=${id}`);
      }),
      catchError(
        this.handleError<unknown>('DeleteAssistantsService', 'deleteAssistant')
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
