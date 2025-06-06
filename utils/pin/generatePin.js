/**
 * Generate a random 6-character alphanumeric string with safe symbols
 * Safe symbols: ! @ # $ % & *
 * @returns {string}
 */
const generatePin = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * chars.length);
    result += chars[rand];
  }
  return result;
};

export default generatePin;
