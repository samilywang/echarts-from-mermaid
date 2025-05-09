import { PieChart } from './mermaid/pie/PieChart';
import type { ChartType } from './types';
import { XYChart } from './mermaid/xy/XYChart';
import { EChartsOption } from 'echarts';

export class EChartsFromMermaid {
  static getOption(definition: string): EChartsOption {
    const firstLine = definition.trim().split('\n')[0];
    const type = firstLine.split(/\s+/)[0];
    const chart = this.getChart(type as ChartType, definition);
    return chart.getOption();
  }

  private static getChart(
    type: ChartType,
    definition: string
  ): PieChart | XYChart {
    const charts: Record<ChartType, PieChart | XYChart> = {
      pie: new PieChart(definition),
      xychart: new XYChart(definition),
      'xychart-beta': new XYChart(definition),
    };
    return charts[type];
  }
}
