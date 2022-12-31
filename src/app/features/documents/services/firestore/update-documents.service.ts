import { Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Document } from '@features/documents/document.interface';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class UpdateDocumentsService {
  constructor(private firestore: Firestore) {}

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
      catchError(
        this.handleError<boolean>('UpdateDocumentsService', 'updateDocument')
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
