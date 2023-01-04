import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartPieData } from '@shared/components/chart-pie/chart-pie-data.interface';
import { Report } from '../report.interface';

@Component({
  selector: 'app-report-detail-content',
  templateUrl: './report-detail-content.component.html',
  styleUrls: ['./report-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailContentComponent {
  @Input('data') report!: Report;

  setSexStatsPieChartData(sexStats: Report['sexStats']): ChartPieData[] {
    const chartPieData = [
      {
        value: sexStats.male,
        name: 'Hombre',
      },
      {
        value: sexStats.female,
        name: 'Mujer',
      },
    ] as ChartPieData[];

    return chartPieData;
  }
}
