import React from 'react';
import { useCaesarCipher } from '../../../hooks/useCaesarCipher';
import { GridContainer } from '../../layout/Layout';
import { ResultBox, StepLogContainer, StepItem } from '../../common/Results';
import { Input, Label } from '../../common/Inputs';
import CipherInputPanel from '../../common/CipherInputPanel';
import CaesarVisualizer from './Visualizer';
import Card from '../../common/Card';

const CaesarCipher = () => {
  const { 
    shift, setShift,
    text, setText, 
    result, steps, mode, 
    process,
    alphaRows, shiftedRows
  } = useCaesarCipher();

  return (
    <GridContainer>
      {/* Left Column: Configuration */}
      <div className="space-y-6">
        <CipherInputPanel
          title="Caesar Configuration"
          text={text}
          setText={setText}
          onEncrypt={() => process('encrypt')}
          onDecrypt={() => process('decrypt')}
        >
          <Label>Shift Key (k)</Label>
          <Input
              type="number" 
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-24 text-center text-lg font-bold text-indigo-400"
          />
        </CipherInputPanel>

        {result && <ResultBox result={result} label={mode === 'encrypt' ? "Ciphertext" : "Plaintext"} />}
      </div>

      {/* Right Column: Visualization & Logs */}
      <div className="space-y-6">
        <CaesarVisualizer alphaRows={alphaRows} shiftedRows={shiftedRows} />

        {steps.length > 0 && (
            <Card title="Step-by-Step Log" noPadding>
                <div className="p-4">
                    <StepLogContainer>
                        {steps.map((step, i) => (
                            <StepItem key={i}>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-slate-300">{step.char}</span>
                                    <span className="text-slate-600">➜</span>
                                </div>
                                <div className="bg-black/40 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 flex-1 text-center border border-white/5 font-mono">
                                    ({step.idx} {step.shift >= 0 ? '+' : '-'} {Math.abs(step.shift)}) mod 26 = <span className="text-indigo-400 font-bold">{step.newIdx}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-600">➜</span>
                                    <span className="text-lg font-bold text-emerald-400">{step.cipherChar}</span>
                                </div>
                            </StepItem>
                        ))}
                    </StepLogContainer>
                </div>
            </Card>
        )}
      </div>
    </GridContainer>
  );
};

export default CaesarCipher;
