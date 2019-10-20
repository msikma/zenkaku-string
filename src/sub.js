// © 2019, MIT license

const { charRangeRe, charRangeReGlobal } = require('./characters')
const { wideLength } = require('./length')

/**
 * Returns a sliced string with wide/fullwidth characters counting for two.
 *
 * This function has the same interface as String.prototype.slice(), except that the string
 * is the first argument and the begin and end indices come after. This function keeps wide
 * characters in mind when slicing. Unlike wideLength(), this function needs to consider where
 * inside the string the wide characters are (whether they are inside the given range or not).
 *
 * Since wide characters are two characters long, an indice can end up being right in the middle
 * of one. Since you can't split up a wide character in half, that means we need to either
 * include it or leave it out: this algorithm errs on the side of including halved wide
 * characters for the start index, and leaving them out for the end index, so that the resulting
 * string length will never exceed the expected range.
 *
 * However, that does mean the string length can be (at most) smaller than expected by 1.
 *
 * @param   {string} str      Input string to slice
 * @param   {number} startIdx Start index
 * @param   {number} endIdx   End index (optional; slices to the end of the string if omitted)
 * @param   {string} padChar  Character to use for padding the string to the correct length
 * @returns {string}          Sliced string
 */
const wideSlice = (str, startIdx = 0, endIdx = Infinity, padChar = ' ') => {
  // The following cases necessarily result in an empty string as output:
  // 1) when the end index is zero;
  if (endIdx === 0) return ''
  // 2) or when both numbers have the same sign and the end is smaller.
  if ((startIdx > 0) === (endIdx > 0) && startIdx > endIdx) return ''

  // If there are no wide characters in the input string at all,
  // the result must necessarily be identical to String.prototype.slice().
  if (!charRangeRe.test(str)) return str.slice(startIdx, endIdx)

  // Negative offsets must be normalized to positive values (so the algorithm can remain simple).
  // A slice range of e.g. (2, -2) is equal to (2, len - 2). Get the wide length to calculate this.
  const inLength = wideLength(str)
  const inStartIdx = Math.max(startIdx < 0 ? inLength + startIdx : startIdx, 0)
  const inEndIdx = Math.max(endIdx < 0 ? inLength + endIdx : endIdx, 0)

  // One last special case after normalization:
  if (inStartIdx >= inEndIdx) return ''

  // Now we'll iterate over the input using our regex that matches only wide characters.
  // Each wide character that is passed results in an offset to our slice range.
  //
  // For example: for wideSlice('あaえe', 0, 3), we expect 'あa' but need to offset
  // the end index by 1 to account for that one あ we passed.
  //
  // Both the start and end indices are offset by exactly the number of wide characters
  // we pass on the way to reaching them.

  let wideIdx = 0           // Current matched position index plus wide character count ("real" position).
  let wideCount = 0         // Number of wide characters found so far.

  let realStartIdx = null   // "Real" start index, keeping wide characters into account.
  let realEndIdx = null     // "Real" end index.

  let foundStart = false    // Whether the wide start/end indices have been found yet.
  let foundEnd = false
  let padStart = false      // Whether a padding character is needed at the start/end of the result string.
  let padEnd = false
  
  // Check if we can set the start index right away.
  realStartIdx = inStartIdx === 0 ? 0 : null
  foundStart = inStartIdx === 0 ? true : false
  
  // Note: global RegExp objects are stateful. Reset ours before use.
  charRangeReGlobal.lastIndex = 0

  while (true) {
    // Match up to the next wide character.
    match = charRangeReGlobal.exec(str)

    // If there's no match, we've passed the last wide character in the string.
    // Note: this will never happen on the first iteration because in that case the string did not
    // contain any wide characters to begin with--and if that is so, we would have exited before.
    if (!match) {
      if (!foundStart) {
        realStartIdx = inStartIdx - wideCount
        foundStart = true
      }
      if (!foundEnd) {
        realEndIdx = inEndIdx - wideCount
        foundEnd = true
      }
      break
    }

    // Current index inside the string, if wide characters were counted as two.
    wideIdx = match.index + wideCount

    if (!foundStart) {
      if (wideIdx >= inStartIdx) {
        realStartIdx = inStartIdx - wideCount
        foundStart = true
      }
      if (wideIdx + 1 === inStartIdx) {
        // If one off from the target, the start position is in the middle of a wide character and needs padding.
        //
        // Note: in actuality, the real start index is properly calculated as: inStartIdx - 1 - (wideCount - 1),
        // as we need to make room for a single padding character, and we need to subtract the one
        // "half" wide character that we cannot display. The following line is identical to that.
        realStartIdx = inStartIdx - wideCount
        foundStart = true
        padStart = true
      }
    }

    if (!foundEnd) {
      if (wideIdx >= inEndIdx) {
        realEndIdx = inEndIdx - wideCount
        foundEnd = true
      }
      if (wideIdx + 1 === inEndIdx) {
        // If one off from the target, the end position is in the middle of a wide character and needs padding.
        // Subtract the last "half" wide character so we have room for one padding character.
        realEndIdx = inEndIdx - (wideCount + 1)
        foundEnd = true
        padEnd = true
      }
    }

    // Check if we're done yet.
    if (foundStart && foundEnd) {
      break
    }

    // Passed one wide character.
    wideCount += 1
  }
  
  // Reset our RegExp object again as a courtesy to the next user.
  charRangeReGlobal.lastIndex = 0

  // Now that we have the correct range, offset appropriately to take wide characters into account,
  // we can slice the input by that range and add padding as needed to ensure the string's length is as expected.
  return (padStart ? padChar : '') + str.slice(realStartIdx, realEndIdx) + (padEnd ? padChar : '')
}

const wideSubstr = () => {
  return ''
}

const wideSubstring = () => {
  return ''
}

module.exports = {
  wideSlice,
  wideSubstr,
  wideSubstring
}
