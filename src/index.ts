import { PieParser } from './parsers/pie';
import { PieChart } from './charts/pie';
import type { ChartDefinition } from './parsers/base';

type ChartType = 'pie';

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
    const parsers: Record<ChartType, PieParser> = {
      pie: new PieParser(),
    };
    return parsers[type];
  }

  private static getChart(type: ChartType, chartDef: ChartDefinition) {
    const charts: Record<ChartType, PieChart> = {
      pie: new PieChart(chartDef),
    };
    return charts[type];
  }
}
