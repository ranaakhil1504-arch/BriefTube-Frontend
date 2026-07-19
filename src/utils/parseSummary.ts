export type ParsedSummary = {
  executiveSummary: string;
  keyPoints: string[];
  keyTakeaways: string[];
  quickSummary: string;
  actionItems: string[];
};

export function parseSummary(markdown: string): ParsedSummary {
  const clean = markdown.replace(/\r/g, "").replace(/\*\*/g, "");

  const lines = clean.split("\n");

  const result: ParsedSummary = {
    executiveSummary: "",
    keyPoints: [],
    keyTakeaways: [],
    quickSummary: "",
    actionItems: [],
  };

  let section = "";

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) continue;

    if (/^#\s*Executive Summary/i.test(line)) {
      section = "executive";
      continue;
    }

    if (/^#\s*Key Points/i.test(line)) {
      section = "points";
      continue;
    }

    if (/^#\s*Key Takeaways/i.test(line)) {
      section = "takeaways";
      continue;
    }

    if (/^#\s*Quick Summary/i.test(line)) {
      section = "quick";
      continue;
    }

    if (/^#\s*Action Items/i.test(line)) {
      section = "actions";
      continue;
    }

    switch (section) {
      case "executive":
        result.executiveSummary +=
          (result.executiveSummary ? " " : "") +
          line;
        break;

      case "points":
        result.keyPoints.push(line.replace(/^[-*•]\s*/, ""));
        break;

      case "takeaways":
        result.keyTakeaways.push(line.replace(/^[-*•]\s*/, ""));
        break;

      case "quick":
        result.quickSummary +=
          (result.quickSummary ? " " : "") +
          line;
        break;

      case "actions":
        result.actionItems.push(line.replace(/^[-*•]\s*/, ""));
        break;
    }
  }

  return result;
}