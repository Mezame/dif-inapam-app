import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../report.interface';

@Component({
  selector: 'app-report-list-table',
  templateUrl: './report-list-table.component.html',
  styleUrls: ['./report-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListTableComponent {
  displayedColumns = [
    'date',
    'cardsCount',
    'cardCodesRange',
    'options',
  ];

  @Input('data') reports$!: Observable<Report[]>;
}
