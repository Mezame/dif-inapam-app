import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class DeleteDocumentsService {
  constructor(private firestore: Firestore) {}

  deleteDocument(id: string): Observable<boolean> {
    const docRef = doc(this.firestore, 'documents/' + id);

    const documentRef$ = from(deleteDoc(docRef)).pipe(
      map((docRef) => {
        if (docRef == undefined) {
          return true;
        } else {
          throw new Error('could not delete document');
        }
      })
    );

    return documentRef$.pipe(
      take(1),
      tap((_) => {
        console.log(`deleted document w/ id=${id}`);
      }),
      catchError(
        this.handleError<boolean>('DeleteDocumentsService', 'deleteDocument')
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
