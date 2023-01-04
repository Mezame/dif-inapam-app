import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';
import { Assistant } from '@features/assistants/assistant.interface';
import { catchError, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetAssistantsService {
  private assistantsCollectionRef = collection(
    this.firestore,
    'assistants'
  ) as CollectionReference<DocumentData>;

  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private loggerService: LoggerService
  ) {
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      'GetAssistantsService'
    );
  }

  getAssistants(): Observable<Assistant[]> {
    const assistants$ = collectionData(
      this.assistantsCollectionRef
    ) as Observable<Assistant[]>;

    return assistants$.pipe(
      take(1),
      tap((assistants) => {
        if (assistants.length > 0) {
          this.loggerService.info(
            'GetAssistantsService: getAssistants: got assistants'
          );
        } else {
          this.loggerService.info(
            'GetAssistantsService: getAssistants: did not found any assistant'
          );
        }
      }),
      catchError(this.handleError<Assistant[]>('getAssistants', []))
    );
  }
}
