import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Report } from '@features/reports/report.interface';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { catchError, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetReportsService {
  private reportsCollectionRef = collection(
    this.firestore,
    'reports'
  ) as CollectionReference<DocumentData>;

  private handleError: HandleError;

  constructor(
    private firestore: Firestore,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService
  ) {
    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('GetReportsService');
  }

  getReports(): Observable<Report[]> {
    const reports$ = collectionData(this.reportsCollectionRef) as Observable<
      Report[]
    >;

    return reports$.pipe(
      take(1),
      tap((reports) => {
        if (reports.length > 0) {
          console.log('got reports');
        } else {
          console.log('did not found any report');
        }
      }),
      catchError(this.handleError<Report[]>('getReports', []))
    );
  }
}
