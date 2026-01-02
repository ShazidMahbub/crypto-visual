export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Modulo that handles negative numbers correctly (e.g., -3 mod 26 = 23)
export const mod = (n, m = 26) => ((n % m) + m) % m;

// GCD for Affine validation
export const gcd = (a, b) => (!b ? a : gcd(b, a % b));

// Find Modular Multiplicative Inverse
export const modInverse = (a, m = 26) => {
  for (let x = 1; x < m; x++) {
    if (((a % m) * (x % m)) % m === 1) return x;
  }
  return null;
};

// Determinant of 2x2 Matrix
export const getDeterminant = (m) => {
  return mod((m[0] * m[3]) - (m[1] * m[2]));
};

// Inverse of 2x2 Matrix
export const getMatrixInverse = (matrix) => {
  const det = getDeterminant(matrix);
  const detInv = modInverse(det);
  
  if (detInv === null) return null;

  // Adjugate matrix: swap a/d, negate b/c
  const adjugate = [
    matrix[3], -matrix[1],
    -matrix[2], matrix[0]
  ];

  return adjugate.map(val => mod(val * detInv));
};

// Matrix x Vector Multiplication
export const multiplyMatrixVector = (matrix, vector) => {
  const c0 = mod(matrix[0] * vector[0] + matrix[1] * vector[1]);
  const c1 = mod(matrix[2] * vector[0] + matrix[3] * vector[1]);
  return [c0, c1];
};

// Matrix x Matrix Multiplication (For Cracker)
export const multiplyMatrixMatrix = (A, B) => {
  return [
    mod(A[0]*B[0] + A[1]*B[2]), mod(A[0]*B[1] + A[1]*B[3]),
    mod(A[2]*B[0] + A[3]*B[2]), mod(A[2]*B[1] + A[3]*B[3])
  ];
};

// Playfair Matrix Generator
export const generatePlayfairMatrix = (key) => {
  let cleanKey = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let matrix = [];
  let used = new Set();

  const addToMatrix = (char) => {
    if (!used.has(char)) {
      used.add(char);
      matrix.push(char);
    }
  };

  for (let char of cleanKey) addToMatrix(char);
  for (let char of alphabet) {
    if (char !== 'J') addToMatrix(char);
  }
  return matrix;
};

// Generates step-by-step Euclidean algorithm logs
export const getEuclideanSteps = (n1, n2) => {
  const steps = [];
  let x = Math.max(n1, n2);
  let y = Math.min(n1, n2);
  while (y !== 0) {
    let q = Math.floor(x / y);
    let r = x % y;
    steps.push(`${x} = ${q} × ${y} + ${r}`);
    x = y;
    y = r;
  }
  return steps;
};