import type { EChartsOption } from 'echarts';
import { BaseChart } from '../../base/BaseChart';

export class PieChart extends BaseChart {
  constructor(definition: string) {
    super(definition);
  }

  getOption(): EChartsOption {
    return {
      ...this.getBaseOption(),
      series: [
        {
          type: 'pie',
          data: this.getData1d(),
        },
      ],
    };
  }
}
