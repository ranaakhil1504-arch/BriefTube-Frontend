export type ParsedSummary = {
  executiveSummary: string;
  keyPoints: string[];
  keyTakeaways: string[];
  quickSummary: string;
  actionItems: string[];
};

export function parseSummary(markdown: string): ParsedSummary {
  const getSection = (title: string, next: string[]) => {
    const regex = new RegExp(
      `# ${title}\\s+([\\s\\S]*?)(?=${next.map(n => `# ${n}`).join("|")}|$)`,
      "i"
    );

    const match = markdown.match(regex);

    return match ? match[1].trim() : "";
  };

  const executiveSummary = getSection("Executive Summary", [
    "Key Points",
  ]);

  const keyPoints = getSection("Key Points", [
    "Key Takeaways",
  ])
    .split("\n")
    .filter(line => line.startsWith("- "))
    .map(line => line.replace("- ", ""));

  const keyTakeaways = getSection("Key Takeaways", [
    "Quick Summary",
  ])
    .split("\n")
    .filter(line => line.startsWith("- "))
    .map(line => line.replace("- ", ""));

  const quickSummary = getSection("Quick Summary", [
    "Action Items",
  ]);

  const actionItems = getSection("Action Items", [])
    .split("\n")
    .filter(line => line.startsWith("- "))
    .map(line => line.replace("- ", ""));

  return {
    executiveSummary,
    keyPoints,
    keyTakeaways,
    quickSummary,
    actionItems,
  };
}