import React from "react";
import { 
  Bot, 
  Moon, 
  Sun, 
  Command, 
  Play, 
  Loader2, 
  Type, 
  Languages 
} from "lucide-react";

const LANG_OPTIONS = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
  
];

export default function PromptPanel({
  prompt,
  setPrompt,
  language,
  setLanguage,
  fontSize,
  setFontSize,
  onGenerate,
  loading,
  theme,
  toggleTheme,
  promptRef
}) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-sm">
            <Bot size={20} />
          </div>
          <h1 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Mini CodePilot
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-5 overflow-y-auto">
        {/* Instructions */}
        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <Command size={14} />
          <span>
            <kbd className="font-sans font-semibold text-slate-700 dark:text-slate-300">Ctrl</kbd> + <kbd className="font-sans font-semibold text-slate-700 dark:text-slate-300">Enter</kbd> to generate
          </span>
        </div>

        {/* Input Area */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Prompt
          </label>
          <textarea
            ref={promptRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the code you need... 
            eg: 'A Python function to reverse a string'"
            className="flex-1 w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none resize-none text-sm leading-relaxed transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Languages size={12} /> Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
              >
                {LANG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Type size={12} /> Font Size
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-3"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Play size={18} className="fill-current" />
          )}
          {loading ? "Generating..." : "Generate Code"}
        </button>
      </div>
    </div>
  );
}