export class BaseParser {
  protected parseFirstLine(line: string): { type: string; title?: string } {
    // Parse chart type and title from first line
    // e.g. "pie title My Chart" -> { type: "pie", title: "My Chart" }
    const parts = line.trim().split(/\s+/);
    return {
      type: parts[0],
      title: parts.includes('title') ? parts.slice(2).join(' ') : undefined,
    };
  }
}
