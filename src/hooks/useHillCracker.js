import { useState } from 'react';
import { alphabet, getMatrixInverse, multiplyMatrixMatrix, getDeterminant, modInverse, mod } from '../utils/math';

export const useHillCracker = () => {
  const [plain, setPlain] = useState("HELP"); 
  const [cipher, setCipher] = useState("HIAT"); 
  const [keyFound, setKeyFound] = useState(null);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);

  const crack = () => {
    setError(""); setKeyFound(null); setDebugInfo(null);
    const pClean = plain.toUpperCase().replace(/[^A-Z]/g, '');
    const cClean = cipher.toUpperCase().replace(/[^A-Z]/g, '');

    if (pClean.length < 4 || cClean.length < 4) {
      setError("Need 4 characters of known plaintext/ciphertext.");
      return;
    }

    const P = [alphabet.indexOf(pClean[0]), alphabet.indexOf(pClean[2]), alphabet.indexOf(pClean[1]), alphabet.indexOf(pClean[3])]; 
    const C = [alphabet.indexOf(cClean[0]), alphabet.indexOf(cClean[2]), alphabet.indexOf(cClean[1]), alphabet.indexOf(cClean[3])]; 

    const det = getDeterminant(P);
    if (modInverse(det) === null) {
      setError(`The plaintext pair chosen creates a singular matrix (Determinant is ${det} or shares a factor with 26). Try different plaintext pairs.`);
      return;
    }

    const P_inv = getMatrixInverse(P);
    const K = multiplyMatrixMatrix(C, P_inv);
    setKeyFound(K);
    
    // Adjugate for visualization
    const adj = [P[3], -P[1], -P[2], P[0]].map(v => mod(v));
    setDebugInfo({ P, C, P_inv, K, det, adj, detInv: modInverse(det), plain: pClean, cipher: cClean });
  };

  return {
    plain,
    setPlain,
    cipher,
    setCipher,
    keyFound,
    error,
    debugInfo,
    crack
  };
};
