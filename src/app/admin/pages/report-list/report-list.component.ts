import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getReports, sortReportsByDate } from '@features/reports/get-reports';
import { Report } from '@features/reports/report.interface';
import { documentsMock } from '@mocks/document.mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListComponent implements OnInit {
  reports$!: Observable<Report[]>;

  ngOnInit(): void {
    this.reports$ = of(sortReportsByDate(getReports(of(documentsMock)), 'asc'));
  }
}
