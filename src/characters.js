// © 2019, MIT license

// This file contains the Unicode ranges that terminals will display as wide characters.
// The ranges are defined by their East Asian Width classification; either W or FW.
// Source: https://www.unicode.org/reports/tr11-2/

const charsWide = [
  // ᄀ..ᇹ; HANGUL CHOSEONG KIYEOK..HANGUL JONGSEONG YEORINHIEUH
  `\u1100-\u11F9`,
  // 　..〿; IDEOGRAPHIC SPACE..IDEOGRAPHIC HALF FILL SPACE
  `\u3000-\u303F`,
  // ぁ..ゔ; HIRAGANA LETTER SMALL A..HIRAGANA LETTER VU
  // Note: extended from u3041-u3094 to u3041-u3096 to include HIRAGANA LETTER SMALL KA and HIRAGANA LETTER SMALL KE
  `\u3041-\u3096`,
  // ◦゙..ゞ; COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK..HIRAGANA VOICED ITERATION MARK
  `\u3099-\u309E`,
  // ァ..ヾ; KATAKANA LETTER SMALL A..KATAKANA VOICED ITERATION MARK
  `\u30A1-\u30FE`,
  // ㄱ..ㆎ; HANGUL LETTER KIYEOK..HANGUL LETTER ARAEAE
  `\u3131-\u318E`,
  // ㆐..㆟; IDEOGRAPHIC ANNOTATION LINKING MARK..IDEOGRAPHIC ANNOTATION MAN MARK
  `\u3190-\u319F`,
  // ㈀..㈜; PARENTHESIZED HANGUL KIYEOK..PARENTHESIZED HANGUL CIEUC U
  `\u3200-\u321C`,
  // ㈠..㉃; PARENTHESIZED IDEOGRAPH ONE..PARENTHESIZED IDEOGRAPH REACH
  `\u3220-\u3243`,
  // ㉠..㊰; CIRCLED HANGUL KIYEOK..CIRCLED IDEOGRAPH NIGHT
  `\u3260-\u32B0`,
  // ㋀..㍶; IDEOGRAPHIC TELEGRAPH SYMBOL FOR JANUARY..SQUARE PC
  `\u32C0-\u3376`,
  // ㍻..㏝; SQUARE ERA NAME HEISEI..SQUARE WB
  `\u337B-\u33DD`,
  // ㏠..㏾; IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY ONE..IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY THIRTY-ONE
  `\u33E0-\u33FE`,
  // 一..龥; (!CJK Ideograph, First!)..(!CJK Ideograph, Last!)
  `\u4E00-\u9FA5`,
  // 가..힣; (!Hangul Syllable, First!)..(!Hangul Syllable, Last!)
  `\uAC00-\uD7A3`,
  // ..; (!Private Use, First!)..(!Private Use, First!)
  `\uE000-\uE757`,
  // 豈..鶴; CJK COMPATIBILITY IDEOGRAPH-F900..CJK COMPATIBILITY IDEOGRAPH-FA2D
  `\uF900-\uFA2D`
]

const charsFullWidth = [
  // ︰..﹄; PRESENTATION FORM FOR VERTICAL TWO DOT LEADER..PRESENTATION FORM FOR VERTICAL RIGHT WHITE CORNER BRACKET
  `\uFE30-\uFE44`,
  // ﹉..﹒; DASHED OVERLINE..SMALL FULL STOP
  `\uFE49-\uFE52`,
  // ﹔..﹫; SMALL SEMICOLON..SMALL COMMERCIAL AT
  `\uFE54-\uFE6B`,
  // ！..～; FULLWIDTH EXCLAMATION MARK..FULLWIDTH TILDE
  `\uFF01-\uFF5E`,
  // ￠..￦; FULLWIDTH CENT SIGN..FULLWIDTH WON SIGN
  `\uFFE0-\uFFE6`
]

/** Regular expression matching characters in the W/FW ranges. */
const charRangeRe = new RegExp(`[${charsWide.join('')}${charsFullWidth.join('')}]`)

// Globally matching (stateful) version. Only used internally (not exported from the index).
const charRangeReGlobal = new RegExp(charRangeRe, 'g')

module.exports = {
  charRangeRe,
  charRangeReGlobal,
  charsFullWidth,
  charsWide
}
