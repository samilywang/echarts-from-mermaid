import { PieParser } from './mermaid/pie/PieParser';
import { PieChart } from './mermaid/pie/PieChart';
import type { ChartDefinition, ChartType } from './types';
import { XYChartParser } from './mermaid/xy/XYChartParser';
import { XYChart } from './mermaid/xy/XYChart';

export class EChartsFromMermaid {
  static getOption(definition: string) {
    // 1. Parse mermaid text
    const firstLine = definition.trim().split('\n')[0];
    const type = firstLine.split(/\s+/)[0];
    const parser = this.getParser(type as ChartType);
    const chartDef = parser.parse(definition);

    // 2. Convert to ECharts option
    const chart = this.getChart(type as ChartType, chartDef);
    return chart.getOption();
  }

  private static getParser(type: ChartType) {
    const parsers: Record<ChartType, PieParser | XYChartParser> = {
      pie: new PieParser(),
      xychart: new XYChartParser(),
      'xychart-beta': new XYChartParser(),
    };
    return parsers[type];
  }

  private static getChart(type: ChartType, chartDef: ChartDefinition) {
    const charts: Record<ChartType, PieChart | XYChart> = {
      pie: new PieChart(chartDef),
      xychart: new XYChart(chartDef),
      'xychart-beta': new XYChart(chartDef),
    };
    return charts[type];
  }
}
