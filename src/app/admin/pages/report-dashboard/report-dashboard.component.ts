import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getLatestReport } from '@features/reports/get-reports';
import { Report } from '@features/reports/report.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDashboardComponent {
  report$: Observable<Report> = of(getLatestReport());
}
