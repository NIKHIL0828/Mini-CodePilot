import { useEffect, useState } from "react";

const STORAGE_KEY = "mini-code-copilot-history";

export function useHistory() {
  const [history, setHistory] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load history:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  }, [history]);

  const addEntry = (entry) => {
    setHistory((prev) => [
      {
        id: Date.now(),
        ...entry
      },
      ...prev
    ]);
  };

  const clearHistory = () => setHistory([]);

  const filteredHistory = history.filter((item) => {
    const matchLang =
      filterLanguage === "all" || item.language === filterLanguage;
    const text = (item.prompt + " " + item.code).toLowerCase();
    const matchText = text.includes(filterText.toLowerCase());
    return matchLang && matchText;
  });

  return {
    history,
    filteredHistory,
    addEntry,
    clearHistory,
    filterText,
    setFilterText,
    filterLanguage,
    setFilterLanguage
  };
}
