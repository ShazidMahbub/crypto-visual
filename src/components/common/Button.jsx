import React from 'react';

const Button = ({ variant = 'primary', className = "", children, ...props }) => {
  const base = "relative overflow-hidden px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-gradient-to-br from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white shadow-indigo-500/25 border border-indigo-400/20",
    secondary: "bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-200 border border-white/10 hover:border-white/20",
    danger: "bg-gradient-to-br from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white shadow-rose-500/25 border border-rose-400/20",
    ghost: "bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-transparent"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant !== 'ghost' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out blur-md"></div>
      )}
    </button>
  );
};

export default Button;