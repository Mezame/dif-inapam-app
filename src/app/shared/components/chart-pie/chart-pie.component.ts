import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPieComponent implements OnInit {
  @Input() data!: { value: number; name: string }[];

  options!: any;

  ngOnInit(): void {
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
            borderWidth: 1,
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
  }
}
