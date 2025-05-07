import type {
  EChartsOption,
  LineSeriesOption,
  BarSeriesOption,
  TitleComponentOption,
} from 'echarts';
import { parseAxis } from '../../base/parseAxis';
import { parseLegend, parseTitle } from '../../base/util';
import { BaseChart } from '../../base/BaseChart';

// mermaid xychart code line type
enum XYChartLineType {
  title = 'title',
  xAxis = 'x-axis',
  yAxis = 'y-axis',
  line = 'line',
  bar = 'bar',
  legend = 'legend',
}

export class XYChart extends BaseChart {
  getOption(): EChartsOption {
    let title: TitleComponentOption | undefined;
    let lineId = 0;
    let xAxis;
    const yAxis = [];
    // let isHorizontal = false;
    const seriesLines: { type: 'line' | 'bar'; str: string }[] = [];
    let legends: string[] = [];

    // parse lines
    for (; lineId < this._lines.length; lineId++) {
      const line = this._lines[lineId].trim();

      // if (line.indexOf('horizontal') > 0) {
      //   isHorizontal = true;
      //   continue;09
      // }

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
        case XYChartLineType.legend:
          legends = parseLegend(line);
          break;
      }
    }

    // // if horizontal, swap xAxis and yAxis
    // if (isHorizontal) {
    //   [xAxis, yAxis] = [yAxis, xAxis];
    // }

    // parse line series
    const series: (LineSeriesOption | BarSeriesOption)[] = [];
    seriesLines.forEach((line, index) => {
      const config: LineSeriesOption | BarSeriesOption = {
        type: line.type,
      };

      // some line series may contain title, like: line "Spend" [1.0, 3.0, 5.0]
      const nameRe = /^(line|bar) "([^"]*)"/.exec(line.str);
      const name = nameRe ? nameRe[2] : undefined;
      if (name) {
        config.name = name;
      } else if (legends[index]) {
        config.name = legends[index];
      }

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
