import { supabase } from "../lib/supabase";

export type VideoInfo = {
  title: string;
  channel: string;
  thumbnail: string;
};

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export async function generateSummary(url: string) {
  // The backend now identifies the user from a verified Supabase
  // session token, not from a client-supplied userId. If the user is
  // signed in, we attach their access token so the summary gets saved
  // to their history; if not, it still works as a guest request.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${API_URL}/api/summarize`, {
    method: "POST",
    headers,
    body: JSON.stringify({ url }),
  });


  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate summary");
  }

  return {
    summary: data.summary,
    video: data.video,
  };
}
