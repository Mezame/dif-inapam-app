import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '@features/reports/report.interface';
import { SortReportsService } from '@features/reports/services/sorts/sort-reports.service';
import { ReportStoreService } from '@features/reports/services/store/report-store.service';
import { Observable } from 'rxjs';
import { whenNoReportExistPatch } from '../../shared/when-no-report-exists-patch';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListComponent implements OnInit {
  reports$!: Observable<Report[] | any>;

  constructor(
    private reportStoreService: ReportStoreService,
    private sortReportsService: SortReportsService,
    private router: Router
  ) {
    whenNoReportExistPatch(this.reportStoreService, this.router);
  }

  ngOnInit(): void {
    this.reports$ = this.sortReportsService.sortReportsByDate(
      this.reportStoreService.getReports(),
      'asc'
    );
  }
}
