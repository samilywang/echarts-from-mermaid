import { BaseChart } from './base';
import type { EChartsOption } from 'echarts';
import type { ChartDefinition } from '../parsers/base';

export class PieChart extends BaseChart {
  constructor(definition: ChartDefinition) {
    super(definition);
  }

  getOption(): EChartsOption {
    return {
      title: this.definition.title
        ? { text: this.definition.title }
        : undefined,
      series: [
        {
          type: 'pie',
          data: this.definition.data,
        },
      ],
    };
  }
}
