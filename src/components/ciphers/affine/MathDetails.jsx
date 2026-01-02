import React from 'react';
import Card from '../../common/Card';

const AffineMathDetails = ({ a, isCoprime, mode, gcdResult, euclideanSteps, modInverseResult }) => {
  return (
    <Card title="Extended Math Logic">
        <div className="space-y-4">
            <div className={`p-4 rounded-xl border text-sm font-mono ${isCoprime ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                <p className="font-bold mb-2">Euclidean Algorithm for GCD({a}, 26)</p>
                <div className="text-[10px] space-y-1 opacity-80">
                    {euclideanSteps.map((step, i) => <p key={i}>{step}</p>)}
                </div>
                <p className="mt-3 text-[11px] font-sans italic font-bold">
                    GCD is {gcdResult} → {isCoprime ? "Valid" : "Invalid"}
                </p>
            </div>

            {mode === 'decrypt' && isCoprime && (
                <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-sm font-mono animate-fade-in">
                    <p className="text-indigo-300 font-bold mb-1 uppercase text-[10px]">Modular Multiplicative Inverse</p>
                    <p className="text-[10px] text-slate-400 mb-2 italic">Solving ({a} · x) ≡ 1 (mod 26)</p>
                    <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-white/5">
                        <span className="text-slate-500">a⁻¹ =</span>
                        <span className="text-indigo-400 font-bold text-lg">{modInverseResult}</span>
                    </div>
                </div>
            )}
        </div>
    </Card>
  );
};

export default AffineMathDetails;
