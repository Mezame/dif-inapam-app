import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { catchError, from, Observable, switchMap, take, tap } from 'rxjs';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';

@Injectable({
  providedIn: 'any',
})
export class UploadFilesService {
  private handleError: HandleError;

  constructor(
    private fireStorage: Storage,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
  ) {
    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('UploadFilesService');
  }

  uploadFromBlob(file: File, filename: string): Observable<string> {
    const storageRef = ref(this.fireStorage, `documents/${filename}`);

    const fileRef$ = from(uploadBytes(storageRef, file));

    const downloadUrl$ = fileRef$.pipe(
      switchMap((snapshot) => getDownloadURL(snapshot.ref))
    );

    return downloadUrl$.pipe(
      take(1),
      tap((downloadUrl) => {
        if (downloadUrl) {
          console.log('uploaded file');
        } else {
          throw new Error('could not upload file');
        }
      }),
      catchError(
        this.handleError<string>('uploadFromBlob')
      )
    );
  }
}
