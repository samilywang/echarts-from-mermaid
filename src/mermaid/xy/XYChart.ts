import type { EChartsOption, LineSeriesOption, BarSeriesOption } from 'echarts';
import { parseAxis } from '../../base/parseAxis';
import { convert2dData } from '../../base/util';
import { BaseChart } from '../../base/BaseChart';

const xySeriesTypes = ['line', 'bar'];

export class XYChart extends BaseChart {
  getOption(): EChartsOption {
    let lineId = 0;
    let xAxis;
    let yAxis;
    let isHorizontal = false;

    for (; lineId < this._lines.length; lineId++) {
      const line = this._lines[lineId];

      if (line.indexOf('horizontal') > 0) {
        isHorizontal = true;
      }

      const axisDef = parseAxis(line);
      if (axisDef) {
        const { key, ...rest } = axisDef;
        if ((key === 'x' && !isHorizontal) || (key === 'y' && isHorizontal)) {
          xAxis = rest;
        } else {
          yAxis = rest;
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

            const valueAxis = isHorizontal ? xAxis : yAxis;
            if (valueAxis && valueAxis.type === 'category') {
              throw new Error('Category axis is not supported for value axis.');
            }

            // Case 1: xAxis: null, yAxis: any
            // -> xAxis: value axis with min(1) and max(data.length),
            // -> yAxis: value axis without/with min and max
            // -> data: [[1, data[0]], ... [data.length, data[data.length - 1]]]
            if (!xAxis) {
              data = convert2dData(1, data.length, data, isHorizontal);
            }
            // Case 2: xAxis: value axis with min and max, yAxis: any
            // -> xAxis: value axis with min and max,
            // -> yAxis: value axis without/with min and max
            // -> data: [[xAxis.min, data[0]], ... [xAxis.max, data[data.length - 1]]]
            else if (xAxis && xAxis.max != null && xAxis.min != null) {
              data = convert2dData(xAxis.min, xAxis.max, data, isHorizontal);
            }
            // Case 3: xAxis: category, yAxis: null
            // -> xAxis: category axis
            // -> yAxis: value axis
            // -> data: data (not changed)

            series.push({
              type: type as 'line' | 'bar',
              data,
            });
          } catch (e) {
            console.error(`Error parsing data for ${type}: ${dataStr}`, e);
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
