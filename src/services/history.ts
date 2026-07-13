const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export async function getHistory(userId: string) {
  const response = await fetch(
    `${API_URL}/api/history/${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.history;
}