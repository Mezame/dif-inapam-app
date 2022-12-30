import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { catchError, from, Observable, of, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class UploadFilesService {
  constructor(private fireStorage: Storage) {}

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
        this.handleError<string>('UploadFilesService', 'uploadFromBlob')
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
