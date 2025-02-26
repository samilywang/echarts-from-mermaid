import type { EChartsOption } from 'echarts';
import type { ChartDefinition } from '../parsers/base';

export abstract class BaseChart {
  protected definition: ChartDefinition;

  constructor(definition: ChartDefinition) {
    this.definition = definition;
  }

  /**
   * Get the ECharts option for the chart
   */
  abstract getOption(): EChartsOption;

  protected parseDirective(line: string): { type: string; args: string[] } {
    const match = line.match(/^\s*%%\s*{?\s*(\w+)\s*}?\s*(.*)$/);
    if (!match) return { type: '', args: [] };

    return {
      type: match[1],
      args: match[2].split(/\s+/).filter(Boolean),
    };
  }
}
