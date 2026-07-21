import { useState } from "react";

export default function useFilePicker({
  accept,
  maxSize,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  function validate(file) {
    if (!file) return false;

    if (accept && !accept.includes(file.type)) {
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