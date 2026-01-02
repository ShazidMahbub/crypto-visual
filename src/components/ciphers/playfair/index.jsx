import React, { useState } from 'react';
import { usePlayfairCipher } from '../../../hooks/usePlayfairCipher';
import { GridContainer } from '../../layout/Layout';
import { ResultBox, StepLogContainer, StepItem } from '../../common/Results';
import { Input, Label } from '../../common/Inputs';
import CipherInputPanel from '../../common/CipherInputPanel';
import Card from '../../common/Card';

const PlayfairCipher = () => {
  const { 
    key, setKey,
    text, setText, 
    matrix, result, steps, mode, 
    process 
  } = usePlayfairCipher();

  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStepId, setActiveStepId] = useState(null);

  const getCellClass = (row, col) => {
    const base = "w-10 h-10 md:w-14 md:h-14 flex items-center justify-center font-mono font-bold text-sm rounded-xl transition-all duration-300 relative border ";
    const active = hoveredStep || (activeStepId ? steps.find(s => s.id === activeStepId) : null);

    if (active) {
      const { c1, c2, resC1, resC2 } = active;
      const isInput = (c1.row === row && c1.col === col) || (c2.row === row && c2.col === col);
      const isOutput = (resC1.row === row && resC1.col === col) || (resC2.row === row && resC2.col === col);

      if (isInput) return base + "bg-amber-500 text-white z-20 shadow-lg shadow-amber-500/40 scale-110 border-white/40 ring-2 ring-amber-400/50";
      if (isOutput) return base + "bg-indigo-500 text-white z-20 shadow-lg shadow-indigo-500/40 scale-110 border-white/40 ring-2 ring-indigo-400/50";
      return base + "bg-black/40 text-slate-800 border-white/5 opacity-30";
    }
    
    return base + "bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:bg-white/10";
  };

  return (
    <GridContainer>
      {/* Left Column: Configuration & Log */}
      <div className="space-y-6">
        <CipherInputPanel
          title="Playfair Parameters"
          text={text}
          setText={setText}
          onEncrypt={() => process('encrypt')}
          onDecrypt={() => process('decrypt')}
        >
          <Label>Key Phrase (J is replaced by I)</Label>
          <Input value={key} onChange={e => setKey(e.target.value)} className="w-full text-indigo-400 font-bold uppercase tracking-widest" />
        </CipherInputPanel>
        
        {steps.length > 0 && (
            <Card title={`${mode.toUpperCase()} Operation Log`} noPadding>
                <div className="px-6 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Interactive Steps</span>
                    <span className="text-[9px] text-slate-600 italic">Click or hover to highlight matrix</span>
                </div>
                <div className="p-4">
                    <StepLogContainer maxHeight="max-h-none">
                        {steps.map((step) => (
                            <StepItem key={step.id}>
                                <div 
                                    className={`flex items-center justify-between w-full cursor-pointer p-3 rounded-lg transition-all duration-200 ${activeStepId === step.id ? 'bg-indigo-500/10 border-indigo-500/20' : 'hover:bg-white/5'}`}
                                    onMouseEnter={() => setHoveredStep(step)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                    onClick={() => setActiveStepId(activeStepId === step.id ? null : step.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center">
                                            <span className="text-amber-500 font-bold text-lg">{step.pair.join('')}</span>
                                            <span className="text-[8px] text-slate-600 font-mono">({step.c1.row},{step.c1.col})</span>
                                        </div>
                                        <span className="text-slate-700">→</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-indigo-400 font-bold text-lg">{step.resPair.join('')}</span>
                                            <span className="text-[8px] text-slate-600 font-mono">({step.resC1.row},{step.resC1.col})</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-slate-400 font-bold uppercase tracking-wider mb-1 group-hover:text-white transition-colors">
                                            {step.rule}
                                        </div>
                                        <span className="text-[8px] text-slate-600 font-mono italic">{step.type} MATCH</span>
                                    </div>
                                </div>
                            </StepItem>
                        ))}
                    </StepLogContainer>
                </div>
            </Card>
        )}
      </div>
      
      {/* Right Column: Matrix & Result */}
      <div className="lg:sticky lg:top-24 space-y-6">
         <Card title="Interactive 5x5 Matrix" className="w-full min-h-[500px] flex flex-col items-center justify-center relative">
             <div className="p-4 bg-black/40 rounded-3xl border border-white/5 shadow-2xl">
                 <div className="grid grid-cols-5 gap-2 md:gap-3">
                    {matrix.map((char, i) => {
                        const r = Math.floor(i/5), c = i%5;
                        return (
                            <div key={i} className={getCellClass(r, c)}>
                                {char === 'I' ? (
                                    <div className="flex flex-col items-center justify-center leading-none">
                                        <span className="text-[10px]">I</span>
                                        <div className="h-[1px] w-2 bg-white/20 my-0.5"></div>
                                        <span className="text-[10px]">J</span>
                                    </div>
                                ) : char}
                                <span className="absolute -top-1 -left-1 text-[6px] text-slate-700 opacity-40">{r},{c}</span>
                            </div>
                        );
                    })}
                 </div>
             </div>

             <div className="mt-10 w-full max-w-[300px] space-y-3">
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"></div> Plain</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div> Cipher</div>
                 </div>
                 <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[9px] text-slate-400 italic text-center">
                    Note: J is mapped to the same cell as I. Coordinates are (row, column).
                 </div>
             </div>
         </Card>
         
         {result && (
            <div className="animate-fade-in">
              <ResultBox 
                  result={result} 
                  label={mode === 'encrypt' ? "Encrypted Ciphertext" : "Decrypted Plaintext"} 
              />
            </div>
         )}
      </div>
    </GridContainer>
  );
};

export default PlayfairCipher;
