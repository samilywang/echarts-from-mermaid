import { EChartsFromMermaid } from '../../index';

const chartTypes = [
  'line',
  // 'bar'
];

describe('XYChart', () => {
  for (const chartType of chartTypes) {
    describe(chartType, () => {
      describe('orientation', () => {
        it('should render vertical chart', () => {
          const definition = `
xychart-beta
  ${chartType} [1, 4, 3]
`;
          const option = EChartsFromMermaid.getOption(definition);
          expect(option).toEqual({
            xAxis: {
              type: 'value',
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                type: chartType,
                data: [
                  [1, 1],
                  [2, 4],
                  [3, 3],
                ],
              },
            ],
          });
        });

        //         it('should render horizontal chart', () => {
        //           const definition = `
        // xychart-beta horizontal
        //   ${chartType} [1, 4, 3]
        // `;
        //           const chart = new XYChart(definition);
        //           expect(chart.getOption()).toEqual({
        //             xAxis: {
        //               type: 'value',
        //             },
        //             yAxis: {
        //               type: 'value',
        //             },
        //             series: [
        //               {
        //                 type: chartType,
        //                 data: [
        //                   [1, 1],
        //                   [4, 2],
        //                   [3, 3],
        //                 ],
        //               },
        //             ],
        //           });
        //         });
      });

      const axisTypes = ['x', 'y'];
      for (const axisType of axisTypes) {
        describe(axisType, () => {
          const otherAxis = axisType === 'x' ? 'y' : 'x';
          it(`should render category ${axisType}Axis`, () => {
            const definition = `
xychart-beta
  ${axisType}-axis [cat1, "cat2 with space", cat3]
  ${chartType} [1, 4, 2]
      `;
            const option = EChartsFromMermaid.getOption(definition);
            expect(option).toEqual({
              [axisType + 'Axis']: {
                type: 'category',
                data: ['cat1', 'cat2 with space', 'cat3'],
              },
              [otherAxis + 'Axis']: { type: 'value' },
              series: [
                {
                  type: chartType,
                  data: [1, 4, 2],
                },
              ],
            });
          });

          it(`should render value ${axisType}Axis with two value axes`, () => {
            const definition = `
      xychart-beta
        ${axisType}-axis [10, 20, 30]
        ${chartType} [1, 4, 2]
      `;
            const option = EChartsFromMermaid.getOption(definition);
            expect(option).toEqual({
              [axisType + 'Axis']: { type: 'value' },
              [otherAxis + 'Axis']: { type: 'value' },
              series: [
                {
                  type: chartType,
                  data: [
                    [10, 1],
                    [20, 4],
                    [30, 2],
                  ],
                },
              ],
            });
          });

          it(`should render value ${axisType}Axis with range`, () => {
            const definition = `
      xychart-beta
        ${axisType}-axis 100 --> 200
        ${chartType} [1, 4, 2]
      `;
            const option = EChartsFromMermaid.getOption(definition);
            expect(option).toEqual({
              [axisType + 'Axis']: { type: 'value', min: 100, max: 200 },
              [otherAxis + 'Axis']: { type: 'value' },
              series: [
                {
                  type: chartType,
                  data: [
                    [100, 1],
                    [150, 4],
                    [200, 2],
                  ],
                },
              ],
            });
          });

          it(`should work with ${axisType}Axis title`, () => {
            const definition = `
      xychart-beta
        ${axisType}-axis "Cats" [cat1, "cat2 with space", cat3]
        ${chartType} [1, 4, 2]
      `;
            const option = EChartsFromMermaid.getOption(definition);
            expect(option).toEqual({
              [axisType + 'Axis']: {
                type: 'category',
                name: 'Cats',
                value: ['cat1', 'cat2 with space', 'cat3'],
              },
              [otherAxis + 'Axis']: { type: 'value' },
              series: [
                {
                  type: chartType,
                  data: [1, 4, 2],
                },
              ],
            });
          });
        });
      }
    });
  }
});
