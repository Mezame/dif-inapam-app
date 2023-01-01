import { Injectable } from '@angular/core';
import { deleteObject, ref, Storage } from '@angular/fire/storage';
import { catchError, from, map, Observable, take, tap } from 'rxjs';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '../error-handlers/firebase-error-handler.service';

@Injectable({
  providedIn: 'any',
})
export class DeleteFilesService {
  private handleError: HandleError;

  constructor(
    private fireStorage: Storage,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
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
      tap((_) => console.log('deleted file')),
      catchError(this.handleError<boolean>('deleteFile'))
    );
  }
}
