import { Injectable } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { GetReportsService } from '../firestore/get-reports.service';

@Injectable({
  providedIn: 'any',
})
export class ReportStoreService {
  private reports$ = new BehaviorSubject<Report[]>([]);

  constructor(private getReportsService: GetReportsService) {}

  loadReports() {
    this.getReportsService.getReports().subscribe((reports) => {
      if (reports?.length > 0) {
        this.reports$.next(reports);
      }
    });
  }

  getReports(): Observable<Report[]> {
    this.reports$.pipe(take(2)).subscribe((reports) => {
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
