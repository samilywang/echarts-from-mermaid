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
    const yAxis = [];
    const seriesLines: { type: 'line' | 'bar'; str: string }[] = [];

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
          break;
        case XYChartLineType.xAxis:
          xAxis = parseAxis(line);
          break;
        case XYChartLineType.yAxis:
          yAxis.push(parseAxis(line));
          break;
        case XYChartLineType.bar:
          seriesLines.push({ type: 'bar', str: line });
          break;
        case XYChartLineType.line:
          seriesLines.push({ type: 'line', str: line });
          break;
      }
    }

    // parse line series
    type SeriesOtherParams = { numberType?: string; currency?: string };
    const series: (LineSeriesOption | BarSeriesOption) & SeriesOtherParams[] =
      [];
    seriesLines.forEach((line) => {
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
      config.yAxisIndex = Number(yIndex.replace('y: ', ''));
      config.numberType = numberType;
      config.currency = currency;

      // parse array
      const dataRe = /\[.*?\]/.exec(line.str);
      const data = dataRe ? JSON.parse(dataRe[0].replace(/None/g, 'null')) : [];
      config.data = data;

      series.push(config);
    });

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
