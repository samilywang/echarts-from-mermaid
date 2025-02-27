import { EChartsFromMermaid } from '../index';

describe('Pie Chart', () => {
  it('should parse basic pie chart correctly', () => {
    const definition = `
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
`;

    const option = EChartsFromMermaid.getOption(definition);

    expect(option).toEqual({
      title: {
        text: 'Pets adopted by volunteers',
      },
      series: [
        {
          type: 'pie',
          data: [
            { name: 'Dogs', value: 386 },
            { name: 'Cats', value: 85 },
            { name: 'Rats', value: 15 },
          ],
        },
      ],
    });
  });

  it('should handle pie chart without title', () => {
    const definition = `
pie
    "Dogs" : 386
    "Cats" : 85
`;

    const option = EChartsFromMermaid.getOption(definition);

    expect(option).toEqual({
      series: [
        {
          type: 'pie',
          data: [
            { name: 'Dogs', value: 386 },
            { name: 'Cats', value: 85 },
          ],
        },
      ],
    });
  });

  it('should handle pie chart without quotes', () => {
    // This is not supported by mermaid, but we should support is
    // so it's more robust
    const definition = `
pie
    Dogs : 386
    Cats : 85
`;

    const option = EChartsFromMermaid.getOption(definition);

    expect(option).toEqual({
      series: [
        {
          type: 'pie',
          data: [
            { name: 'Dogs', value: 386 },
            { name: 'Cats', value: 85 },
          ],
        },
      ],
    });
  });
});
