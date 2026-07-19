import { supabase } from "../lib/supabase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export type HistoryItem = {
  id: string;
  video_id: string;
  title: string;
  channel: string;
  thumbnail: string;
  summary: string;
  created_at: string;
};

async function getAuthHeaders(): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("You need to be signed in to do that.");
  }

  return { Authorization: `Bearer ${session.access_token}` };
}

// Endpoint changed from /api/history/:userId to /api/history — the
// backend now identifies the user from the session token, so it can
// only ever return the signed-in user's own history.
export async function getHistory(
  limit = 20,
  offset = 0
): Promise<HistoryItem[]> {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${API_URL}/api/history?limit=${limit}&offset=${offset}`,
    { headers }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.history;
}

export async function deleteHistory(id: string) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/history/${id}`, {
    method: "DELETE",
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
