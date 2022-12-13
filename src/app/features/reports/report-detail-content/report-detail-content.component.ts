import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Report } from '../report.interface';

@Component({
  selector: 'app-report-detail-content',
  templateUrl: './report-detail-content.component.html',
  styleUrls: ['./report-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailContentComponent implements OnInit {
  chartData!: { value: number; name: string }[];

  @Input('data') report!: Report;

  ngOnInit(): void {
    this.chartData = [
      {
        value: this.report.sexStats.male,
        name: 'Hombre',
      },
      {
        value: this.report.sexStats.female,
        name: 'Mujer',
      },
    ];
  }
}
