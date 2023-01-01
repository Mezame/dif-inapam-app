import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DeleteDocumentsService {
  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'DeleteDocumentsService'
    );
  }

  deleteDocument(id: string): Observable<boolean> {
    const docRef = doc(this.firestore, 'documents/' + id);

    const documentRes$ = from(deleteDoc(docRef)).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          throw new Error('could not delete document');
        }
      })
    );

    return documentRes$.pipe(
      take(1),
      tap((_) => {
        console.log(`deleted document w/ id=${id}`);
      }),
      catchError(this.handleError<boolean>('deleteDocument'))
    );
  }
}
