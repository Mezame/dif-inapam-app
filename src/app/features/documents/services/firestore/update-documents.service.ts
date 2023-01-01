import { Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Document } from '@features/documents/document.interface';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/services/error-handlers/firebase-error-handler.service';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class UpdateDocumentsService {
  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'UpdateDocumentsService'
    );
  }

  updateDocument(
    id: string,
    document: Document | Partial<Document>
  ): Observable<boolean> {
    const docRef = doc(this.firestore, 'documents/' + id);

    const res$ = from(updateDoc(docRef, { ...document })).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          throw new Error('could not update document');
        }
      })
    );

    return res$.pipe(
      take(1),
      tap((_) => {
        console.log(`updated document w/ id=${id}`);
      }),
      catchError(this.handleError<boolean>('updateDocument'))
    );
  }
}
