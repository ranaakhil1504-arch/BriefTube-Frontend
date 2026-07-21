
// Use a dedicated variable for PDF compressor API
const API_BASE_URL = import.meta.env.VITE_PDF_API_URL || import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...options.headers,
  };
  
  if (isFormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export default apiFetch;
