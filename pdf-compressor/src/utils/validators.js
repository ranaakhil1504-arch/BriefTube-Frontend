
export const validateFile = (file, options = {}) => {
  const { maxSize = 50 * 1024 * 1024, allowedTypes = ["application/pdf"], allowedExtensions = [".pdf"] } = options;

  const errors = [];

  if (!file) {
    errors.push("No file selected");
    return { isValid: false, errors };
  }

  if (file.size > maxSize) {
    const sizeInMB = (maxSize / 1024 / 1024).toFixed(1);
    errors.push(`File size exceeds ${sizeInMB}MB limit`);
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not supported`);
  }

  if (allowedExtensions.length > 0) {
    const extension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      errors.push(`File extension ${extension} is not supported`);
    }
  }

  const dangerousPatterns = /[<>:"/\\|?*]/g;
  if (dangerousPatterns.test(file.name)) {
    errors.push("File name contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9.\-_\s]/g, "").trim().replace(/\s+/g, "_");
};