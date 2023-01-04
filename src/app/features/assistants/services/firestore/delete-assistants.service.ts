import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DeleteAssistantsService {
  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private alertsService: AlertsService,
    private loggerService: LoggerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'DeleteAssistantsService'
    );
  }

  deleteAssistant(id: string): Observable<boolean> {
    const docRef = doc(this.firestore, 'assistants/' + id);

    const assistantRes$ = from(deleteDoc(docRef)).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          this.alertsService.setAlert(
            'No ha sido posible eliminar el asistente.'
          );

          throw new Error('could not delete assistant');
        }
      })
    );

    return assistantRes$.pipe(
      take(1),
      tap((_) => {
        this.loggerService.info(
          `DeleteAssistantsService: deleteAssistant: deleted assistant w/ id=${id}`
        );

        this.alertsService.setAlert('Se ha eliminado el asistente.');
      }),
      catchError(this.handleError<boolean>('deleteAssistant'))
    );
  }
}
