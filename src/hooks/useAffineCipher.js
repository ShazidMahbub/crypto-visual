import { useState } from 'react';
import { mod, alphabet, gcd, modInverse, getEuclideanSteps } from '../utils/math';
import { 
  formatEncryptionInput, 
  formatDecryptionInput, 
  formatEncryptionOutput, 
  formatDecryptionOutput 
} from '../utils/textProcessor';

export const useAffineCipher = () => {
  const [params, setParams] = useState({ a: 5, b: 8 }); // Grouped params
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('encrypt');

  const isCoprime = gcd(params.a, 26) === 1;
  const gcdResult = gcd(params.a, 26);
  const euclideanSteps = getEuclideanSteps(params.a, 26);
  const modInverseResult = isCoprime ? modInverse(params.a) : null;

  const process = (newMode) => {
    setMode(newMode);
    
    // 1. Clean Input
    const cleaned = newMode === 'encrypt' 
      ? formatEncryptionInput(text) 
      : formatDecryptionInput(text);
    setText(cleaned);

    if (!isCoprime) return;

    // 2. Perform Math
    let out = "";
    const aInv = modInverseResult;
    const newSteps = [];

    for (let char of cleaned) {
      const x = alphabet.indexOf(char.toUpperCase());
      if (x === -1) continue;
      
      let y, mathStr;
      if (newMode === 'encrypt') {
        const val = params.a * x + params.b;
        y = mod(val); 
        mathStr = `(${params.a}×${x} + ${params.b})`;
      } else {
        const val = aInv * (x - params.b);
        y = mod(val);
        mathStr = `${aInv}×(${x} - ${params.b})`;
      }
      
      const resChar = alphabet[y];
      out += resChar;
      newSteps.push({ 
        char: newMode === 'encrypt' ? char.toLowerCase() : char.toUpperCase(), 
        x, 
        math: mathStr, 
        y, 
        out: newMode === 'encrypt' ? resChar.toUpperCase() : resChar.toLowerCase()
      });
    }

    // 3. Format Output
    setResult(newMode === 'encrypt' 
      ? formatEncryptionOutput(out) 
      : formatDecryptionOutput(out));
    setSteps(newSteps);
  };

  return {
    a: params.a,
    b: params.b,
    setA: (val) => setParams(prev => ({ ...prev, a: parseInt(val) || 0 })),
    setB: (val) => setParams(prev => ({ ...prev, b: parseInt(val) || 0 })),
    text,
    setText,
    result,
    steps,
    mode,
    isCoprime,
    gcdResult,
    euclideanSteps,
    modInverseResult,
    process
  };
};
