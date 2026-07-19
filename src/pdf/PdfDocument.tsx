import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import type { VideoInfo } from "../services/api";
import type { ParsedSummary } from "../utils/parseSummary";

type Props = {
  video: VideoInfo;
  parsed: ParsedSummary;
};

const COLORS = {
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  primaryLight: "#eff6ff",
  border: "#dbeafe",
  ink: "#1e293b",
  slate: "#475569",
  muted: "#94a3b8",
  success: "#059669",
  successLight: "#ecfdf5",
  successBorder: "#a7f3d0",
  amber: "#d97706",
  amberLight: "#fffbeb",
  amberBorder: "#fde68a",
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: "#ffffff",
    fontSize: 11,
    fontFamily: "Helvetica",
    color: COLORS.ink,
  },

  // ---------- Header band ----------
  headerBand: {
    backgroundColor: COLORS.primary,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoBadgeText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    color: "#dbeafe",
    marginTop: 2,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerRightLabel: {
    color: "#bfdbfe",
    fontSize: 8,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  headerRightValue: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },

  // ---------- Body ----------
  body: {
    paddingHorizontal: 35,
    paddingTop: 16,
    paddingBottom: 20,
  },

  thumbnailWrap: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
  },
  thumbnail: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },

  titleBlock: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.ink,
    lineHeight: 1.25,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  channelDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  channel: {
    color: COLORS.slate,
    fontSize: 10,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 14,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionAccent: {
    width: 4,
    height: 14,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginRight: 7,
  },
  sectionTitle: {
    fontSize: 12,
    color: COLORS.ink,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  paragraph: {
    lineHeight: 1.5,
    color: COLORS.slate,
    fontSize: 10.5,
  },

  // Key points: numbered badge cards
  pointCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    backgroundColor: COLORS.primaryLight,
  },
  pointBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 1,
  },
  pointBadgeText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },
  pointText: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  // Takeaways: check style cards
  takeawayCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.successBorder,
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    backgroundColor: COLORS.successLight,
  },
  checkBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 1,
  },
  checkBadgeText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },
  takeawayText: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  // Action items: amber checkbox style
  actionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    backgroundColor: COLORS.amberLight,
  },
  actionBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.amber,
    marginRight: 8,
    marginTop: 2,
  },
  actionText: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  // Quick summary callout
  quickSummaryCard: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 4,
  },

  // ---------- Footer ----------
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 8.5,
  },
  footerBrand: {
    color: COLORS.primary,
    fontSize: 8.5,
    fontWeight: "bold",
  },
});

export default function PdfDocument({ video, parsed }: Props) {
  const generatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header band */}
        <View style={styles.headerBand}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>BT</Text>
            </View>
            <View>
              <Text style={styles.logo}>BriefTube</Text>
              <Text style={styles.subtitle}>AI SUMMARY REPORT</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightLabel}>GENERATED</Text>
            <Text style={styles.headerRightValue}>{generatedDate}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Thumbnail */}
          <View style={styles.thumbnailWrap}>
            <Image src={video.thumbnail} style={styles.thumbnail} />
          </View>

          {/* Title block */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{video.title}</Text>
            <View style={styles.channelRow}>
              <View style={styles.channelDot} />
              <Text style={styles.channel}>{video.channel}</Text>
            </View>
          </View>

          {/* Executive Summary */}
          {parsed.executiveSummary ? (
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionAccent} />
                <Text style={styles.sectionTitle}>Executive Summary</Text>
              </View>
              <Text style={styles.paragraph}>{parsed.executiveSummary}</Text>
            </View>
          ) : null}

          {/* Key Points */}
          {parsed.keyPoints.length > 0 ? (
            <View style={styles.section} minPresenceAhead={40}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionAccent} />
                <Text style={styles.sectionTitle}>Key Points</Text>
              </View>
              {parsed.keyPoints.map((point, index) => (
                <View key={index} style={styles.pointCard} wrap={false}>
                  <View style={styles.pointBadge}>
                    <Text style={styles.pointBadgeText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Key Takeaways */}
          {parsed.keyTakeaways.length > 0 ? (
            <View style={styles.section} minPresenceAhead={40}>
              <View style={styles.sectionHeaderRow}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: COLORS.success }]}
                />
                <Text style={styles.sectionTitle}>Key Takeaways</Text>
              </View>
              {parsed.keyTakeaways.map((item, index) => (
                <View key={index} style={styles.takeawayCard} wrap={false}>
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkBadgeText}>✓</Text>
                  </View>
                  <Text style={styles.takeawayText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Quick Summary */}
          {parsed.quickSummary ? (
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionAccent} />
                <Text style={styles.sectionTitle}>Quick Summary</Text>
              </View>
              <View style={styles.quickSummaryCard}>
                <Text style={styles.paragraph}>{parsed.quickSummary}</Text>
              </View>
            </View>
          ) : null}

          {/* Action Items */}
          {parsed.actionItems.length > 0 ? (
            <View style={styles.section} minPresenceAhead={40}>
              <View style={styles.sectionHeaderRow}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: COLORS.amber }]}
                />
                <Text style={styles.sectionTitle}>Action Items</Text>
              </View>
              {parsed.actionItems.map((item, index) => (
                <View key={index} style={styles.actionCard} wrap={false}>
                  <View style={styles.actionBox} />
                  <Text style={styles.actionText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Footer — flows naturally after the last section, appears once */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Generated by BriefTube AI</Text>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}