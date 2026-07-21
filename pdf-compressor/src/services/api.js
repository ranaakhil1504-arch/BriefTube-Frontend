
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

// Also export as default for compatibility
export default apiFetch;
