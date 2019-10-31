// © 2019, MIT license

const { charRangeReGlobal } = require('./characters')

/**
 * Returns the length of a string with wide/fullwidth characters counting for two.
 *
 * For example, for the string 'aiueoあいうえお' this will return 15: 5 for the ASCII 'aiueo'
 * characters, and 10 for the kana version (twice as much since they count for two).
 *
 * Note: if this is called with a null or undefined argument, or anything that does not
 * have a 'length' attribute, the result will be 'null'. Contrary to code like (null).length
 * which throws a TypeError.
 *
 * This function is exact/unambiguous (see readme.md).
 *
 * @param   {string} str Input string to measure
 * @returns {number}     Length of the string
 */
const wideLength = str => {
  // Verify that 'str' has a length attribute.
  if (!str || !str.length) return null

  // Simply replace all characters in the range with 'xx' and then return the new length.
  return str.replace(charRangeReGlobal, 'xx').length
}

module.exports = {
  wideLength
}
