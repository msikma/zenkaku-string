// © 2019, MIT license

const { wideCharAt } = require('./charAt')

describe('Zenkaku-string', () => {
  describe('wideCharAt()', () => {
    describe('an empty string is returned when', () => {
      it('is called with an index that is out of bounds', () => {
        expect(wideCharAt('abc', 10)).toBe('')
        expect(wideCharAt('abc', -10)).toBe('')
      })
    })

    describe('character at given index is returned when', () => {
      it('is points to a regular character', () => {
        expect(wideCharAt('abc', 0)).toBe('a')
        expect(wideCharAt('abc', 2)).toBe('c')
      })

      it('is points to a wide character', () => {
        expect(wideCharAt('abあ', 2)).toBe('あ')
        expect(wideCharAt('abえ', 2)).toBe('え')
        expect(wideCharAt('abえaa', 2)).toBe('え')
        expect(wideCharAt('abえaaい', 2)).toBe('え')
        expect(wideCharAt('abえaaいzz', 2)).toBe('え')
        expect(wideCharAt('abえaaいzz', 6)).toBe('い')
      })
    })

    describe('the padding character is returned for a given index when', () => {
      it('points to the second half of a wide character', () => {
        expect(wideCharAt('あは', 1)).toBe(' ')
      })
    })
  })
})
