// © 2019, MIT license

const { wideSlice } = require('./sub')

/**
 * Returns character at a given offset value, counting wide characters as two.
 *
 * This is (nearly) a drop-in replacement for String.prototype.charAt():
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt>
 *
 * It only differs in that ambiguity results in a padding character being returned.
 *
 * @param   {string} str     Input string to scan
 * @param   {number} idx     Index from which to return the character
 * @param   {string} padChar String returned when the given index contains the second half of a wide character
 * @returns {string}         Character found in the input string at the given index
 */
const wideCharAt = (str, idx, padChar = ' ') => {
  // Outsource this to wideSlice().
  return wideSlice(str, idx, idx + 1, padChar)
}

module.exports = {
  wideCharAt
}
