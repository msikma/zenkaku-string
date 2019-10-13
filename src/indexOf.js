// © 2019, MIT license

const { charRangeRe } = require('./characters')

/**
 * Returns the index of a given search value, while counting wide characters as two.
 * 
 * Contains the code that drives both wideIndexOf() and wideLastIndexOf(); the 'returnFirstIdx'
 * bool determines which version runs. In the former case we return the first successful match,
 * and in the latter case the last one.
 * 
 * The range index value provided by the user must be a "real" index value--counting wide
 * characters as two.
 *
 * @param   {string} str            Input string to scan
 * @param   {string} searchVal      Search string
 * @param   {number} startIdx       Index at which to start the search, with wide characters counting as two
 * @param   {bool}   returnFirstIdx Whether to return the first index (for indexOf()) or the last index (for lastIndexOf())
 * @returns {number}                Index where the first occurrence of the search string is found; -1 if not found
 */
const _wideIndexSearch = (str, searchVal, startIdx, returnFirstIdx = true) => {
  // Helper booleans indicating whether we're looking to return the first or the last value.
  const returnLastIdx = !returnFirstIdx

  const inputLen = str.length
  const searchLen = searchVal.length

  // This is how far we'll search (no point in searching past input length minus search length).
  const endIdx = inputLen - searchLen

  // The candidate value we're planning on returning; contains an index number (from 'widePos').
  // When running indexOf(), we always return this value right away when we find a match.
  //
  // Conversely, lastIndexOf() keeps its matches and only returns the latest one when we've
  // reached the end, or when we've reached the start index; so technically, lastIndexOf() runs
  // *until* the start index is reached, rather than starting at it. This is because, technically,
  // lastIndexOf() is supposed to run end-to-start, but this function only runs start-to-end.
  let candidate = -1

  // String containing the next n characters of the input string,
  // where 'n' is the length of the search value.
  let buffer = ''

  let pos = 0          // Current position inside the string.
  let wide             // Whether the *first character* of the buffer is wide.
  let widePos = 0      // Current position plus wide character count ("real" position).

  while (true) {
    buffer = str.substr(pos, searchLen)
    wide = charRangeRe.test(buffer[0])
    
    // Check if we've found the search string yet.
    if (buffer === searchVal) {
      // If we're looking for the first match (indexOf()), return it if we've passed the start position.
      if (returnFirstIdx && widePos >= startIdx) {
        candidate = widePos
        break
      }

      // If we're looking for the last match (lastIndexOf()), set a new candidate value.
      // We won't return right away in that case; we'll check to see if we've passed the start index yet.
      if (returnLastIdx) {
        candidate = widePos
      }
    }

    // Stop if we've reached the end of the needed iterations; in any case, this happens when we've
    // reached the end of the string minus the length of the search string. If we're looking for
    // the last match, we're also done when the "real" position has reached the start index--since this
    // is normally where we'd start and search backwards from, so there's no point in going beyond it.
    if (pos >= endIdx || (returnLastIdx && (widePos >= startIdx))) {
      break
    }
    
    pos += 1
    widePos += 1 + Number(wide) // inc. by 2 if this is a wide character
  }

  return candidate
}

/**
 * Returns index of a given search value inside a string, counting wide characters as two.
 * 
 * This is a drop-in replacement for String.prototype.indexOf() and has the same interface:
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf>
 *
 * @param   {string} str       Input string to scan
 * @param   {string} searchVal Search string
 * @param   {number} startIdx  Index at which to start the search, with wide characters counting as two
 * @returns {number}           Index where the first occurrence of the search string is found; -1 if not found in the given range
 */
const wideIndexOf = (str, searchVal, startIdx = 0) => {
  return _wideIndexSearch(str, searchVal, startIdx, true)
}

/**
 * Returns last index of a given search value inside a string, counting wide characters as two.
 * 
 * This is essentially the same as wideIndexOf(), except that it runs end-to-begin.
 * 
 * This is a drop-in replacement for String.prototype.lastIndexOf() and has the same interface:
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf>
 *
 * @param   {string} str       Input string to scan
 * @param   {string} searchVal Search string
 * @param   {number} startIdx  Index at which to end the search, with wide characters counting as two
 * @returns {number}           Index where the last occurrence of the search string is found; -1 if not found in the given range
 */
const wideLastIndexOf = (str, searchVal, startIdx = Infinity) => {
  return _wideIndexSearch(str, searchVal, startIdx, false)
}

module.exports = {
  wideIndexOf,
  wideLastIndexOf
}
