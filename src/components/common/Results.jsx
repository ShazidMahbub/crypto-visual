import React from 'react';

// --- Main Text Result Display ---
export const ResultBox = ({ result, label = "Computed Output" }) => (
  <div className="mt-8 animate-fade-in">
    <div className="flex items-center justify-between mb-2 ml-1">
      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</h4>
      <span className="text-[10px] text-slate-600 font-mono">{result.length} chars</span>
    </div>
    <div className="bg-black/40 p-6 rounded-xl border border-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)] relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <p className="text-xl font-mono text-emerald-300 break-words leading-relaxed tracking-wide selection:bg-emerald-900 selection:text-white">
        {result}
      </p>
    </div>
  </div>
);

// --- Matrix Visualization (For Hill Cipher & Cracker) ---
export const MatrixDisplay = ({ matrix, label, highlight }) => (
  <div className={`flex flex-col items-center gap-4 p-4 rounded-xl transition-all duration-500 ${highlight ? 'bg-white/5 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 scale-105' : 'hover:bg-white/5 hover:scale-105'}`}>
    {label && <span className={`text-[10px] font-bold uppercase tracking-widest ${highlight ? 'text-indigo-300' : 'text-slate-500'}`}>{label}</span>}
    <div className="flex items-center font-mono">
      <span className="text-5xl text-slate-700 font-thin select-none">[</span>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-right mx-2 min-w-[4rem]">
        {matrix.map((val, i) => (
          <span key={i} className={`text-xl ${highlight ? 'text-indigo-200 font-bold' : 'text-slate-300'}`}>{val}</span>
        ))}
      </div>
      <span className="text-5xl text-slate-700 font-thin select-none">]</span>
    </div>
  </div>
);

// --- Step Log Containers ---
export const StepLogContainer = ({ children, maxHeight = "max-h-[480px]" }) => (
  <div className={`overflow-y-auto custom-scrollbar p-1 space-y-3 ${maxHeight}`}>
    {children}
  </div>
);

export const StepItem = ({ children }) => (
  <div className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-200 text-sm font-mono flex items-center justify-between gap-4 group">
    {children}
  </div>
);