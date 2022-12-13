import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getReportById, getReports } from '@features/reports/get-reports';
import { Report } from '@features/reports/report.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailComponent {
  report$!: Observable<Report>;

  constructor(private route: ActivatedRoute) {
    const id = route.snapshot.params['id'];

    this.report$ = of(getReportById(getReports(), id));
  }
}
