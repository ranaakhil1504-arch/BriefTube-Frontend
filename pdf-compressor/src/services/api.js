
// Use a dedicated variable for PDF compressor API
const API_BASE_URL = import.meta.env.VITE_PDF_API_URL || import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Root URL (no /api suffix) — needed to build absolute download links that
// work on any device, since a relative "/pdf/download/xyz" link would
// resolve against the *frontend's* domain, not the backend's.
export const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

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
