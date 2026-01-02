import React from 'react';

export const GridContainer = ({ children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    {children}
  </div>
);

export const PageTitle = ({ title, subtitle }) => (
  <div className="relative inline-block group">
    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tighter mb-4 drop-shadow-2xl">
      {title}
    </h1>
    {subtitle && (
      <div className="flex items-center justify-center gap-4">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-indigo-500"></div>
        <p className="text-indigo-300/80 text-sm md:text-base font-medium tracking-wide uppercase">{subtitle}</p>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-indigo-500"></div>
      </div>
    )}
  </div>
);