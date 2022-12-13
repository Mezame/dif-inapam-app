import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailContentComponent } from './report-detail-content.component';
import { ChartPieModule } from '@shared/components/chart-pie/chart-pie.module';

@NgModule({
  declarations: [ReportDetailContentComponent],
  imports: [CommonModule, ChartPieModule],
  exports: [ReportDetailContentComponent],
})
export class ReportDetailContentModule {}
