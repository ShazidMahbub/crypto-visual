import React from 'react';
import { useAffineCipher } from '../../../hooks/useAffineCipher';
import { GridContainer } from '../../layout/Layout';
import { ResultBox, StepLogContainer, StepItem } from '../../common/Results';
import { Input, Label } from '../../common/Inputs';
import CipherInputPanel from '../../common/CipherInputPanel';
import AffineMathDetails from './MathDetails';

const AffineCipher = () => {
  const { 
    a, b, setA, setB, 
    text, setText, 
    result, steps, mode, isCoprime, 
    gcdResult, euclideanSteps, modInverseResult,
    process 
  } = useAffineCipher();

  return (
    <GridContainer>
      <div className="space-y-6">
        <CipherInputPanel
          title="Affine Config"
          text={text}
          setText={setText}
          onEncrypt={() => process('encrypt')}
          onDecrypt={() => process('decrypt')}
        >
           {/* Affine Specific Inputs */}
           <div className="grid grid-cols-2 gap-6">
                <div>
                    <Label>Multiplier (a)</Label>
                    <Input 
                        type="number" 
                        value={a} 
                        onChange={e => setA(e.target.value)}
                        className="w-full text-center text-indigo-400 font-bold" 
                    />
                </div>
                <div>
                    <Label>Shift (b)</Label>
                    <Input 
                        type="number" 
                        value={b} 
                        onChange={e => setB(e.target.value)}
                        className="w-full text-center text-indigo-400 font-bold" 
                    />
                </div>
            </div>
        </CipherInputPanel>

        <AffineMathDetails 
          a={a} 
          isCoprime={isCoprime} 
          mode={mode}
          gcdResult={gcdResult}
          euclideanSteps={euclideanSteps}
          modInverseResult={modInverseResult}
        />
        
        {result && <ResultBox result={result} label={`${mode}ed Output`} />}
      </div>

      {/* Right Column: Logs */}
      <div className="space-y-6">
         {steps.length > 0 && (
             <StepLogContainer>
                {steps.map((step, i) => (
                    <StepItem key={i}>
                        <div className="flex items-center gap-3 w-14">
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 text-white font-bold">{step.char}</span>
                        </div>
                        <div className="flex-1 text-center font-mono text-xs text-slate-400">
                            {step.math} mod 26 ≡ <span className="text-indigo-400 font-bold">{step.y}</span>
                        </div>
                        <div className="flex items-center gap-3 justify-end w-14">
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">{step.out}</span>
                        </div>
                    </StepItem>
                ))}
             </StepLogContainer>
         )}
      </div>
    </GridContainer>
  );
};

export default AffineCipher;
