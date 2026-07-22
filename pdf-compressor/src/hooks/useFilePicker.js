import { useState } from "react";

export default function useFilePicker({
  accept,
  maxSize,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  function validate(file) {
    if (!file) return false;

    // Mobile file pickers (Google Drive, WhatsApp, Android "Files", some
    // iOS share sheets) frequently return an empty string or a generic
    // type like "application/octet-stream" for file.type instead of the
    // real MIME type — even though the file itself is a perfectly valid
    // PDF. Relying on file.type alone caused valid uploads to be rejected
    // on mobile while the exact same file worked on desktop. We now also
    // accept the file if its name ends in .pdf.
    const hasValidType = accept && accept.includes(file.type);
    const hasValidExtension = file.name?.toLowerCase().endsWith(".pdf");

    if (accept && !hasValidType && !hasValidExtension) {
      setError("Unsupported file type.");
      return false;
    }

    if (maxSize && file.size > maxSize) {
      setError("File is too large.");
      return false;
    }

    setError("");
    return true;
  }

  function selectFile(file) {
    if (!validate(file)) return;

    setSelectedFile(file);
  }

  function clearFile() {
    setSelectedFile(null);
    setError("");
  }

  return {
    selectedFile,
    error,
    selectFile,
    clearFile,
  };
}