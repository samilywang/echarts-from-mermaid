import type {
  SeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';

export type ChartType = 'pie' | 'xychart' | 'xychart-beta';

export interface ChartDefinition {
  type: string;
  title?: string;
  data: any[];
  series: SeriesOption[];
  xAxis?: XAXisComponentOption;
  yAxis?: YAXisComponentOption;
}
