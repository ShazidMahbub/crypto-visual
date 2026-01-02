import { useState, useEffect } from 'react';
import { generatePlayfairMatrix } from '../utils/math';
import { 
  formatEncryptionInput, 
  formatDecryptionInput, 
  formatEncryptionOutput, 
  formatDecryptionOutput 
} from '../utils/textProcessor';

export const usePlayfairCipher = () => {
  const [key, setKey] = useState("MONARCHY");
  const [text, setText] = useState("");
  const [matrix, setMatrix] = useState([]);
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('encrypt');

  useEffect(() => {
    setMatrix(generatePlayfairMatrix(key));
  }, [key]);

  const findPos = (char) => {
    const searchChar = char === 'J' ? 'I' : char;
    const idx = matrix.indexOf(searchChar);
    return { row: Math.floor(idx / 5), col: idx % 5, char: searchChar };
  };

  const process = (newMode) => {
    setMode(newMode);
    const rawClean = newMode === 'encrypt' ? formatEncryptionInput(text) : formatDecryptionInput(text);
    let cleanText = rawClean.toUpperCase().replace(/J/g, 'I');
    
    // Pairing logic with 'X' padding
    let processedText = "";
    for (let i = 0; i < cleanText.length; i++) {
      processedText += cleanText[i];
      if (i + 1 < cleanText.length) {
        if (cleanText[i] === cleanText[i + 1]) {
          processedText += 'X';
        } else {
          processedText += cleanText[i + 1];
          i++;
        }
      }
    }
    if (processedText.length % 2 !== 0) processedText += 'X';

    let out = "";
    const shift = newMode === 'encrypt' ? 1 : 4; 
    const newSteps = [];

    for (let i = 0; i < processedText.length; i += 2) {
      const p1 = processedText[i];
      const p2 = processedText[i+1];
      const c1 = findPos(p1);
      const c2 = findPos(p2);
      
      let resC1, resC2, type, ruleLabel;

      if (c1.row === c2.row) {
        type = 'ROW';
        ruleLabel = newMode === 'encrypt' ? "Row: Shift Right" : "Row: Shift Left";
        resC1 = findPos(matrix[c1.row * 5 + (c1.col + shift) % 5]);
        resC2 = findPos(matrix[c2.row * 5 + (c2.col + shift) % 5]);
      } else if (c1.col === c2.col) {
        type = 'COL';
        ruleLabel = newMode === 'encrypt' ? "Column: Shift Down" : "Column: Shift Up";
        resC1 = findPos(matrix[((c1.row + shift) % 5) * 5 + c1.col]);
        resC2 = findPos(matrix[((c2.row + shift) % 5) * 5 + c2.col]);
      } else {
        type = 'RECT';
        ruleLabel = "Rectangle: Swap Columns";
        resC1 = findPos(matrix[c1.row * 5 + c2.col]);
        resC2 = findPos(matrix[c2.row * 5 + c1.col]);
      }

      out += resC1.char + resC2.char;
      newSteps.push({
        id: `step-${i}`,
        pair: [p1, p2],
        c1, c2,
        type,
        rule: ruleLabel,
        resPair: [resC1.char, resC2.char],
        resC1, resC2
      });
    }

    const formattedRes = newMode === 'encrypt' ? formatEncryptionOutput(out) : formatDecryptionOutput(out);
    setResult(formattedRes);
    setSteps(newSteps);
    setText(rawClean);
  };

  return {
    key,
    setKey,
    text,
    setText,
    matrix,
    result,
    steps,
    mode,
    process
  };
};
