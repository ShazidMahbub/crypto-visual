import React from 'react';
import Card from '../../common/Card';

const CaesarVisualizer = ({ alphaRows, shiftedRows }) => {
  return (
    <Card title="Alphabet Mapping" noPadding>
        <div className="p-6 space-y-6">
            {alphaRows.map((row, rIdx) => (
                <div key={rIdx} className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-12 text-[9px] font-bold text-slate-500 uppercase tracking-wider">Plain</div>
                        <div className="flex gap-1 flex-1">
                            {row.map(c => (
                                <div key={c} className="flex-1 aspect-square max-w-[32px] flex items-center justify-center text-slate-400 font-mono text-[10px] bg-white/5 rounded-md border border-white/5">
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-12 text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Shifted</div>
                        <div className="flex gap-1 flex-1">
                            {shiftedRows[rIdx].map((c, cIdx) => (
                                <div key={`${rIdx}-${cIdx}`} className="flex-1 aspect-square max-w-[32px] flex items-center justify-center font-mono font-bold text-[10px] rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default CaesarVisualizer;
