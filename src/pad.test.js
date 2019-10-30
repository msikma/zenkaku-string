// © 2019, MIT license

const { widePadStart, widePadEnd } = require('./pad')

describe('Zenkaku-string', () => {
  describe('widePadStart()', () => {
    describe('string is left-padded to the correct length when', () => {
      it('contains only regular characters', () => {
        expect(widePadStart('abc', 5, '-')).toBe('--abc')
        expect(widePadStart('abc', 15, '-')).toBe('------------abc')
      })
      it('contains only wide characters', () => {
        expect(widePadStart('あ', 2, '-')).toBe('あ')
        expect(widePadStart('あ', 3, '-')).toBe('-あ')
      })
      it('contains a mixture of wide and regular characters', () => {
        expect(widePadStart('あz', 2, '-')).toBe('あz')
        expect(widePadStart('あz', 3, '-')).toBe('あz')
        expect(widePadStart('あz', 4, '-')).toBe('-あz')
      })
      it('is called with a negative length argument', () => {
        expect(widePadStart('ああ', -5)).toBe('ああ')
        expect(widePadStart('ああ', -15)).toBe('ああ')
      })
    })
  })

  describe('widePadEnd()', () => {
    describe('string is right-padded to the correct length when', () => {
      it('contains only regular characters', () => {
        expect(widePadEnd('abc', 5, '-')).toBe('abc--')
        expect(widePadEnd('abc', 15, '-')).toBe('abc------------')
      })
      it('contains only wide characters', () => {
        expect(widePadEnd('あ', 2, '-')).toBe('あ')
        expect(widePadEnd('あ', 3, '-')).toBe('あ-')
      })
      it('contains a mixture of wide and regular characters', () => {
        expect(widePadEnd('あz', 2, '-')).toBe('あz')
        expect(widePadEnd('あz', 3, '-')).toBe('あz')
        expect(widePadEnd('あz', 4, '-')).toBe('あz-')
      })
      it('is called with a negative length argument', () => {
        expect(widePadEnd('ああ', -5)).toBe('ああ')
        expect(widePadEnd('ああ', -15)).toBe('ああ')
      })
    })
  })
})
