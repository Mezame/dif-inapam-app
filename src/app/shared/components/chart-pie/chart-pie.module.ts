import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartPieComponent } from './chart-pie.component';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import echartsCustomTheme from './echarts-custom-theme';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  SVGRenderer,
]);
echarts.registerTheme('custom-theme', echartsCustomTheme);

@NgModule({
  declarations: [ChartPieComponent],
  imports: [CommonModule, NgxEchartsModule.forRoot({ echarts })],
  exports: [ChartPieComponent],
})
export class ChartPieModule {}
