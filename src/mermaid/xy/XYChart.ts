import type {
  EChartsOption,
  LineSeriesOption,
  BarSeriesOption,
  TitleComponentOption,
} from 'echarts';
import { parseAxis } from '../../base/parseAxis';
import { parseTitle } from '../../base/util';
import { BaseChart } from '../../base/BaseChart';

// mermaid xychart code line type
enum XYChartLineType {
  title = 'title',
  xAxis = 'x-axis',
  yAxis = 'y-axis',
  line = 'line',
  bar = 'bar',
}

export class XYChart extends BaseChart {
  getOption(): EChartsOption {
    let title: TitleComponentOption | undefined;
    let lineId = 0;
    let xAxis;
    let lastYAxisIndex = -1;
    const yAxis = [];

    // parse series
    type SeriesOtherParams = { numberType?: string; currency?: string };
    const series: (LineSeriesOption | BarSeriesOption) & SeriesOtherParams[] =
      [];
    const parseSeries = (line: {
      type: 'bar' | 'line';
      str: string;
      lastYAxisIndex: number;
    }) => {
      const config: (LineSeriesOption | BarSeriesOption) & SeriesOtherParams = {
        type: line.type,
      };

      const regex = /"([^"]*)"/g;
      let match;
      const matchResult: string[] = [];
      while ((match = regex.exec(line.str)) !== null) {
        matchResult.push(match[1]);
      }
      const [name, yIndex, numberType, currency] = matchResult;

      config.name = name;
      config.yAxisIndex = yIndex
        ? Number(yIndex.replace('y: ', ''))
        : undefined;
      if (config.yAxisIndex === undefined && lastYAxisIndex >= 0) {
        config.yAxisIndex = lastYAxisIndex;
      }
      config.numberType = numberType;
      config.currency = currency;

      // parse array
      const dataRe = /(?<!")[^"[\]]*\[([^"]*)\][^"[\]]*(?!")/.exec(line.str);
      const data = dataRe ? JSON.parse(dataRe[0].replace(/None/g, 'null')) : [];
      config.data = data;

      series.push(config);
    };

    // parse lines
    for (; lineId < this._lines.length; lineId++) {
      const line = this._lines[lineId].trim();

      const lineType = line.split(' ')[0];
      switch (lineType) {
        case XYChartLineType.title:
          title = {
            show: false,
            text: parseTitle(line),
          };
          lastYAxisIndex = -1;
          break;
        case XYChartLineType.xAxis:
          xAxis = parseAxis(line);
          lastYAxisIndex = -1;
          break;
        case XYChartLineType.yAxis:
          yAxis.push(parseAxis(line));
          lastYAxisIndex = yAxis.length - 1;
          break;
        case XYChartLineType.bar:
          parseSeries({ type: 'bar', str: line, lastYAxisIndex });
          lastYAxisIndex = -1;
          break;
        case XYChartLineType.line:
          parseSeries({ type: 'line', str: line, lastYAxisIndex });
          lastYAxisIndex = -1;
          break;
      }
    }

    return {
      title,
      xAxis: xAxis || { type: 'value' },
      yAxis:
        yAxis.length > 0
          ? yAxis.map((i) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { key, ...other } = i!;
              return other;
            })
          : { type: 'value' },
      series,
    };
  }
}
