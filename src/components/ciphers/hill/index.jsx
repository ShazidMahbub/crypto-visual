import React from 'react';
import { useHillCipher } from '../../../hooks/useHillCipher';
import { GridContainer } from '../../layout/Layout';
import { ResultBox, StepLogContainer, MatrixDisplay } from '../../common/Results';
import CipherInputPanel from '../../common/CipherInputPanel';
import Card from '../../common/Card';

const HillCipher = () => {
  const { 
    matrix, updateMatrix, isInvertible,
    text, setText, result, steps, mode, process 
  } = useHillCipher();

  return (
    <GridContainer>
      {/* Configuration & Log Column */}
      <div className="space-y-6">
        <CipherInputPanel
            title="Hill Configuration"
            text={text}
            setText={setText}
            onEncrypt={() => process('encrypt')}
            onDecrypt={() => process('decrypt')}
            disableActions={!isInvertible}
        >
            <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5 mb-2">
                <div className="flex gap-4 items-center">
                    <span className="text-6xl text-slate-800 font-thin">[</span>
                    <div className="grid grid-cols-2 gap-3">
                      {matrix.map((val, idx) => (
                        <input
                          key={idx}
                          type="number"
                          value={val}
                          onChange={(e) => updateMatrix(idx, e.target.value)}
                          className="w-12 h-12 bg-white/5 border border-white/10 text-center text-lg font-mono text-indigo-400 rounded-lg outline-none focus:border-indigo-500 transition-all"
                        />
                      ))}
                    </div>
                    <span className="text-6xl text-slate-800 font-thin">]</span>
                </div>
                <p className={`mt-4 text-xs font-mono font-bold ${isInvertible ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {isInvertible ? "Matrix is Invertible" : "Matrix is Singular (Invalid)"}
                </p>
            </div>
        </CipherInputPanel>
        
        {result && <ResultBox result={result} label={`${mode.toUpperCase()}ED Output`} />}

        <Card title={`${mode.toUpperCase()} Vector Log`} noPadding>
             <div className="p-4">
                <StepLogContainer>
                    {steps.map((step, i) => (
                        <div key={i} className="bg-black/40 border border-white/5 rounded-xl p-4 mb-3">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
                                <span className="text-slate-500">Block #{i+1}</span>
                                <span className="text-emerald-400">{step.pair} → {step.outChars}</span>
                            </div>
                            <div className="text-center font-mono text-xs text-slate-400">
                                [{step.vec.join(', ')}] × K = <span className="text-indigo-300">[{step.resVec.join(', ')}]</span>
                            </div>
                        </div>
                    ))}
                </StepLogContainer>
             </div>
        </Card>
      </div>

      {/* Analysis Dashboard Column */}
      <div className="space-y-6">
        <Card title="Analysis Dashboard" className="min-h-[600px] flex flex-col justify-center" noPadding>
            {!result ? (
                <div className="text-center opacity-30 p-20">
                    <p className="text-5xl mb-4">🔍</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Awaiting Operation</p>
                </div>
            ) : (
                <div className="w-full h-full p-8 flex flex-col items-center space-y-12 animate-fade-in">
                    
                    {/* Visualizing Key Logic */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {mode === 'decrypt' ? "Decryption Key (K⁻¹)" : "Encryption Key (K)"}
                        </span>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
                            <MatrixDisplay 
                                matrix={(mode === 'decrypt' && steps.length > 0) ? steps[0].effectiveMatrix : matrix} 
                                label={mode === 'encrypt' ? "Key Matrix K" : "Inverse Matrix K⁻¹"} 
                                highlight={mode === 'decrypt'}
                            />
                        </div>
                    </div>

                    {/* Transformation Sample Section */}
                    {steps.length > 0 && (
                        <div className="flex flex-col items-center gap-6 w-full">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                {mode === 'encrypt' ? "Encryption" : "Decryption"} Sample (Block #1)
                            </span>
                            <div className="flex flex-wrap justify-center items-center gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-xl font-mono text-amber-500">
                                        [{steps[0].vec.join(', ')}]
                                    </div>
                                    <span className="text-[8px] text-slate-600 font-bold uppercase">
                                        {mode === 'encrypt' ? "Plain Vector (P)" : "Cipher Vector (C)"}
                                    </span>
                                </div>

                                <div className="text-slate-700 text-xl">×</div>

                                <div className="scale-75 origin-center">
                                    <MatrixDisplay 
                                        matrix={(mode === 'decrypt' && steps.length > 0) ? steps[0].effectiveMatrix : matrix} 
                                        label="" 
                                    />
                                </div>

                                <div className="text-slate-700 text-xl">=</div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-3 rounded-xl font-mono text-indigo-400">
                                        [{steps[0].resVec.join(', ')}]
                                    </div>
                                    <span className="text-[8px] text-slate-600 font-bold uppercase">
                                        {mode === 'encrypt' ? "Cipher Vector (C)" : "Plain Vector (P)"}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="text-center py-4 px-6 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-slate-400 font-mono italic">
                                    {mode === 'encrypt' 
                                        ? "Formula: C = P · K mod 26" 
                                        : "Formula: P = C · K⁻¹ mod 26"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Card>
      </div>
    </GridContainer>
  );
};

export default HillCipher;