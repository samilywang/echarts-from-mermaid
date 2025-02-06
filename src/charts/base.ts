import type { EChartsOption } from 'echarts';

export abstract class BaseChart {
  protected definition: string;

  constructor(definition: string) {
    this.definition = definition;
  }

  abstract parse(): any;
  abstract getOption(): EChartsOption;

  protected parseDirective(line: string): { type: string; args: string[] } {
    const match = line.match(/^\s*%%\s*{?\s*(\w+)\s*}?\s*(.*)$/);
    if (!match) return { type: '', args: [] };

    return {
      type: match[1],
      args: match[2].split(/\s+/).filter(Boolean),
    };
  }
}
