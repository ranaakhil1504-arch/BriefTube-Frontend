export type ParsedSummary = {
  executiveSummary: string;
  keyPoints: string[];
  keyTakeaways: string[];
  quickSummary: string;
  actionItems: string[];
};

export function parseSummary(markdown: string): ParsedSummary {

  function normalize(text: string) {
    return text
      .replace(/\r/g, "")
      .replace(/\*\*/g, "")
      .replace(/###/g, "#")
      .replace(/##/g, "#");
  }

  const content = normalize(markdown);

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
      `(?:#\\s*|)(?:${titleRegex})\\s*:?[\\n\\r]*([\\s\\S]*?)(?=(?:#\\s*|)(?:${nextRegex})\\s*:|$)`,
      "i"
    );

    const match = content.match(regex);

    return match ? match[1].trim() : "";
  }

  function parseBullets(text: string) {

    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) =>
        line
          .replace(/^[-*•]\s*/, "")
          .replace(/^\d+\.\s*/, "")
      );
  }

  return {
    executiveSummary: getSection(
      ["Executive Summary", "Overview"],
      ["Key Points"]
    ),

    keyPoints: parseBullets(
      getSection(
        ["Key Points"],
        ["Key Takeaways"]
      )
    ),

    keyTakeaways: parseBullets(
      getSection(
        ["Key Takeaways"],
        ["Quick Summary", "Action Items"]
      )
    ),

    quickSummary: getSection(
      ["Quick Summary"],
      ["Action Items"]
    ),

    actionItems: parseBullets(
      getSection(
        ["Action Items"],
        []
      )
    ),
  };
}