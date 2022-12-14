import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getReports, sortReportsByDate } from '@features/reports/get-reports';
import { Report } from '@features/reports/report.interface';
import { documentsMock } from '@shared/mocks/document.mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListComponent {
  reports$: Observable<Report[]> = of(
    sortReportsByDate(getReports(of(documentsMock)), 'asc')
  );
}
