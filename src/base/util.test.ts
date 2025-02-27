import { parseArray } from './util';

describe('parseArray', () => {
  it('should parse array', () => {
    expect(parseArray('[abc, de, fg, 34]')).toEqual({
      type: 'category',
      categories: ['abc', 'de', 'fg', '34'],
    });
  });

  it('should parse array awalys as string', () => {
    expect(parseArray('[1, 2, 3]')).toEqual({
      type: 'category',
      categories: ['1', '2', '3'],
    });
  });

  it('should parse array with quotes', () => {
    expect(parseArray('["abc", "de", "fg", "34"]')).toEqual({
      type: 'category',
      categories: ['abc', 'de', 'fg', '34'],
    });
  });

  it('should parse array with range', () => {
    expect(parseArray('100 --> 200')).toEqual({
      type: 'value',
      min: 100,
      max: 200,
    });
  });
});
