export const API_BASE = "http://localhost:9000/api";

// 🔹 create interview session
export const createSession = async (jobId) => {
  const res = await fetch(`${API_BASE}/interview-sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      candidateId: "TEMP_CANDIDATE_ID", // replace later
      jobId
    })
  });
  return res.json();
};

// 🔹 push transcript line
export const pushTranscript = async (sessionId, speaker, message) => {
  if (!sessionId) return;
  await fetch(`${API_BASE}/interview-sessions/${sessionId}/transcript`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ speaker, message })
  });
};

// 🔹 mark completed
export const completeSession = async (sessionId) => {
  if (!sessionId) return;
  await fetch(`${API_BASE}/interview-sessions/${sessionId}/complete`, {
    method: "POST"
  });
};
