// © 2019, MIT license

// CJK Length - Accurate length detection for strings containing wide characters
//
// In CJK (Chinese, Japanese and Korean) text, "wide" or "fullwidth" characters
// are Unicode glyphs that get printed as two blocks wide instead of one when using
// a fixed-width font. Examples include ranges like the Japanese kana (あいうえお),
// full-width romaji (ＡＢＣＤＥ), and kanji/hanzi ideographs (一所懸命).
//
// Since these characters are printed as two blocks, but count as one, this causes
// a problem when trying to accurately measure the length of the string for use
// in a fixed-width text environment such as the terminal--a string containing
// one fullwidth character will visually appear to be one character longer than
// its length value would indicate. This causes e.g. tabulated layouts to be broken.
//
// This function scans a given string for occurrences of characters from the relevant
// Unicode ranges to correctly determine the string's visual length.
//
// To use, replace "myString.length" property accesses with "cjkLength(myString)".
//
// Source: https://unicode.org/reports/tr11/ - Report on East Asian width property

const { charsWide, charsFullWidth } = require('./characters')

// Join together all ranges as a single regular expression.
export const charsRegex = new RegExp(`[${charsWide.join('')}${charsFullWidth.join('')}]`, 'g')

/**
 * Returns the length of a string with wide/fullwidth characters counting for two.
 *
 * @param   {string} str Input string to measure
 * @returns {number}     Length of the string
 */
const cjkLength = str => (
  // Simply replace all characters in the range with 'xx' and then return the new length.
  str.replace(charsRegex, 'xx').length
)

export default cjkLength
