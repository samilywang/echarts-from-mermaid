import { parseAxis } from './parseAxis';

describe('parseAxis', () => {
  it('should parse category axis', () => {
    const axis = parseAxis('x-axis [cat1, cat2, cat3]');
    expect(axis).toEqual({
      key: 'x',
      type: 'category',
      data: ['cat1', 'cat2', 'cat3'],
    });
  });

  it('should parse category axis with quotes', () => {
    const axis = parseAxis('x-axis ["cat1", cat2, "cat3"]');
    expect(axis).toEqual({
      key: 'x',
      type: 'category',
      data: ['cat1', 'cat2', 'cat3'],
    });
  });

  it('should parse value axis', () => {
    const axis = parseAxis('y-axis 100 --> 200');
    expect(axis).toEqual({
      key: 'y',
      type: 'value',
      min: 100,
      max: 200,
    });
  });

  it('should parse category axis with name', () => {
    const axis = parseAxis('x-axis "Title" [cat1, cat2, cat3]');
    expect(axis).toEqual({
      key: 'x',
      type: 'category',
      name: 'Title',
      data: ['cat1', 'cat2', 'cat3'],
    });
  });

  it('should parse value axis with name', () => {
    const axis = parseAxis('y-axis "Revenue" 100 --> 200');
    expect(axis).toEqual({
      key: 'y',
      type: 'value',
      name: 'Revenue',
      min: 100,
      max: 200,
    });
  });
});
