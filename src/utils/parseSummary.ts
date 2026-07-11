export type ParsedSummary = {
  executiveSummary: string;
  keyPoints: string[];
  keyTakeaways: string[];
  quickSummary: string;
  actionItems: string[];
};

export function parseSummary(markdown: string): ParsedSummary {
  function getSection(possibleTitles: string[], nextTitles: string[]) {
    const titleRegex = possibleTitles
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");

    const nextRegex =
      nextTitles.length > 0
        ? nextTitles
            .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
            .join("|")
        : "$";

    const regex = new RegExp(
      `#\\s*(?:${titleRegex})\\s*([\\s\\S]*?)(?=#\\s*(?:${nextRegex})|$)`,
      "i"
    );

    const match = markdown.match(regex);

    return match ? match[1].trim() : "";
  }

  function parseBullets(text: string) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.startsWith("- ") ||
          line.startsWith("* ") ||
          line.startsWith("• ")
      )
      .map((line) => line.replace(/^[-*•]\s*/, ""));
  }

  const executiveSummary = getSection(
    ["Executive Summary", "📌 Overview", "Overview"],
    ["Key Points", "🎯 Key Points"]
  );

  const keyPoints = parseBullets(
    getSection(
      ["Key Points", "🎯 Key Points"],
      ["Key Takeaways", "💡 Key Takeaways"]
    )
  );

  const keyTakeaways = parseBullets(
    getSection(
      ["Key Takeaways", "💡 Key Takeaways"],
      ["Quick Summary", "⚡ 30-Second Summary", "Action Items"]
    )
  );

  const quickSummary = getSection(
    ["Quick Summary", "⚡ 30-Second Summary"],
    ["Action Items"]
  );

  const actionItems = parseBullets(
    getSection(["Action Items"], [])
  );

  return {
    executiveSummary,
    keyPoints,
    keyTakeaways,
    quickSummary,
    actionItems,
  };
}