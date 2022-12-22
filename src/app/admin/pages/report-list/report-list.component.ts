import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { ReportStoreService } from '@features/reports/services/firestore/report-store.service';
import { SortReportsService } from '@features/reports/services/sorts/sort-reports.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListComponent implements OnInit {
  reports$!: Observable<Report[]>;

  constructor(
    private reportStoreService: ReportStoreService,
    private sortReportsService: SortReportsService
  ) {}

  ngOnInit(): void {
    this.reports$ = this.sortReportsService.sortReportsByDate(
      this.reportStoreService.getReports(),
      'asc'
    );
  }
}
