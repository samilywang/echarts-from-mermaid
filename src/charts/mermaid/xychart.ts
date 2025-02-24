import { BaseChart } from '../base';
import type {
  EChartsOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';

interface XYChartData {
  type: string;
  title?: string;
  orientation?: string;
  xAxis?: {
    min?: number;
    max?: number;
    data?: string[];
  };
  yAxis?: {
    min?: number;
    max?: number;
  };
  series: Array<{
    type: string;
    data: number[];
  }>;
}

export class XYChart extends BaseChart {
  parse(): XYChartData {
    const lines = this.definition.split('\n');
    const result: XYChartData = {
      type: 'xychart-beta',
      series: [],
    };

    let currentSeries: { type: string; data: number[] } | null = null;

    for (const line of lines) {
      if (line.trim().startsWith('---')) continue;

      // 处理指令
      if (line.trim().startsWith('%%')) {
        const { type, args } = this.parseDirective(line);
        switch (type) {
          case 'title':
            result.title = args.join(' ');
            break;
          case 'orientation':
            result.orientation = args[0];
            break;
        }
        continue;
      }

      const dataMatch = line.match(/^\s*(\w+)\s*$/);
      if (dataMatch) {
        currentSeries = {
          type: dataMatch[1],
          data: [],
        };
        result.series.push(currentSeries);
        continue;
      }

      // 处理数据点
      if (currentSeries) {
        const pointMatch = line.match(
          /^\s*(\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\s*$/
        );
        if (pointMatch) {
          const x = Number(pointMatch[1]);
          const y = Number(pointMatch[2]);
          currentSeries.data.push(y);
        }
      }
    }

    return result;
  }

  getOption(): EChartsOption {
    const parsed = this.parse();
    const option: EChartsOption = {};

    if (parsed.title) {
      option.title = { text: parsed.title };
    }

    if (parsed.orientation === 'horizontal') {
      option.xAxis = { type: 'value' } as XAXisComponentOption;
      option.yAxis = {
        type: 'category',
        data:
          parsed.xAxis?.data ||
          this.generateDefaultCategories(parsed.series[0]?.data.length),
      } as YAXisComponentOption;
    } else {
      option.xAxis = {
        type: parsed.xAxis?.min !== undefined ? 'value' : 'category',
        ...parsed.xAxis,
      } as XAXisComponentOption;
      option.yAxis = {
        type: 'value',
        ...parsed.yAxis,
      } as YAXisComponentOption;

      if (!parsed.xAxis?.data && option.xAxis.type === 'category') {
        (option.xAxis as any).data = this.generateDefaultCategories(
          parsed.series[0]?.data.length
        );
      }
    }

    option.series = parsed.series as any;
    return option;
  }

  private generateDefaultCategories(count: number): string[] {
    return Array.from({ length: count }, (_, i) => (i + 1).toString());
  }
}
