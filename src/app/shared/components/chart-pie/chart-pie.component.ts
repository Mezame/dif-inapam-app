import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

import * as echarts from 'echarts/core';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

type ECOption = echarts.ComposeOption<
  PieSeriesOption | TooltipComponentOption | LegendComponentOption
>;

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPieComponent implements OnInit {
  options!: ECOption;

  @Input() data!: { value: number; name: string }[];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const divEl = this.el.nativeElement.firstChild as HTMLDivElement;
    let pieChart: echarts.ECharts;

    this.options = {
      tooltip: {
        show: false,
      },
      legend: {
        bottom: 16,
        left: 'center',
      },
      color: ['#763c4b', '#ac828e'],
      series: [
        {
          type: 'pie',
          radius: ['50%', '100%'],
          avoidLabelOverlap: false,
          top: -40,
          left: 0,
          right: 0,
          itemStyle: {
            borderWidth: 0,
            borderColor: '#fafafa',
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            disabled: true,
            label: {
              show: true,
              fontSize: 13,
            },
          },
          legendHoverLink: false,
          animation: false,
          data: this.data,
        },
      ],
    };

    //echarts.registerTheme('custom-theme', echartsCustomTheme);
    echarts.use([TooltipComponent, LegendComponent, PieChart, SVGRenderer]);

    pieChart = echarts.init(divEl);

    pieChart.setOption(this.options);
  }
}
