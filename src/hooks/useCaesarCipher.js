import { useState } from 'react';
import { mod, alphabet } from '../utils/math';
import { 
  formatEncryptionInput, 
  formatDecryptionInput, 
  formatEncryptionOutput, 
  formatDecryptionOutput 
} from '../utils/textProcessor';

export const useCaesarCipher = () => {
  const [shift, setShift] = useState(3);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('encrypt');

  const alphaRows = [alphabet.slice(0, 13).split(''), alphabet.slice(13).split('')];
  const shiftedRows = alphaRows.map(row => 
      row.map(c => alphabet[mod(alphabet.indexOf(c) + parseInt(shift, 10))])
  );

  const process = (newMode) => {
    setMode(newMode);
    
    const cleaned = newMode === 'encrypt' 
      ? formatEncryptionInput(text) 
      : formatDecryptionInput(text);
    setText(cleaned);

    let out = "";
    const effectiveShift = newMode === 'encrypt' ? shift : -shift;
    const newSteps = [];

    for (let char of cleaned) {
      const idx = alphabet.indexOf(char.toUpperCase());
      if (idx === -1) continue;
      
      const newIdx = mod(idx + effectiveShift);
      const cipherChar = alphabet[newIdx];
      out += cipherChar;
      newSteps.push({ 
        char: newMode === 'encrypt' ? char.toLowerCase() : char.toUpperCase(), 
        idx, 
        shift: effectiveShift, 
        newIdx, 
        cipherChar: newMode === 'encrypt' ? cipherChar.toUpperCase() : cipherChar.toLowerCase()
      });
    }
    
    setResult(newMode === 'encrypt' 
      ? formatEncryptionOutput(out) 
      : formatDecryptionOutput(out));
    setSteps(newSteps);
  };

  return {
    shift,
    setShift: (val) => setShift(parseInt(val) || 0),
    text,
    setText,
    result,
    steps,
    mode,
    process,
    alphaRows,
    shiftedRows
  };
};
