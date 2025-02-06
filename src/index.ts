import { BaseChart } from './charts/base';
import { XYChart } from './charts/mermaid/xychart';
import type { EChartsOption } from 'echarts';

export class EChartsMermaid {
  /**
   * Converts a Mermaid diagram definition to an ECharts option
   * @param {string} mermaidDefinition The Mermaid diagram definition string
   * @returns {EChartsOption} ECharts option object
   */
  static getOption(mermaidDefinition: string): EChartsOption {
    const chartType = this.detectChartType(mermaidDefinition);
    const chart = this.createChart(chartType, mermaidDefinition);
    return chart.getOption();
  }

  private static detectChartType(definition: string): string {
    if (definition.includes('xychart-beta')) {
      return 'xychart-beta';
    }
    throw new Error('Unsupported chart type');
  }

  private static createChart(type: string, definition: string): BaseChart {
    switch (type) {
      case 'xychart-beta':
        return new XYChart(definition);
      default:
        throw new Error('Unsupported chart type');
    }
  }
}

export default EChartsMermaid;
