import { useState } from 'react';
import { alphabet, multiplyMatrixVector, getMatrixInverse, gcd, mod } from '../utils/math';
import { 
  formatEncryptionInput, 
  formatDecryptionInput, 
  formatEncryptionOutput, 
  formatDecryptionOutput 
} from '../utils/textProcessor';

export const useHillCipher = () => {
  const [matrix, setMatrix] = useState([3, 3, 2, 5]);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('encrypt');

  const detRaw = (matrix[0] * matrix[3]) - (matrix[1] * matrix[2]);
  const detMod = mod(detRaw);
  const commonFactor = gcd(detMod, 26);
  const isInvertible = commonFactor === 1 && detMod !== 0;

  const updateMatrix = (index, value) => {
    const newM = [...matrix];
    newM[index] = parseInt(value) || 0;
    setMatrix(newM);
  };

  const process = (newMode) => {
    setMode(newMode);
    const cleaned = newMode === 'encrypt' 
      ? formatEncryptionInput(text) 
      : formatDecryptionInput(text);
    setText(cleaned);

    if (!isInvertible) return;

    let pairs = [];
    for(let i=0; i<cleaned.length; i+=2) {
      pairs.push(cleaned[i] + (cleaned[i+1] || 'X'));
    }

    let effectiveMatrix = matrix;
    if (newMode === 'decrypt') {
      const inv = getMatrixInverse(matrix);
      if (!inv) return;
      effectiveMatrix = inv;
    }

    const newSteps = [];
    let out = "";
    
    for (const pair of pairs) {
      const v = [
        alphabet.indexOf(pair[0].toUpperCase()), 
        alphabet.indexOf(pair[1].toUpperCase())
      ];
      const res = multiplyMatrixVector(effectiveMatrix, v);
      
      const resChars = alphabet[res[0]] + alphabet[res[1]];
      out += resChars;
      
      newSteps.push({
        vec: v,
        resVec: res,
        effectiveMatrix: effectiveMatrix,
        pair: newMode === 'encrypt' ? pair.toLowerCase() : pair.toUpperCase(),
        outChars: newMode === 'encrypt' ? resChars.toUpperCase() : resChars.toLowerCase(),
      });
    }

    setResult(newMode === 'encrypt' 
      ? formatEncryptionOutput(out) 
      : formatDecryptionOutput(out));
    setSteps(newSteps);
  };

  return {
    matrix, updateMatrix, isInvertible,
    text, setText, result, steps, mode, process
  };
};