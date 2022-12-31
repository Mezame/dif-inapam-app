import { Injectable } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GetReportsService } from '../firestore/get-reports.service';

@Injectable({
  providedIn: 'root',
})
export class ReportStoreService {
  private readonly reports$ = new BehaviorSubject<Report[]>([]);

  constructor(private getReportsService: GetReportsService) {}

  loadReports() {
    this.getReportsService.getReports().subscribe((reports) => {
      this.reports$.next(reports);
    });
  }

  getReports(): Observable<Report[]> {
    const reports = this.reports$.getValue();

    if (reports.length < 1) {
      this.loadReports();
    }

    return this.reports$;
  }

  getReport(id: string): Observable<Report> {
    const report$ = this.getReports().pipe(
      map((reports) => {
        const report = reports.find(
          (rep) => rep.metadata?.id == id ?? {}
        ) as Report;

        return report;
      })
    );

    return report$;
  }
}
