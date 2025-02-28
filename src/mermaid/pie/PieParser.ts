import { BaseParser } from '../../base/BaseParser';
import type { ChartDefinition } from '../../types';

export class PieParser extends BaseParser {
  parse(definition: string): ChartDefinition {
    const lines = definition.trim().split('\n');
    const { title } = this.parseFirstLine(lines[0]);

    const data = lines.slice(1).map((line) => {
      const [name, value] = line.split(':').map((s) => s.trim());
      return {
        seriesType: 'pie',
        name: name.replace(/"/g, ''),
        value: Number(value),
      };
    });

    return {
      type: 'pie',
      series: [{ type: 'pie', data }],
      title,
      data,
    };
  }
}
