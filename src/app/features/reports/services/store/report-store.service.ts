import { Injectable } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GetReportsService } from '../firestore/get-reports.service';

@Injectable({
  providedIn: 'root',
})
export class ReportStoreService {
  private readonly reports$: BehaviorSubject<Report[]>;

  private mockReports = [
    {
      date: '11/15/2022, 12:00:00 AM',
      cardsStats: {
        newRecord: 1,
        replacement: 0,
        change: 0,
        cancel: 0,
      },
      cardCodesRange: ['P000000000', 'P000000000'],
      sexStats: { male: 0, female: 1 },
      metadata: {
        id: 'VER-TUXPAN-noviembre-2022',
      },
    },
  ] as Report[];

  constructor(private getReportsService: GetReportsService) {
    this.reports$ = new BehaviorSubject<Report[]>(this.mockReports);
  }

  loadReports() {
    this.getReportsService
      .getReports()
      .pipe(map((reports) => (reports.length > 0 ? reports : null)))
      .subscribe((reports) => {
        if (reports) {
          this.reports$.next(reports);
        }
      });
  }

  getReportsValue(): readonly Report[] {
    const reports = this.reports$.getValue() as ReadonlyArray<Report>;

    return reports;
  }

  getReports(): Observable<Report[]> {
    const reports = this.getReportsValue();

    if (
      reports.length < 1 ||
      reports[0].metadata?.id == 'VER-TUXPAN-noviembre-2022'
    ) {
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
