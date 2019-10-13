// © 2019, MIT license

const { wideSlice } = require('./sub')

describe('Zenkaku-string', () => {
  describe('wideSlice()', () => {
    describe('string slicing correctly takes wide characters into account when', () => {
      it('contains only non-wide characters', () => {
        expect(wideSlice('asdf', 2)).toBe('asdf'.slice(2))
      })
    })

    describe('string slicing correctly pads result strings when', () => {
      it('contains wide partially inside the slice range', () => {
        expect(wideSlice('asdfあい asdfai あいasdf', 2, 8)).toBe('dfあい')
        expect(wideSlice('asdfあい asdfai あいasdf', 2, 12)).toBe('dfあい asd')
        expect(wideSlice('asdfあい asdfai あいasdf', 1, 3)).toBe('sdf')
      })
    })
  })
})
