## CJK Length

**Accurate length detection for strings containing wide characters**

In CJK (Chinese, Japanese and Korean) text, "wide" or "fullwidth" characters
are Unicode glyphs that get printed as two blocks wide instead of one when using
a fixed-width font. Examples include ranges like the [Japanese kana](https://en.wikipedia.org/wiki/Kana) (あいうえお),
[full-width romaji](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms) (ＡＢＣＤＥ), and [kanji/hanzi ideographs](https://en.wikipedia.org/wiki/Kanji) (一所懸命).

Since these characters are printed as two blocks, but count as one, this causes
a problem when trying to accurately measure the length of the string for use
in a fixed-width text environment such as the terminal—a string containing
one fullwidth character will visually appear to be one character longer than
its length value would indicate. This causes e.g. tabulated layouts to be broken.

This function scans a given string for occurrences of characters from the relevant
Unicode ranges to correctly determine the string's visual length.

### Usage

To use, replace property accesses such as `myString.length` with function calls
to `cjkLength(myString)`:

```js
const cjkLength = require('cjk-length').default

// Using cjkLength() to get a visually correct string length for fixed-width fonts:
// In this case, 'abcdeＡＢＣＤＥ' has length 10 but is displayed as though it's length 15.
const myString = 'abcdeＡＢＣＤＥ'
console.log(myString.length)      // 10
console.log(cjkLength(myString))  // 15

// Verifying that this longer string width value looks correct (in a terminal):
console.log(`.${myString}.`)                         // .abcdeＡＢＣＤＥ.
console.log(`.${'a'.repeat(myString.length)}.`)      // .aaaaaaaaaa.
console.log(`.${'a'.repeat(cjkLength(myString))}.`)  // .aaaaaaaaaaaaaaa.
```

If you need to process a string's wide characters in some other way, you can import
the regular expression used to match them:

```js
const { charsRegex } = require('cjk-length')

console.log(charsRegex instanceof RegExp)  // true
```

Note: `charsRegex` is a structured like `new RegExp('[\u1100-\u11F9\u3000-\u303F .. etc. \uFFE0-\uFFE6]', 'g')`.

### Sources

* [Unicode Standard Annex #11 - Report on East Asian Width property](https://unicode.org/reports/tr11/)
* [Unicode Technical Report #11](http://www.unicode.org/reports/tr11-2/) (contains a full list of W/FW character ranges)

### License

MIT license
