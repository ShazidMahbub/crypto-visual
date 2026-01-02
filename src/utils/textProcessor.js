export const cleanInput = (input) => {
  // Remove spaces and special chars
  return input.replace(/[\s0-9\W_]/g, '');
};

export const formatEncryptionInput = (input) => cleanInput(input).toLowerCase();
export const formatDecryptionInput = (input) => cleanInput(input).toUpperCase();
export const formatEncryptionOutput = (output) => output.toUpperCase();
export const formatDecryptionOutput = (output) => output.toLowerCase();