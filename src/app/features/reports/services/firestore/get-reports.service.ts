import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Report } from '@features/reports/report.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetReportsService {
  private reportsCollectionRef = collection(
    this.firestore,
    'reports'
  ) as CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {}

  getReports(): Observable<Report[]> {
    const reports$ = collectionData(this.reportsCollectionRef) as Observable<
      Report[]
    >;

    return reports$.pipe(
      catchError(
        this.handleError<Report[]>('GetReportsService', 'getReports', [])
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
