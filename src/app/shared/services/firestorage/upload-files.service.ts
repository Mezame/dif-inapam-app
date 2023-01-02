import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { catchError, from, map, Observable, switchMap, take, tap } from 'rxjs';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';

@Injectable({
  providedIn: 'any',
})
export class UploadFilesService {
  private handleError: HandleError;

  constructor(
    private fireStorage: Storage,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private loggerService: LoggerService
  ) {
    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('UploadFilesService');
  }

  uploadFromBlob(file: File, filename: string): Observable<string> {
    const storageRef = ref(this.fireStorage, `documents/${filename}`);

    const uploadResult$ = from(uploadBytes(storageRef, file)).pipe(
      map((uploadResult) => {
        if (!uploadResult) throw new Error('could not upload file');

        this.loggerService.info('uploaded file');

        return uploadResult;
      })
    );

    const downloadUrl$ = uploadResult$.pipe(
      switchMap((uploadResult) => getDownloadURL(uploadResult.ref))
    );

    return downloadUrl$.pipe(
      take(1),
      tap((downloadUrl) => {
        if (downloadUrl) {
          this.loggerService.info('got file download url');
        } else {
          throw new Error('could not get file download url');
        }
      }),
      catchError(this.handleError<string>('uploadFromBlob'))
    );
  }
}
