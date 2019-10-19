// © 2019, MIT license

// Zenkaku-string - Functions for CLI use for strings with fullwidth characters
//
// In CJK (Chinese, Japanese and Korean) text, "wide" or "fullwidth" characters
// are Unicode glyphs that get printed as two blocks wide instead of one when using
// a fixed-width font. Examples include ranges like the Japanese kana (あいうえお),
// full-width romaji (ＡＢＣＤＥ), and kanji/hanzi ideographs (e.g. 一所懸命).
//
// Since these characters are printed as two blocks, but count as one, this causes
// a problem when trying to accurately measure the length of the string for use
// in a fixed-width text environment such as the terminal--a string containing
// one fullwidth character will visually appear to be one character longer than
// its length value would indicate. This causes e.g. tabulated layouts to be broken.
//
// This library contains a set of functions designed to handle wide characters more
// gracefully in a terminal setting by treating them as though their length is 2.
//
// Source: https://unicode.org/reports/tr11/ - Report on East Asian width property

const { charRangeRe, charsWide, charsFullWidth } = require('./characters')
const { wideCharAt } = require('./charAt')
const { wideIndexOf, wideLastIndexOf } = require('./indexOf')
const { wideLength } = require('./length')
const { widePadStart, widePadEnd } = require('./pad')
const { wideSlice, wideSubstr, wideSubstring } = require('./sub')

module.exports = {
  wideCharAt,
  wideIndexOf,
  wideLastIndexOf,
  wideLength,
  widePadEnd,
  widePadStart,
  wideSlice,
  wideSubstr,
  wideSubstring,
  
  charRangeRe,
  charRange: {
    wide: charsWide,
    fullWidth: charsFullWidth
  }
}
