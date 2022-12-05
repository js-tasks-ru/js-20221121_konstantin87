/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) return '';
  if (size === undefined) return string;

  let consecutiveCharCount = 0;
  let prevChar = '';
  let newString = '';

  for (const char of string) {
    if (char !== prevChar) {
      prevChar = char;
      consecutiveCharCount = 1;
      newString += char;
    } else {
      if (consecutiveCharCount < size) {
        consecutiveCharCount++;
        newString += char;
      }
    }
  }

  return newString;
}
