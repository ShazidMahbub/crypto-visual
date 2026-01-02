import React from 'react';
import { useHillCracker } from '../../../hooks/useHillCracker';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Input, Label } from '../../common/Inputs';
import { MatrixDisplay } from '../../common/Results';
import { GridContainer } from '../../layout/Layout';

const HillCracker = () => {
  const {
    plain,
    setPlain,
    cipher,
    setCipher,
    keyFound,
    error,
    debugInfo,
    crack
  } = useHillCracker();

  return (
    <div className="space-y-8">
      <div className="border-l-4 border-rose-600 pl-6 py-2">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Known Plaintext Attack</h2>
        <p className="text-slate-500 text-sm mt-1">Recalculating the matrix key from known intercept data.</p>
      </div>

      <GridContainer>
          <div className="space-y-6">
            <Card title="Attack Configuration">
                <div className="space-y-4">
                    <div><Label>Known Plain (e.g., "HELP")</Label><Input value={plain} onChange={e => setPlain(e.target.value)} className="w-full text-amber-500 font-bold uppercase" /></div>
                    <div><Label>Known Cipher</Label><Input value={cipher} onChange={e => setCipher(e.target.value)} className="w-full text-cyan-400 font-bold uppercase" /></div>
                    <Button onClick={crack} variant="danger" className="w-full">Break Cipher</Button>
                    {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">{error}</div>}
                </div>
            </Card>

            {debugInfo && (
                <Card title="Inversion Walkthrough">
                    <div className="space-y-4 text-[10px] font-mono leading-relaxed">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                            <p className="text-rose-400 font-bold uppercase mb-2">Step 1: Construct Matrix P</p>
                            <p>Reading "{debugInfo.plain.slice(0,4)}" as pairs of column vectors:</p>
                            <p>Vector 1: [{debugInfo.plain[0]},{debugInfo.plain[1]}] → [{debugInfo.P[0]},{debugInfo.P[1]}]</p>
                            <p>Vector 2: [{debugInfo.plain[2]},{debugInfo.plain[3]}] → [{debugInfo.P[2]},{debugInfo.P[3]}]</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                            <p className="text-rose-400 font-bold uppercase mb-2">Step 2: Find P⁻¹</p>
                            <p>Det(P) = {debugInfo.det}</p>
                            <p>Det⁻¹ mod 26 = {debugInfo.detInv}</p>
                            <p>Adjugate(P) = [{debugInfo.adj.join(', ')}]</p>
                            <p className="text-emerald-400 mt-2">P⁻¹ = Det⁻¹ · Adj(P) mod 26</p>
                        </div>
                    </div>
                </Card>
            )}
          </div>

          <Card title="Analysis Dashboard" className="min-h-[600px] flex items-center justify-center" noPadding>
              {!keyFound ? (
                  <div className="text-center opacity-30"><p className="text-5xl mb-4">🔓</p><p className="text-[10px] font-bold uppercase tracking-[0.2em]">Awaiting Data</p></div>
              ) : (
                  <div className="w-full h-full p-8 flex flex-col justify-between animate-fade-in">
                      {/* Matrix Inversion Row */}
                      <div className="flex flex-col items-center gap-6">
                        <span className="text-[10px] text-slate-500 font-bold uppercase self-start">Matrix Inversion Process:</span>
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                            <MatrixDisplay matrix={debugInfo.P} label="P Matrix" />
                            <div className="text-slate-700 text-xl">→</div>
                            <MatrixDisplay matrix={debugInfo.adj} label="Adjugate(P)" className="border-amber-500/20 bg-amber-500/5" />
                            <div className="text-slate-700 text-xl">→</div>
                            <MatrixDisplay matrix={debugInfo.P_inv} label="P⁻¹ Matrix" className="border-rose-500/20 bg-rose-500/5" />
                        </div>
                      </div>

                      {/* Final Calculation Row */}
                      <div className="mt-12 flex flex-col items-center gap-6">
                        <span className="text-[10px] text-slate-500 font-bold uppercase self-start">Key Recovery (K = C · P⁻¹):</span>
                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                            <MatrixDisplay matrix={debugInfo.C} label="C Matrix" />
                            <div className="text-slate-700 text-xl">×</div>
                            <MatrixDisplay matrix={debugInfo.P_inv} label="P⁻¹ Matrix" />
                            <div className="text-slate-700 text-xl">=</div>
                            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
                                <MatrixDisplay matrix={keyFound} label="Recovered Matrix Key" highlight />
                            </div>
                        </div>
                      </div>

                      <div className="mt-8 p-3 bg-white/5 rounded-xl border border-white/5 text-[9px] text-slate-500 italic text-center">
                        The key matrix K is found by multiplying the Ciphertext matrix by the Inverse Plaintext matrix mod 26.
                      </div>
                  </div>
              )}
          </Card>
      </GridContainer>
    </div>
  );
};

export default HillCracker;