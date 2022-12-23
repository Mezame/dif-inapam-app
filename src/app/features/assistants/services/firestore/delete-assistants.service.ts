import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class DeleteAssistantsService {
  constructor(private firestore: Firestore) {}

  deleteAssistant(id: string): Observable<string> {
    const docRef = doc(this.firestore, 'assistants/' + id);

    const assistantRef$ = from(deleteDoc(docRef)).pipe(
      map((docRef) => {
        if (docRef == undefined) {
          return id;
        } else {
          throw new Error('could not delete assistant');
        }
      })
    );

    return assistantRef$.pipe(
      take(1),
      tap((_) => {
        console.log(`deleted assistant w/ id=${id}`);
      }),
      catchError(
        this.handleError<string>('DeleteAssistantsService', 'deleteAssistant')
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
