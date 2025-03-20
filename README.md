# Apache ECharts From Mermaid

A plugin that enables Apache ECharts to render charts using Mermaid-like syntax.

This plugin is particularly useful when you want to generate charts from text/markdown, especially in LLM applications. Instead of having LLMs generate complex ECharts options directly, you can use this plugin to convert simpler Mermaid-like syntax into ECharts options. This approach is more reliable since Mermaid syntax is much simpler than ECharts' option structure.

To customize the chart's appearance, you can use `echarts.registerTheme` to apply your preferred theme.

## Usage

```javascript
import { EChartsFromMermaid } from 'echarts-from-mermaid';
import * as echarts from 'echarts';

const mermaidDefinition = `
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
`;

const option = EChartsFromMermaid.getOption(mermaidDefinition);
/** which generates the following option:
 * {
 *   title: {
 *     text: 'Pets adopted by volunteers'
 *   },
 *   series: [
 *     {
 *       type: 'pie',
 *       data: [
 *         { value: 386, name: 'Dogs' },
 *         { value: 85, name: 'Cats' },
 *         { value: 15, name: 'Rats' }
 *       ]
 *     }
 *   ]
 * }
 */

// This option can be used directly with ECharts.
const chart = echarts.init(document.getElementById('main'));
chart.setOption(option);
```

## Supported Charts

Note that the supported charts are neither a subset nor a superset of the charts supported by Mermaid. This plugin is designed to generate ECharts Options in a syntax that is inspired by Mermaid.

- Pie (`pie`)
- Bar (`xychart-beta`, or simplified as `xychart`)
- Line (`xychart-beta`, or simplified as `xychart`)

More chart types will be supported in the future.
