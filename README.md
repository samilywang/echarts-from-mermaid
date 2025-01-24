# Apache ECharts From Mermaid

> ⚠️⚠️⚠️ **Note:** This project is still under development and should not be used in production.

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

### Mermaid

- Pie (`pie`)
- Bar (`xychart-beta`)
- Line (`xychart-beta`)
- Sankey (`sankey-beta`)

### Extended

Mermaid doesn't support the following types, but we used Mermaid-like syntax to describe these types supported by Apache ECharts.
