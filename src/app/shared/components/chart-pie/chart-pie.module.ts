import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartPieComponent } from './chart-pie.component';

@NgModule({
  declarations: [ChartPieComponent],
  imports: [CommonModule],
  exports: [ChartPieComponent],
})
export class ChartPieModule {}
