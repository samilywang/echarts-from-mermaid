import type { EChartsOption } from 'echarts';

export abstract class BaseChart {
  protected _definition: string;
  protected _lines: string[];

  constructor(definition: string) {
    this._definition = definition.trim();
    this._lines = this._definition.split('\n').map((line) => line.trim());
  }

  /**
   * Get the ECharts option for the chart
   */
  abstract getOption(): EChartsOption;

  protected getBaseOption(): EChartsOption {
    const headLine = this._lines[0];
    // Extract title by taking everything after the word "title"
    let title = headLine.includes('title')
      ? headLine.substring(headLine.indexOf('title') + 5).trim()
      : headLine.split(/\s+/).slice(1).join(' ');

    // If there are also "title" in the following lines,
    // use the last one
    for (let i = 1; i < this._lines.length; i++) {
      const line = this._lines[i].trim();
      if (line.startsWith('title')) {
        title = line.substring(line.indexOf('title') + 5).trim();
      }
    }

    return {
      title: title ? { text: title } : undefined,
    };
  }

  protected getData1d(): { name: string; value: number }[] {
    const data: { name: string; value: number }[] = [];
    for (let i = 1; i < this._lines.length; i++) {
      // It should be like: "apples" : 100
      // The quotes are not optional
      const line = this._lines[i];
      if (line.startsWith('"')) {
        const splits = line.split(':');
        if (splits.length > 1) {
          // Remove the quotes and handle escaped quotes properly
          const name = splits[0].trim().replace(/^"/, '').replace(/"$/, '');
          const value = splits[1].trim();
          data.push({ name, value: Number(value) });
        }
      }
    }
    return data;
  }
}
