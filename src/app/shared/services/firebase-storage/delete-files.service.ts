import { Injectable } from '@angular/core';
import { deleteObject, ref, Storage } from '@angular/fire/storage';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DeleteFilesService {
  constructor(private fireStorage: Storage) {}

  deleteFile(filename: string): Observable<boolean> {
    const storageRef = ref(this.fireStorage, `documents/${filename}`);

    const deleteResult$ = from(deleteObject(storageRef)).pipe(
      map((deleteResult) => {
        if (deleteResult == undefined) {
          return true;
        } else {
          throw new Error('could not delete document');
        }
      })
    );

    return deleteResult$.pipe(
      take(1),
      tap((_) => console.log('deleted file')),
      catchError(
        this.handleError<boolean>('DeleteFilesService', 'deleteFile')
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
