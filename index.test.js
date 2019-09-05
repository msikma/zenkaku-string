// © 2019, MIT license

const cjkLength = require('./index').default

describe('CJK Length', () => {
  describe('string length is correctly calculated (with wide characters counting for two) when', () => {
    it('contains only plain characters', () => {
      expect(cjkLength('asdf')).toBe(4)
      expect(cjkLength('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBe(56)
    })
    it('contains Japanese kana', () => {
      expect(cjkLength('this string ではカタカナがもちいる')).toBe(34)
      expect(cjkLength('this string あいうえおヵヶゕゖあい')).toBe(34)
      expect(cjkLength('this string ぁぃぅぇぉァィゥェォゞ')).toBe(34)
      expect(cjkLength('ァ..ヾ')).toBe(6)
      expect(cjkLength('this string ではカタカナがもちいる')).toBe(cjkLength('this string 0011001100110011001100'))
      expect(cjkLength('カタカナ')).toBe(8)
    })
    it('contains Japanese kanji', () => {
      expect(cjkLength('this string ではカタカナが用いる')).toBe(32)
      expect(cjkLength('this string ではカタカナが用いる')).toBe(cjkLength('this string 00110011001100110011'))
      expect(cjkLength('鳥')).toBe(2)
    })
    it('contains Japanese half-width katakana', () => {
      expect(cjkLength('オハヨウゴザイマス')).toBe(18)
      expect(cjkLength('ｵﾊﾖｳｺﾞｻﾞｲﾏｽ')).toBe(cjkLength('00110011001')) // note: extra space for the dakuten
      expect(cjkLength('ｵﾊﾖｳｺﾞｻﾞｲﾏｽ')).not.toBe(cjkLength('オハヨウゴザイマス'))
    })
    it('contains ideographic symbols and punctuation', () => {
      expect(cjkLength('\u3000')).toBe(2) // ideographic space
      expect(cjkLength('、。【】')).toBe(8)
    })
    it('contains ideographic symbols and punctuation', () => {
      expect(cjkLength('\u3000')).toBe(2) // ideographic space
      expect(cjkLength('、。【】')).toBe(8)
    })
    it('contains Hangul [Compatibility] Jamo characters', () => {
      expect(cjkLength('ᄀᄁᄂᄃᄄᄅᄆᄇ')).toBe(16)
      expect(cjkLength('ㄱ..ㆎ')).toBe(6)
    })
    it('contains kanbun characters', () => {
      expect(cjkLength('㆐..㆟')).toBe(6)
      expect(cjkLength('㆐㆑㆒㆓㆔㆕㆖㆗㆘㆙㆚㆛㆜㆝㆞㆟')).toBe(32)
    })
  })
})
