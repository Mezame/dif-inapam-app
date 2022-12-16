import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../report.interface';

@Component({
  selector: 'app-report-list-table',
  templateUrl: './report-list-table.component.html',
  styleUrls: ['./report-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListTableComponent implements OnInit {
  displayedColumns!: string[];

  @Input('data') reports$!: Observable<Report[]>;

  ngOnInit(): void {
    this.displayedColumns = ['date', 'cardsCount', 'cardCodesRange', 'options'];
  }
}
