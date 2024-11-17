/**
 * Generate a random token. Mainly used for security against CSRF 
 * @param length - The length of the returned token
 */
export const generateToken = (length:number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const token = [];
  for (let i=0; i < length; i++) {
    const randomIndex = parseInt((Math.random() * (chars.length-1)).toFixed(0));
    token.push(chars[randomIndex]);
  }
  return token.join("");
};