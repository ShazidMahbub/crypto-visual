import React from 'react';

export const Input = ({ className = "", ...props }) => (
  <input 
    className={`bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:bg-black/40 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder-slate-600 font-mono text-sm shadow-inner ${className}`} 
    {...props} 
  />
);

export const TextArea = ({ className = "", ...props }) => (
  <textarea 
    className={`w-full bg-black/20 border border-white/10 rounded-xl p-4 text-slate-200 focus:bg-black/40 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder-slate-600 font-mono text-sm min-h-[160px] shadow-inner resize-none no-scrollbar ${className}`} 
    {...props} 
  />
);

export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
    {children}
  </label>
);