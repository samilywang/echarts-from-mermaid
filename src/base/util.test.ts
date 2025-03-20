import { convert2dData, parseArray } from './util';

describe('parseArray', () => {
  it('should parse array', () => {
    expect(parseArray('[abc, de, fg, 34]')).toEqual({
      type: 'category',
      data: ['abc', 'de', 'fg', '34'],
    });
  });

  it('should parse array awalys as string', () => {
    expect(parseArray('[1, 2, 3]')).toEqual({
      type: 'category',
      data: ['1', '2', '3'],
    });
  });

  it('should parse array with quotes', () => {
    expect(parseArray('["abc", "de", "fg", "34"]')).toEqual({
      type: 'category',
      data: ['abc', 'de', 'fg', '34'],
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

describe('convert2dData', () => {
  it('should convert 1d data into 2d data, horizontal false', () => {
    expect(convert2dData(100, 300, [2, 4, 6], false)).toEqual([
      [100, 2],
      [200, 4],
      [300, 6],
    ]);
  });

  it('should convert 1d data into 2d data, horizontal true', () => {
    expect(convert2dData(100, 300, [2, 4, 6], true)).toEqual([
      [2, 100],
      [4, 200],
      [6, 300],
    ]);
  });

  it('should convert 1d data into 2d data, horizontal false, single data', () => {
    expect(convert2dData(100, 300, [2], false)).toEqual([[100, 2]]);
  });

  it('should convert 1d data into 2d data, horizontal true, single data', () => {
    expect(convert2dData(100, 300, [2], true)).toEqual([[2, 100]]);
  });
});
