/**
 * Axis line can be:
 * x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
 * y-axis "Revenue (in $)" 4000 --> 11000
 * y-axis 4000 --> 11000
 */

export type ParseArrayResult = {
  type: 'category' | 'value';
  data?: string[];
  min?: number;
  max?: number;
};

export function parseArray(str: string): ParseArrayResult {
  if (str.indexOf('-->') !== -1) {
    const [min, max] = str.split('-->').map((s) => Number(s.trim()));
    return {
      type: 'value',
      min,
      max,
    };
  }

  return {
    type: 'category',
    data: str
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((s) => s.trim())
      .map((s) => s.replace(/^"|"$/g, '')),
  };
}
