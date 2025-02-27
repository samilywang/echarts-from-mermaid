export type ChartType = 'xychart-beta' | 'pie';

export interface ChartDefinition {
  type: string;
  title?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
}
