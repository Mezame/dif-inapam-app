import { Injectable } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GetReportsService } from '../firestore/get-reports.service';

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
