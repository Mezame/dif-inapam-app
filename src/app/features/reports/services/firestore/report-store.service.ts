import { Injectable } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { DocumentStoreService } from '@features/documents/services/firestore/store/document-store.service';
import {
  getMonthsNumbers,
  getYears,
} from '@features/documents/utils/get-create-date';
import { Report } from '@features/reports/report.interface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { GetReportsService } from './get-reports.service';

@Injectable()
export class ReportStoreService {
  private reports$ = new BehaviorSubject<Report[]>([]);

  constructor(private getReportsService: GetReportsService) {}

  loadReports() {
    this.getReportsService.getReports().subscribe((reports) => {
      this.reports$.next(reports);
    });
  }

  getReports(): Observable<Report[]> {
    this.reports$.subscribe((reports) => {
      if (reports.length < 1) {
        this.loadReports();
      }
    });

    return this.reports$;
  }

  getReport(id: string): Observable<Report> {
    const reports$ = this.getReports();

    const report$ = reports$.pipe(
      map((reports) => {
        const report = reports.find((r) => r.metadata?.id == id) ?? {};

        return report as Report;
      })
    );

    return report$;
  }
}
