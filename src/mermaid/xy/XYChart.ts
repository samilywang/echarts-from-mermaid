import { BaseChart } from '../../base/BaseChart';
import type { EChartsOption, LineSeriesOption, BarSeriesOption } from 'echarts';

export class XYChart extends BaseChart {
  getOption(): EChartsOption {
    return {
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'value',
      },
      series: [{} as LineSeriesOption | BarSeriesOption],
    };
  }
}
