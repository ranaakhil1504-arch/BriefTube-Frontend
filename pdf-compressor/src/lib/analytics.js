
class Analytics {
  constructor() {
    this.enabled = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
  }

  generateSessionId() {
    return Math.random().toString(36).substring(2, 15);
  }

  getUserId() {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = "user_" + this.generateSessionId();
      localStorage.setItem("userId", userId);
    }
    return userId;
  }

  track(event, data = {}) {
    if (!this.enabled) return;

    const payload = {
      event,
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
    };

    console.debug("📊 Analytics:", payload);
    this.events.push(payload);
  }

  pageView(path) {
    this.track("page_view", { path });
  }

  event(category, action, label = null, value = null) {
    this.track("event", { category, action, label, value });
  }

  fileUpload(fileName, size, type) {
    this.track("file_upload", { fileName, size: this.formatSize(size), type });
  }

  fileDownload(fileName, size, type) {
    this.track("file_download", { fileName, size: this.formatSize(size), type });
  }

  compressionComplete(originalSize, compressedSize, level) {
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    this.track("compression_complete", {
      originalSize: this.formatSize(originalSize),
      compressedSize: this.formatSize(compressedSize),
      reduction: `${reduction}%`,
      level,
    });
  }

  formatSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

export const analytics = new Analytics();
export default analytics;
