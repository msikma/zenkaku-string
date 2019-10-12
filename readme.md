# zenkaku-string<small><small><small><br>String functions for handling [East Asian wide characters](http://www.unicode.org/reports/tr11-2/) in terminals</small></small></small>

In CJK (Chinese, Japanese and Korean) text, "wide" or "fullwidth" characters (or *zenkaku* in Japanese) are Unicode glyphs that get printed as two blocks wide instead of one when using a fixed-width font. Examples include ranges like the [Japanese kana](https://en.wikipedia.org/wiki/Kana) (あいうえお), [fullwidth romaji](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) (ＡＢＣＤＥ), and [kanji/hanzi ideographs](https://en.wikipedia.org/wiki/Kanji).

Since these characters are printed as two blocks, but count as one, this causes a problem when trying to accurately measure the length of the string for use in a fixed-width text environment such as the terminal—a string containing one fullwidth character will visually appear to be one character longer than its length value would indicate. This causes e.g. tabulated layouts to be broken.

To work around this, **the functions in this library treat wide characters in strings as though they have a length of 2.**

For a full list of the character ranges that are deemed to be "wide", see the [`characters.js` source](characters.js).

<center><b>⚠️ Note: this library is not ready to be used yet. ⚠️</b></center>

## Usage

The library is available as [`zenkaku-string` on npm]():

```
npm install --save zenkaku-string
```

It provides the following exports:

| Function name | Exact | Replacement for |
|:--------------|------|:----------------|
| <code><b>wideCharAt</b>(<i>string, index[, padChar]</i>)</code> | No † | <code>String.prototype.<b>charAt</b>(<i>index</i>)</code> |
| <code><b>wideIndexOf</b>(<i>string, searchValue[, fromIndex]</i>)</code> | Yes | <code>String.prototype.<b>indexOf</b>(<i>searchValue[, fromIndex]</i>)</code> |
| <code><b>wideLastIndexOf</b>(<i>string, searchValue[, fromIndex]</i>)</code> | Yes | <code>String.prototype.<b>lastIndexOf</b>(<i>searchValue[, fromIndex]</i>)</code> |
| <code><b>wideLength</b>(<i>string</i>)</code> | Yes | <code>String.prototype.<b>length</b></code> |
| <code><b>widePadEnd</b>(<i>string, targetLength[, padChar]</i>)</code> | Yes | <code>String.prototype.<b>padEnd</b>(<i>targetLength[, padChar]</i>)</code> |
| <code><b>widePadStart</b>(<i>string, targetLength[, padChar]</i>)</code> | Yes | <code>String.prototype.<b>padStart</b>(<i>targetLength[, padChar]</i>)</code> |
| <code><b>wideSlice</b>(<i>string, beginIndex[, endIndex[, padChar]]</i>)</code> | No ‡ | <code>String.prototype.<b>slice</b>(<i>beginIndex[, endIndex]</i>)</code> |
| <code><b>wideSubstr</b>(<i>string, start[, length[, padChar]]</i>)</code> | No ‡ | <code>String.prototype.<b>substr</b>(<i>start[, length]</i>)</code> |
| <code><b>wideSubstring</b>(<i>string, beginIndex[, endIndex[, padChar]]</i>)</code> | No ‡ | <code>String.prototype.<b>substring</b>(<i>beginIndex[, endIndex]</i>)</code> |

<small>†: returns a single padding character if second half of wide character is the result; see **¶ Ambiguity** below.</small><br />
<small>‡: pads start or end with a single padding character if half a wide character is included in resp. the start or end of the result string.</small>

#### Ambiguity (string padding)

The functions have the same interface as the ones they replace and behave the exact same—in principle, as there is one important exception: since individual wide characters count for two, that means it's possible to "slice them in half".

First, some well-defined examples:

```js
const { wideLength, wideSlice } = require('zenkaku-string')

// For visualization purposes, as the inner two kanji are wide characters,
// this string will be represented as "a1122b" where "11" and "22" are our kanji.

const farm = 'a牧場b' // a1122b

                                    // [    ]
console.log(wideLength(farm))       // a1122b → 6 (as "牧" and "場" count for 2)

                                    // [ ]---
console.log(wideSlice(farm, 0, 3))  // a1122b → "A牧"

                                    // ---[ ]
console.log(wideSlice(farm, 3, 6))  // a1122b → "場b"

                                    // -[  ]-
console.log(wideSlice(farm, 1, 5))  // a1122b → "牧場"
```

The following examples are problematic, however:

```js
                                    // [  ]--
console.log(wideSlice(farm, 0, 4))  // a1122b → "A牧 " ⚠️

                                    // --[  ]
console.log(wideSlice(farm, 2, 6))  // a1122b → " 場b" ⚠️
```

In these last two examples we're slicing a kanji character down the middle, and we can't return half a character.

Since **this library always aims to returns a string of a predictable length, it replaces half characters with a padding character.** The default padding character is a single space, but it can be specified as the last argument to each function.

#### Matching wide characters

If you need to process a string's wide characters in a custom way, you can import
the regular expression used to match them:

```js
const { wideCharsRe } = require('zenkaku-string')

console.log(wideCharsRe instanceof RegExp)  // true
```

The `wideCharsRe` RegExp object is structured like `new RegExp('[\u1100-\u11F9\u3000-\u303F .. etc. \uFFE0-\uFFE6]', 'g')`. It has no capture group and matches every wide character individually.

## Examples

See `examples/table.js` for an example script showing how this library can be used to display tables containing Latin characters and Japanese fullwidth characters. It's meant to run inside a terminal.

TODO: add simple code example.

## Sources

* [Unicode Standard Annex #11 - Report on East Asian Width property](https://unicode.org/reports/tr11/)
* [Unicode Technical Report #11](http://www.unicode.org/reports/tr11-2/) (contains a full list of W/FW character ranges)

## Copyright

© 2019, MIT license.
