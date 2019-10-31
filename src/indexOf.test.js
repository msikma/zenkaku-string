// © 2019, MIT license

const { wideIndexOf, wideLastIndexOf } = require('./indexOf')

describe('Zenkaku-string', () => {
  describe('wideIndexOf()', () => {
    describe('index position is correctly calculated when', () => {
      it('contains only regular characters', () => {
        expect(wideIndexOf('abc', 'a')).toBe(0)
        expect(wideIndexOf('abc', 'b')).toBe(1)
        expect(wideIndexOf('abc', 'bc')).toBe(1)
        expect(wideIndexOf('abc', 'c')).toBe(2)
        expect(wideIndexOf('abc', 'd')).toBe(-1)

        expect(wideIndexOf('abcabc', 'a')).toBe(0)
        expect(wideIndexOf('abcabc', 'b')).toBe(1)
        expect(wideIndexOf('abcabc', 'bc')).toBe(1)
        expect(wideIndexOf('abcabc', 'c')).toBe(2)
        expect(wideIndexOf('abcabc', 'd')).toBe(-1)
      })

      it('contains only wide characters', () => {
        expect(wideIndexOf('あばよ', 'あ')).toBe(0)
        expect(wideIndexOf('あばよ', 'ば')).toBe(2)
        expect(wideIndexOf('あばよ', 'ばよ')).toBe(2)
        expect(wideIndexOf('あばよ', 'よ')).toBe(4)
        expect(wideIndexOf('あばよ', '！')).toBe(-1)

        expect(wideIndexOf('あばよあばよ', 'あ')).toBe(0)
      })

      it('contains a mixture of wide and regular characters', () => {
        expect(wideIndexOf('abcあばよxyz', 'a')).toBe(0)
        expect(wideIndexOf('abcあばよxyz', 'b')).toBe(1)
        expect(wideIndexOf('abcあばよxyz', 'c')).toBe(2)
        expect(wideIndexOf('abcあばよxyz', 'あ')).toBe(3)
        expect(wideIndexOf('abcあばよxyz', 'ば')).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'よ')).toBe(7)
        expect(wideIndexOf('abcあばよxyz', 'x')).toBe(9)
        expect(wideIndexOf('abcあばよxyz', 'y')).toBe(10)
        expect(wideIndexOf('abcあばよxyz', 'z')).toBe(11)
        expect(wideIndexOf('abcあばよxyz', '鳥')).toBe(-1)
        expect(wideIndexOf('abcあばよxyz', 'ab')).toBe(0)
        expect(wideIndexOf('abcあばよxyz', 'abc')).toBe(0)
        expect(wideIndexOf('abcあばよxyz', 'bc')).toBe(1)
        expect(wideIndexOf('abcあばよxyz', 'cあ')).toBe(2)
        expect(wideIndexOf('abcあばよxyz', 'cあばよ')).toBe(2)
        expect(wideIndexOf('abcあばよxyz', 'あばよ')).toBe(3)
        expect(wideIndexOf('abcあばよxyz', 'ばよ')).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'ばよx')).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'ばよxy')).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'よxy')).toBe(7)
        expect(wideIndexOf('abcあばよxyz', 'よxyz')).toBe(7)
        expect(wideIndexOf('abcあばよxyz', 'よxyzz')).toBe(-1)

        expect(wideIndexOf('abcあばよxyzabcあばよxyz', 'a')).toBe(0)
      })

      it('is called with a start index', () => {
        expect(wideIndexOf('abc', 'a', -5)).toBe(0)
        expect(wideIndexOf('abc', 'a', -Infinity)).toBe(0)
        expect(wideIndexOf('abc', 'a', Infinity)).toBe(-1)
        expect(wideIndexOf('abc', 'a', 0)).toBe(0)
        expect(wideIndexOf('abc', 'ab', 0)).toBe(0)
        expect(wideIndexOf('abc', 'a', 1)).toBe(-1)
        expect(wideIndexOf('abc', 'ab', 1)).toBe(-1)

        expect(wideIndexOf('abcabc', 'a', 0)).toBe(0)
        expect(wideIndexOf('abcabc', 'ab', 0)).toBe(0)
        expect(wideIndexOf('abcabc', 'a', 1)).toBe(3)
        expect(wideIndexOf('abcabc', 'ab', 1)).toBe(3)
        expect(wideIndexOf('abcabcabc', 'a', 0)).toBe(0)
        expect(wideIndexOf('abcabcabc', 'ab', 0)).toBe(0)
        expect(wideIndexOf('abcabcabc', 'a', 1)).toBe(3)
        expect(wideIndexOf('abcabcabc', 'ab', 1)).toBe(3)
        expect(wideIndexOf('abcabcabc', 'a', 4)).toBe(6)
        expect(wideIndexOf('abcabcabc', 'ab', 4)).toBe(6)

        expect(wideIndexOf('あばよ', 'あ', 0)).toBe(0)
        expect(wideIndexOf('あばよ', 'あ', 1)).toBe(-1)
        expect(wideIndexOf('あばよ', 'ば', 1)).toBe(2)
        expect(wideIndexOf('あばよ', 'ば', 2)).toBe(2)
        expect(wideIndexOf('あばよ', 'ば', 3)).toBe(-1)

        expect(wideIndexOf('abcあばよxyz', 'a', 0)).toBe(0)
        expect(wideIndexOf('abcあばよxyz', 'a', 1)).toBe(-1)
        expect(wideIndexOf('abcあばよxyza', 'a', 0)).toBe(0)
        expect(wideIndexOf('abcあばよxyza', 'a', 1)).toBe(12)
        expect(wideIndexOf('abcあばよxyz', 'あ', 0)).toBe(3)
        expect(wideIndexOf('abcあばよxyz', 'ば', 0)).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'x', 0)).toBe(9)
        expect(wideIndexOf('abcあばよxyz', 'y', 0)).toBe(10)
        expect(wideIndexOf('abcあばよxyz', 'あ', 1)).toBe(3)
        expect(wideIndexOf('abcあばよxyz', 'ば', 1)).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'x', 1)).toBe(9)
        expect(wideIndexOf('abcあばよxyz', 'y', 1)).toBe(10)
        expect(wideIndexOf('abcあばよxyz', 'あ', 3)).toBe(3)
        expect(wideIndexOf('abcあばよxyz', 'あ', 4)).toBe(-1)
        expect(wideIndexOf('abcあばよxyz', 'ば', 4)).toBe(5)
        expect(wideIndexOf('abcあばよxyz', 'x', 4)).toBe(9)
        expect(wideIndexOf('abcあばよxyz', 'y', 4)).toBe(10)
        expect(wideIndexOf('abcあばよxyz', 'あ', 6)).toBe(-1)
        expect(wideIndexOf('abcあばよxyz', 'ば', 6)).toBe(-1)
        expect(wideIndexOf('abcあばよxyz', 'x', 6)).toBe(9)
        expect(wideIndexOf('abcあばよxyz', 'y', 6)).toBe(10)
      })
    })
  })

  describe('wideLastIndexOf()', () => {
    describe('last index position is correctly calculated when', () => {
      it('contains only regular characters', () => {
        expect(wideLastIndexOf('abc', 'z')).toBe(-1)
        expect(wideLastIndexOf('abc', 'a')).toBe(0)
        expect(wideLastIndexOf('abc', 'ab')).toBe(0)
        expect(wideLastIndexOf('abc', 'b')).toBe(1)
        expect(wideLastIndexOf('abcabc', 'a')).toBe(3)
        expect(wideLastIndexOf('abcabc', 'ab')).toBe(3)
        expect(wideLastIndexOf('abcabc', 'b')).toBe(4)
        expect(wideLastIndexOf('abcabc', 'bc')).toBe(4)
        expect(wideLastIndexOf('abcabcabc', 'a')).toBe(6)
        expect(wideLastIndexOf('abcabcabc', 'b')).toBe(7)
        expect(wideLastIndexOf('abcabcabc', 'abc')).toBe(6)
      })

      it('contains only wide characters', () => {
        expect(wideLastIndexOf('あばよ', 'a')).toBe(-1)
        expect(wideLastIndexOf('あばよ', 'や')).toBe(-1)
        expect(wideLastIndexOf('あばよ', 'あや')).toBe(-1)
        expect(wideLastIndexOf('あばよ', 'あ')).toBe(0)
        expect(wideLastIndexOf('あばよ', 'あば')).toBe(0)
        expect(wideLastIndexOf('あばよ', 'ば')).toBe(2)
        expect(wideLastIndexOf('あばよあばよ', 'あ')).toBe(6)
        expect(wideLastIndexOf('あばよあばよ', 'あば')).toBe(6)
        expect(wideLastIndexOf('あばよあばよ', 'あばよ')).toBe(6)
        expect(wideLastIndexOf('あばよあばよ', 'ば')).toBe(8)
        expect(wideLastIndexOf('あばよあばよ', 'ばよ')).toBe(8)
      })

      it('contains a mixture of wide and regular characters', () => {
        expect(wideLastIndexOf('abcあばよxyz', 'や')).toBe(-1)
        expect(wideLastIndexOf('abcあばよxyz', 'よxyza')).toBe(-1)
        expect(wideLastIndexOf('abcあばよxyz', 'a')).toBe(0)
        expect(wideLastIndexOf('abcあばよxyz', 'ab')).toBe(0)
        expect(wideLastIndexOf('abcあばよxyz', 'abc')).toBe(0)
        expect(wideLastIndexOf('abcあばよxyz', 'abcあ')).toBe(0)
        expect(wideLastIndexOf('abcあばよxyz', 'b')).toBe(1)
        expect(wideLastIndexOf('abcあばよxyz', 'c')).toBe(2)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'za')).toBe(11)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'a')).toBe(12)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'b')).toBe(13)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'あ')).toBe(15)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'あばよ')).toBe(15)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'あばよx')).toBe(15)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'あばよxy')).toBe(15)
        expect(wideLastIndexOf('abcあばよxyzabcあばよxyz', 'あばよxyz')).toBe(15)
      })

      it('is called with a start index', () => {
        expect(wideLastIndexOf('abc', 'a', -1)).toBe(0)
        expect(wideLastIndexOf('abc', 'a', 0)).toBe(0)
        expect(wideLastIndexOf('abc', 'b', 0)).toBe(-1)
        expect(wideLastIndexOf('abc', 'c', 0)).toBe(-1)
        expect(wideLastIndexOf('abc', 'c', 2)).toBe(2)
        expect(wideLastIndexOf('abc', 'c', 200)).toBe(2)
        expect(wideLastIndexOf('abc', 'c', Infinity)).toBe(2)
        expect(wideLastIndexOf('abc', 'c', -Infinity)).toBe(-1)
        expect(wideLastIndexOf('abcabc', 'c', Infinity)).toBe(5)
      })
    })
  })
})
