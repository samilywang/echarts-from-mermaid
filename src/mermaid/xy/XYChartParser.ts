import { BaseParser } from '../../base/BaseParser';
import type { ChartDefinition } from '../../types';

export class XYChartParser extends BaseParser {
  parse(text: string): ChartDefinition {
    return {
      type: 'xychart-beta',
      data: [],
    };
  }
}
