import { BaseChart } from '../../base/BaseChart';
import type {
  EChartsOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';

export class XYChart extends BaseChart {
  getOption(): EChartsOption {
    console.log(this.definition);
    return {};
  }
}
