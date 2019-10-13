// © 2019, MIT license

const { charRangeReGlobal } = require('./characters')

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
 * @param   {bool}   pad      Add padding if the resulting string is smaller than expected
 * @param   {string} padChar  Character to use for padding the string to the correct length
 * @returns {string}          Sliced string
 */
const wideSlice = (str, startIdx, endIdx, pad = false, padChar = ' ') => {
  // Special case: return an empty string if start/end is the same,
  // or if end is smaller than start. String.prototype.slice() behaves the same.
  if (startIdx >= endIdx) return ''

  // Note: the charRangeReGlobal object is stateful.
  charRangeReGlobal.lastIndex = 0

  let match
  let startCount = 0
  let endCount = 0
  let startFound = false

  let count = 0
  let offset = 0

  // The 'target' holds the start or end index depending on which we're looking for.
  let target = startIdx

  console.log('----')
  console.log('start while', str, 'start', startIdx, 'end', endIdx)

  while (true) {
    // If we've equaled or passed the target index we can wrap up.
    if (offset >= target) {
      console.log(`offset (${offset}) >= target (${target})`, count)
      // If we've actually exceeded the target, don't count the last wide character
      // since our target comes before it.
      if (offset > target) {
        console.log('offset > target - removing 1 from count')
        count -= 1
      }

      // Either set up a search for the end index, or break if we got both.
      if (startFound === false) {
        startCount = count
        startFound = true
        target = endIdx
        console.log('  start found. count', startCount)
        continue
      }
      else {
        endCount = count
        console.log('  end found. count', endCount)
        break
      }
    }

    // Match up to the next wide character.
    match = charRangeReGlobal.exec(str)
    console.log('match', (match && match[0]), 'idx', match.index)

    // If no match, we've passed the last wide character in the string (or there are none).
    if (match == null) {
      console.log('no match!')
      if (startFound === false) {
        startCount = count
      }
      endCount = count
      break
    }

    // Add one matched wide character to the count.
    count += 1

    // Now check our "real" position inside the string, counting wide characters as two,
    // to see if we have found the correct start and end indices to slice with.
    // Actual check continues at the start of the loop - to account for an end position
    // that equals the start position.
    offset = match.index + count
    console.log('iteration end, count', count, 'offset', offset, 'idx', match.index)
  }

  // We can now calculate the "real" start and end offsets that will result in a string
  // of the desired length as though wide characters count for two.
  const sliced = str.slice(startIdx - startCount, endIdx - startCount - endCount)

  console.log(`original: ${str} (${startIdx}, ${endIdx}), final str: "${sliced}", length: "${sliced.length}", expected: "${Math.max(endIdx - startIdx, 0)}"`)
  console.log('---')

  // Final check: as mentioned in the docs, the string can be smaller than the expected
  // range if one or both of the offsets
  return sliced;
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
