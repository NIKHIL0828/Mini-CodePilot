import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Download, Code2, Terminal } from "lucide-react";

const FILE_EXT = {
  python: "py",
  javascript: "js",
  cpp: "cpp",
  java: "java",
  html: "html",
};

export default function CodePanel({ code, language, fontSize, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const handleDownload = () => {
    if (!code) return;
    const ext = FILE_EXT[language] || "txt";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-pilot-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Code2 size={16} className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-semibold capitalize">
            {language || "Code"} Output
          </span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            disabled={!code}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
              copied
                ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            } disabled:opacity-50`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          
          <button
            onClick={handleDownload}
            disabled={!code}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
            title="Download Code"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative bg-slate-950 overflow-hidden group">
        {loading && !code ? (
          <div className="absolute inset-0 p-6 space-y-4">
            <div className="h-4 w-1/3 bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-800 rounded animate-pulse delay-75" />
            <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse delay-150" />
            <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse delay-200" />
          </div>
        ) : code ? (
          <SyntaxHighlighter
            language={language === "cpp" ? "cpp" : language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "24px",
              height: "100%",
              background: "transparent", // Use container bg
              fontSize: `${fontSize}px`,
              lineHeight: "1.5",
            }}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 dark:text-slate-500">
            <div className="p-4 bg-slate-900 rounded-full mb-3">
              <Terminal size={32} />
            </div>
            <p className="text-sm">Ready to generate code.</p>
          </div>
        )}
      </div>
    </div>
  );
}