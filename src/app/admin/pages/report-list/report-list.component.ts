import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { ReportStoreService } from '@features/reports/services/firestore/report-store.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListComponent implements OnInit {
  reports$!: Observable<Report[]>;

  constructor(private reportStoreService: ReportStoreService) {}

  ngOnInit(): void {
    this.reports$ = this.reportStoreService.getReports().pipe(
      map((reports) => {
        reports.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        return reports;
      })
    );;
  }
}
