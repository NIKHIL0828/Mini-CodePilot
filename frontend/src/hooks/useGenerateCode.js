import { useState, useCallback } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function useGenerateCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCode = useCallback(
    async ({ prompt, language }) => {
      try {
        setError(null);

        if (!prompt.trim()) {
          throw new Error("Prompt cannot be empty.");
        }

        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, language })
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || "Failed to generate code.");
        }

        const data = await res.json();
        setCode(data.code || "");
        return data;
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { code, setCode, generateCode, loading, error, setError };
}
