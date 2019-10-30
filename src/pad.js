// © 2019, MIT license

const { wideLength } = require('./length')

/**
 * Pads a string to a specified length, counting wide characters as two.
 *
 * @param   {string} str          Input string to scan
 * @param   {number} targetLength Target length (visual length, wide characters counting as two)
 * @param   {string} padChar      String used to pad the empty space
 * @param   {string} padFn        Padding function name; either 'padStart' or 'padEnd'
 * @returns {string}              String padded to the target length
 */
const _widePad = (str, targetLength, padChar = ' ', padFn = null) => {
  // Simply compare the wide length to the real length to find the real padding value.
  const wideLen = wideLength(str)
  const widePadding = targetLength - (wideLen - str.length)
  return str[padFn](widePadding, padChar)
}

/**
 * Pads the start of a string to a specified length using a padding character,
 * counting wide characters as two in the source string.
 *
 * This is a drop-in replacement for String.prototype.padStart() and has the same interface:
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart>
 *
 * @param   {string} str          Input string to scan
 * @param   {number} targetLength Target length (visual length, wide characters counting as two)
 * @param   {string} padChar      String used to pad the empty space
 * @returns {string}              String padded to the target length
 */
const widePadStart = (str, targetLength, padChar = ' ') => _widePad(str, targetLength, padChar, 'padStart')

/**
 * Pads the end of a string to a specified length using a padding character,
 * counting wide characters as two in the source string.
 *
 * This is a drop-in replacement for String.prototype.padEnd() and has the same interface:
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd>
 *
 * @param   {string} str          Input string to scan
 * @param   {number} targetLength Target length (visual length, wide characters counting as two)
 * @param   {string} padChar      String used to pad the empty space
 * @returns {string}              String padded to the target length
 */
const widePadEnd = (str, targetLength, padChar = ' ') => _widePad(str, targetLength, padChar, 'padEnd')

module.exports = {
  widePadEnd,
  widePadStart
}
