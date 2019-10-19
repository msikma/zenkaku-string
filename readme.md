# zenkaku-string

**String functions for handling [East Asian wide characters](https://www.unicode.org/reports/tr11-2/) in terminals**

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

<table>
  <tr>
    <th align="left">Function name</th>
    <th align="left">Exact</th>
    <th align="left">Replacement for</th>
  </tr>

  <tr>
    <td><code><b>wideCharAt</b>(<i>str, idx[, padChar]</i>)</code></td>
    <td>No†</td>
    <td><code>"str".<b>charAt</b>(<i>idx</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>wideIndexOf</b>(<i>str, searchVal[, beginIdx]</i>)</code></td>
    <td>Yes</td>
    <td><code>"str".<b>indexOf</b>(<i>searchVal[, beginIdx]</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>wideLastIndexOf</b>(<i>str, searchVal[, beginIdx]</i>)</code></td>
    <td>Yes</td>
    <td><code>"str".<b>lastIndexOf</b>(<i>searchVal[, beginIdx]</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>wideLength</b>(<i>string</i>)</code></td>
    <td>Yes</td>
    <td><code>"str".<b>length</b></code></td>
  </tr>
  <tr>
    <td><code><b>widePadEnd</b>(<i>str, targetLength[, padChar]</i>)</code></td>
    <td>Yes</td>
    <td><code>"str".<b>padEnd</b>(<i>targetLength[, padChar]</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>widePadStart</b>(<i>str, targetLength[, padChar]</i>)</code></td>
    <td>Yes</td>
    <td><code>"str".<b>padStart</b>(<i>targetLength[, padChar]</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>wideSlice</b>(<i>str, beginIdx[, endIdx[, padChar]]</i>)</code></td>
    <td>No‡</td>
    <td><code>"str".<b>slice</b>(<i>beginIdx[, endIdx]</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>wideSubstr</b>(<i>str, beginIdx[, length[, padChar]]</i>)</code></td>
    <td>No‡</td>
    <td><code>"str".<b>substr</b>(<i>beginIdx[, length]</i>)</code></td>
  </tr>
  <tr>
    <td><code><b>wideSubstring</b>(<i>str, beginIdx[, endIdx[, padChar]]</i>)</code></td>
    <td>No‡</td>
    <td><code>"str".<b>substring</b>(<i>beginIdx[, endIdx]</i>)</code></td>
  </tr>

  <tr>
    <th align="left">Export name</th>
    <th align="left" colspan="2">Description</th>
  </tr>

  <tr>
    <td><code><b>charRangeRe</b></code></td>
    <td colspan="2"><code>RegExp</code> object used to match W/FW characters</td>
  </tr>
  <tr>
    <td><code><b>charRange.wide</b></code></td>
    <td colspan="2">Array of strings representing all wide character ranges</td>
  </tr>
  <tr>
    <td><code><b>charRange.fullWidth</b></code></td>
    <td colspan="2">Array of strings representing all fullwidth character ranges</td>
  </tr>
</table>

<small>†: returns a single padding character if the second half of wide character is the result; see **¶ Ambiguity** below.</small><br />
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
console.log(wideSlice(farm, 0, 4))  // a1122b → "A牧 " (!)

                                    // --[  ]
console.log(wideSlice(farm, 2, 6))  // a1122b → " 場b" (!)
```

In these last two examples we're slicing a kanji character down the middle, and we can't return half a character.

Since **this library always aims to returns a string of a predictable length, it replaces half characters with a padding character.** The default padding character is a single space (U+0020), but it can be specified as the last argument to each function.

#### Matching wide characters

If you need to process a string's wide characters in some other way, you can import the regex used to match them:

```js
const { charRangeRe } = require('zenkaku-string')

console.log(charRangeRe instanceof RegExp)  // true
```

The `charRangeRe` RegExp object is structured like `new RegExp('[\u1100-\u11F9\u3000-\u303F .. etc. \uFFE0-\uFFE6]')` and has no flags set.

If you need to match characters globally or use other flags, construct a new RegExp object:

```js
const charRangeReGlobal = new RegExp(charRangeRe, 'g')
charRangeReGlobal.lastIndex = 0  // remember that these are stateful!
```

For even more low level access, the actual W/FW character ranges used to construct this regex are also exported as the `charRange` object.

## Examples

See `examples/table.js` for an example script showing how this library can be used to display tables containing Latin characters and Japanese fullwidth characters. It's meant to run inside a terminal.

TODO: add simple code example.

## Sources

* [Unicode Standard Annex #11 - Report on East Asian Width property](https://unicode.org/reports/tr11/)
* [Unicode Technical Report #11](http://www.unicode.org/reports/tr11-2/) (contains a full list of W/FW character ranges)

## Copyright

© 2019, MIT license.
