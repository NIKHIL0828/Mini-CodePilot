import React, { useEffect, useRef, useState } from "react";
import { useGenerateCode } from "./hooks/useGenerateCode.js";
import { useHistory } from "./hooks/useHistory.js";
import PromptPanel from "./components/PromptPanel.jsx";
import CodePanel from "./components/CodePanel.jsx";
import HistoryPanel from "./components/HistoryPanel.jsx";
import { AlertCircle } from "lucide-react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("python");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState("light");
  const [toast, setToast] = useState(null);

  const promptRef = useRef(null);

  const {
    code,
    setCode,
    generateCode,
    loading,
    error,
  } = useGenerateCode();

  const {
    filteredHistory,
    addEntry,
    clearHistory,
    filterText,
    setFilterText,
    filterLanguage,
    setFilterLanguage,
  } = useHistory();

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Error handling
  useEffect(() => {
    if (error) {
      setToast({ type: "error", message: error });
      const id = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(id);
    }
  }, [error]);

  const handleGenerate = async () => {
    const res = await generateCode({ prompt, language });
    if (res && res.code) {
      addEntry({
        prompt,
        code: res.code,
        language,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleSelectHistoryItem = (item) => {
    setPrompt(item.prompt);
    setLanguage(item.language);
    setCode(item.code);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleGenerate();
      }
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Prevent slash if focusing an input
        if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
        e.preventDefault();
        promptRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans">
      <div className="h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main Grid Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Column: Prompt (4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-0">
            <PromptPanel
              prompt={prompt}
              setPrompt={setPrompt}
              language={language}
              setLanguage={setLanguage}
              fontSize={fontSize}
              setFontSize={setFontSize}
              onGenerate={handleGenerate}
              loading={loading}
              theme={theme}
              toggleTheme={toggleTheme}
              promptRef={promptRef}
            />
          </div>

          {/* Right Column: Code & History (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
            <div className="flex-1 min-h-0 relative">
              <CodePanel
                code={code}
                language={language}
                fontSize={fontSize}
                loading={loading}
              />
            </div>
            
            <div className="h-48 lg:h-64 shrink-0">
              <HistoryPanel
                filteredHistory={filteredHistory}
                clearHistory={clearHistory}
                filterText={filterText}
                setFilterText={setFilterText}
                filterLanguage={filterLanguage}
                setFilterLanguage={setFilterLanguage}
                onSelectItem={handleSelectHistoryItem}
              />
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}