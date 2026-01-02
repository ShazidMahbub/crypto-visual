import React from 'react';

const Card = ({ children, className = "", title, noPadding = false }) => (
  <div className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/5 ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:text-indigo-300 transition-colors">{title}</h3>
        <div className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors"></div>
      </div>
    )}
    <div className={noPadding ? "flex-1 flex flex-col" : "p-6 flex-1 flex flex-col"}>
      {children}
    </div>
  </div>
);

export default Card;