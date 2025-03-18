import { AxisDefinition, parseAxis } from '../../base/parseAxis';
import { BaseChart } from '../../base/BaseChart';
import type { EChartsOption, LineSeriesOption, BarSeriesOption } from 'echarts';

const xySeriesTypes = ['line', 'bar'];
const axisTypes = ['x-axis', 'y-axis'];

export class XYChart extends BaseChart {
  getOption(): EChartsOption {
    let lineId = 0;
    let xAxis;
    let yAxis;
    let isHorizontal = false;

    for (; lineId < this._lines.length; lineId++) {
      const line = this._lines[lineId];
      console.log('line', line);

      if (line.indexOf('horizontal') > 0) {
        isHorizontal = true;
      }

      const axisDef = parseAxis(line);
      console.log('-----', isHorizontal, axisDef);
      if (axisDef) {
        const { key, ...rest } = axisDef;
        if ((key === 'x' && !isHorizontal) || (key === 'y' && isHorizontal)) {
          xAxis = rest;
          console.log('========= xAxis', xAxis);
        } else {
          yAxis = rest;
          console.log('========= yAxis', yAxis);
        }
      } else if (lineId > 0) {
        break;
      }
    }

    const series: (LineSeriesOption | BarSeriesOption)[] = [];
    for (let i = lineId; i < this._lines.length; i++) {
      const line = this._lines[i].trim();
      // Line should be like: "line" [1, 2, 3]
      for (const type of xySeriesTypes) {
        if (line.startsWith(type)) {
          const dataStr = line.substring(type.length).trim();
          try {
            let data = JSON.parse(dataStr);

            // If xAxis and yAxis are not defined, convert data into:
            // [[1, data[0]], [2, data[1]], [3, data[2]]], ...
            if (!xAxis && !yAxis) {
              data = data.map((d: number, i: number) =>
                isHorizontal ? [d, i + 1] : [i + 1, d]
              );
            }
            console.log('data', data);

            // TODO: double value axes

            series.push({
              type: type as 'line' | 'bar',
              data,
            });
          } catch (e) {
            console.error(`Error parsing data for ${type}: ${dataStr}`);
          }
        }
      }
    }

    return {
      xAxis: xAxis || { type: 'value' },
      yAxis: yAxis || { type: 'value' },
      series,
    };
  }
}
