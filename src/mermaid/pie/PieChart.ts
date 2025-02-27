import type { EChartsOption } from 'echarts';
import type { ChartDefinition } from '../../types';
import { BaseChart } from '../../base/BaseChart';

export class PieChart extends BaseChart {
  constructor(definition: ChartDefinition) {
    super(definition);
  }

  getOption(): EChartsOption {
    return {
      ...this.getBaseOption(),
      series: [
        {
          type: 'pie',
          data: this.definition.data,
        },
      ],
    };
  }
}
