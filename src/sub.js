// © 2019, MIT license

const { charRangeRe, charRangeReGlobal } = require('./characters')

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
const wideSlice = (str, startIdx, endIdx, padChar = '!') => {
  // TODO: convert startIdx to Number, add tests

  // Special case: return an empty string if start/end is the same,
  // or if end is smaller than start. String.prototype.slice() behaves the same.
  if (startIdx >= endIdx) return ''

  // Check if there are any wide characters in the input string.
  // If not, we can just use the regular slice methods.
  if (!charRangeRe.test(str)) {
    return str.slice(startIdx, endIdx)
  }

  // Note: the charRangeReGlobal object is stateful. Reset it before use.
  charRangeReGlobal.lastIndex = 0

  console.log('wideSlice start', { str, startIdx, endIdx });
  console.log('=')

  const expect2 = str.replace(charRangeReGlobal, 'XX')
  const expect = expect2.slice(startIdx, endIdx)

  charRangeReGlobal.lastIndex = 0


  let wideIdx = 0           // Current matched position index plus wide character count ("real" position).
  let wideCount = 0         // Number of wide characters found so far.

  let realStartIdx = null   // "Real" start index, keeping wide characters into account.
  let realEndIdx = null     // "Real" end index.

  let foundStart = false    // Whether the wide start index has been found yet.
  let foundEnd = false      // Whether the wide end index has been found yet.

  let hasStartPadding = false // Whether a padding character is needed at the start.
  let hasEndPadding = false   // Whether a padding character is needed at the end.
  
  // Check if we can set the start index right away.
  realStartIdx = startIdx === 0 ? 0 : null
  foundStart = startIdx === 0 ? true : false
  

  while (true) {
    // Match up to the next wide character.
    match = charRangeReGlobal.exec(str)

    

    // If there's no match, we've passed the last wide character in the string.
    if (!match) {
      console.log('no match end');
      if (!foundEnd) {
        realEndIdx = endIdx - wideCount
        foundEnd = true
      }
      break
    }


    wideIdx = match.index + wideCount

    console.log('match', {'char': match[0], wideIdx, 'exp': expect2.slice(0, wideIdx + 2) })

    if (!foundStart) {
      if (wideIdx >= startIdx) {
        console.log('sta = 1');
        realStartIdx = startIdx - wideCount
        foundStart = true
      }
      if (wideIdx + 1 === startIdx) {
        realStartIdx = startIdx - (wideCount) // for the padding!
        foundStart = true
        hasStartPadding = true
      }
    }

    if (!foundEnd) {
      if (wideIdx >= endIdx) {
        console.log('end = 1');
        realEndIdx = endIdx - wideCount
        foundEnd = true
      }
      if (wideIdx + 1 === endIdx) {
        realEndIdx = endIdx - (wideCount + 1) // for the padding!
        foundEnd = true
        hasEndPadding = true
      }
    }


    if (foundStart && foundEnd) {
      break
    }

    wideCount += 1
  }

  console.log('=')

  console.log('wideSlice end', { wideCount, startIdx, endIdx, realStartIdx, realEndIdx })

  
  
  console.log(expect, 'done');

  if (hasStartPadding) {
    return padChar + str.slice(realStartIdx, realEndIdx) + (hasEndPadding ? padChar : '')
  }
  return str.slice(realStartIdx, realEndIdx) + (hasEndPadding ? padChar : '')
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
