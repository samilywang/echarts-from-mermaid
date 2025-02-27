import { parseArray } from './util';

export interface AxisDefinition {
  type: 'value' | 'category';
  key: 'x' | 'y';
  categories?: string[];
  min?: number;
  max?: number;
  name?: string;
}

const axisKeys = ['x', 'y'] as const;

export function parseAxis(line: string): AxisDefinition {
  let [axis, ...rest] = line.split(/\s+/);
  const axisType = axisKeys.find((key) => axis.startsWith(key)) ?? 'x';

  let title;
  if (rest.length > 0 && rest[0].startsWith('"')) {
    title = rest[0].replace(/"/g, '');
    rest = rest.slice(1);
  }

  const result = parseArray(rest.join(' '));
  return {
    key: axisType,
    ...result,
    name: title,
  };
}
