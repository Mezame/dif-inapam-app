import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';
import { Document } from '@features/documents/document.interface';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class AddDocumentsService {
  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private alertsService: AlertsService,
    private loggerService: LoggerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'AddDocumentsService'
    );
  }

  addDocument(document: Document): Observable<DocumentReference<DocumentData>> {
    const documentsCollection = collection(this.firestore, 'documents');

    const documentRef$ = from(addDoc(documentsCollection, document));

    return documentRef$.pipe(
      take(1),
      tap((docRef) => {
        this.loggerService.info(`added document w/ id=${docRef.id}`);
      }),
      catchError(
        this.handleError<DocumentReference<DocumentData>>('addDocument')
      )
    );
  }

  setDocument(id: string, document: Document): Observable<boolean> {
    const docRef = doc(this.firestore, 'documents', id);

    const res$ = from(setDoc(docRef, document)).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          this.alertsService.setAlert(`No ha sido posible agregar el oficio`);

          throw new Error('could not set document');
        }
      })
    );

    return res$.pipe(
      take(1),
      tap((_) => {
        this.loggerService.info(`set document w/ id=${id}`);

        this.alertsService.setAlert(`Se ha agregado el oficio ${id}`);
      }),
      catchError(this.handleError<boolean>('setDocument'))
    );
  }
}
