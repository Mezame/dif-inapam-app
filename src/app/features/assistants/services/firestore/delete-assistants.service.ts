import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DeleteAssistantsService {
  constructor(private firestore: Firestore) {}

  deleteAssistant(id: string): Observable<boolean> {
    const docRef = doc(this.firestore, 'assistants/' + id);

    const assistantRes$ = from(deleteDoc(docRef)).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          throw new Error('could not delete assistant');
        }
      })
    );

    return assistantRes$.pipe(
      take(1),
      tap((_) => {
        console.log(`deleted assistant w/ id=${id}`);
      }),
      catchError(
        this.handleError<boolean>('DeleteAssistantsService', 'deleteAssistant')
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
