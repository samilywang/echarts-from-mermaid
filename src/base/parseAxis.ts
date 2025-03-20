import { parseArray } from './util';

export interface AxisDefinition {
  type: 'value' | 'category';
  key: 'x' | 'y';
  data?: string[];
  min?: number;
  max?: number;
  name?: string;
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

  /**
   * Axis line can contain title and data
   * x-axis [mon, tues, wed, thur, fri, sat, sun]
   * y-axis "Time trained (minutes)" 0 --> 300
   */
  const rest = line.substring((key + '-axis').length).trim();
  const titleRe = /^\s*"([^"]*)"\s+/.exec(rest);
  const title = titleRe ? titleRe[1] : undefined;
  const data = titleRe ? rest.substring(titleRe[0].length) : rest;

  const arrayResult = parseArray(data);
  const result: AxisDefinition = {
    key,
    ...arrayResult,
  };

  if (title) {
    result.name = title;
  }

  return result;
}
