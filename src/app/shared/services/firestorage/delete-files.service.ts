import { Injectable } from '@angular/core';
import { deleteObject, ref, Storage } from '@angular/fire/storage';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';
import { catchError, from, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DeleteFilesService {
  private handleError: HandleError;

  constructor(
    private fireStorage: Storage,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private loggerService: LoggerService
  ) {
    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('DeleteFilesService');
  }

  deleteFile(filename: string): Observable<boolean> {
    const storageRef = ref(this.fireStorage, `documents/${filename}`);

    const deleteResult$ = from(deleteObject(storageRef)).pipe(
      map((deleteResult) => {
        if (deleteResult == undefined) {
          return true;
        } else {
          throw new Error('could not delete file');
        }
      })
    );

    return deleteResult$.pipe(
      take(1),
      tap((_) =>
        this.loggerService.info('UploadFilesService: deleteFile: deleted file')
      ),
      catchError(this.handleError<boolean>('deleteFile'))
    );
  }
}
