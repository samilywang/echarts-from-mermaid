import { parseArray } from './util';

export interface AxisDefinition {
  type: 'value' | 'category';
  key: 'x' | 'y';
  data?: string[];
  min?: number;
  max?: number;
  name?: string;
  numberType?: string;
  currency?: string;
}

const axisKeys = ['x', 'y'] as const;

export function parseAxis(line: string): AxisDefinition | null {
  let key: 'x' | 'y' | undefined;
  for (const axisKey of axisKeys) {
    if (line.startsWith(axisKey + '-axis')) {
      key = axisKey;
      break;
    }
  }

  if (!key) {
    return null;
  }

  const [, title, numberType, currency, ...data] = line.split(' ');
  const arrayResult = parseArray(data.join(' '));
  const result: AxisDefinition = {
    key,
    name: title.replace(/^"|"$/g, ''),
    numberType: numberType.replace(/^"|"$/g, ''),
    currency: currency.replace(/^"|"$/g, ''),
    ...arrayResult,
  };

  return result;
}
