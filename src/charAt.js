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
 * If the index points to a wide character, that wide character is returned in full.
 * If it points to the 'second half' of a wide character, the padding character is returned.
 * Therefore, the resulting string returned by this function could be length 1 or length 2
 * when calculated with wideLength(), depending on the input string. Use with caution,
 * and use wideSlice() if a consistent string length is a prerequisite.
 *
 * @param   {string} str     Input string to scan
 * @param   {number} idx     Index from which to return the character
 * @param   {string} padChar String returned when the given index contains the second half of a wide character
 * @returns {string}         Character found in the input string at the given index
 */
const wideCharAt = (str, idx, padChar = ' ') => {
  // Take a slice of two characters at the given index, then return its first character.
  // This works because if we get a slice of length 1, we'll always hit the padding character
  // no matter what, and this function must return the wide character instead if we point directly at it.
  const slice = wideSlice(str, idx, idx + 2, padChar)
  return slice[0] || ''
}

module.exports = {
  wideCharAt
}
