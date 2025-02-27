// import { XYChart } from '../mermaid/xychart';

// describe('Config', () => {
//   it('should work with width and height', () => {
//     const definition = `
// ---
// config:
//     xyChart:
//         width: 900
//         height: 600
//     themeVariables:
//         xyChart:
//             titleColor: "#ff0000"
// ---
// xychart-beta
//   bar [1, 4, 2]
// `;
//     const chart = new XYChart(definition);
//     expect(chart.getOption()).toEqual({
//       grid: {
//         width: 900,
//         height: 600,
//       },
//       title: {
//         text: 'This is a simple example',
//         textStyle: {
//           color: '#ff0000',
//         },
//       },
//       xAxis: {
//         type: 'value',
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [
//         {
//           type: 'bar',
//           data: [
//             [1, 1],
//             [2, 4],
//             [3, 2],
//           ],
//         },
//       ],
//     });
//   });

//   it('should work with axis configurations', () => {
//     const definition = `
// ---
// config:
//     xyChart:
//         xAxis:
//             labelFontSize: 16
//             labelPadding: 8
//             showTitle: false
//             tickLength: 8
//             showAxisLine: false
//         yAxis:
//             showLabel: false
//             titleFontSize: 18
//             showTick: false
//             axisLineWidth: 3
// ---
// xychart-beta
//   bar [1, 4, 2]
// `;
//     const chart = new XYChart(definition);
//     expect(chart.getOption()).toEqual({
//       xAxis: {
//         type: 'value',
//         show: true,
//         axisLabel: {
//           show: true,
//           fontSize: 16,
//           margin: 8,
//         },
//         axisTick: {
//           show: true,
//           length: 8,
//         },
//         axisLine: {
//           show: false,
//         },
//         name: '', // due to showTitle: false
//         nameShow: false,
//       },
//       yAxis: {
//         type: 'value',
//         show: true,
//         axisLabel: {
//           show: false,
//         },
//         name: '',
//         nameTextStyle: {
//           fontSize: 18,
//         },
//         axisTick: {
//           show: false,
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 3,
//           },
//         },
//       },
//       series: [
//         {
//           type: 'bar',
//           data: [
//             [1, 1],
//             [2, 4],
//             [3, 2],
//           ],
//         },
//       ],
//     });
//   });

//   it('should work with theme variables', () => {
//     const definition = `
// ---
// config:
//     themeVariables:
//         xyChart:
//             backgroundColor: "#f0f0f0"
//             xAxisLabelColor: "#333"
//             yAxisLineColor: "#666"
//             plotColorPalette: "#f3456,#43445"
// ---
// xychart-beta
//   bar [1, 4, 2]
// `;
//     const chart = new XYChart(definition);
//     expect(chart.getOption()).toEqual({
//       backgroundColor: '#f0f0f0',
//       xAxis: {
//         type: 'value',
//         axisLabel: {
//           show: true,
//           textStyle: {
//             color: '#333',
//           },
//         },
//       },
//       yAxis: {
//         type: 'value',
//         axisLine: {
//           show: true,
//           lineStyle: {
//             color: '#666',
//           },
//         },
//       },
//       color: ['#f3456', '#43445'],
//       series: [
//         {
//           type: 'bar',
//           data: [
//             [1, 1],
//             [2, 4],
//             [3, 2],
//           ],
//         },
//       ],
//     });
//   });
// });
