import React from "react";
import { Search, Trash2, History as HistoryIcon, ChevronRight } from "lucide-react";

export default function HistoryPanel({
  filteredHistory,
  clearHistory,
  filterText,
  setFilterText,
  filterLanguage,
  setFilterLanguage,
  onSelectItem,
}) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      
      {/* Header & Filter */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search history..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500/50 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
        
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          className="px-2 py-1.5 text-xs rounded-md bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500/50 text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="python">Python</option>
          <option value="javascript">JS</option>
          <option value="cpp">C++</option>
        </select>

        <button
          onClick={clearHistory}
          className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Clear History"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4">
            <HistoryIcon size={24} className="mb-2 opacity-20" />
            <span className="text-xs">No history found</span>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredHistory.map((item) => (
              <li
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.prompt || "Untitled Code"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 uppercase tracking-wide border border-indigo-100 dark:border-indigo-800/50">
                        {item.language}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors mt-1" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}