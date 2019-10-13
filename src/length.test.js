// © 2019, MIT license

const { wideLength } = require('./length')

describe('Zenkaku-string', () => {
  describe('wideLength()', () => {
    describe('string length is correctly calculated when', () => {
      it('contains only non-wide characters', () => {
        expect(wideLength('asdf')).toBe(4)
        expect(wideLength('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBe(56)
      })
      it('contains Japanese kana', () => {
        expect(wideLength('this string ではカタカナがもちいる')).toBe(34)
        expect(wideLength('this string あいうえおヵヶゕゖあい')).toBe(34)
        expect(wideLength('this string ぁぃぅぇぉァィゥェォゞ')).toBe(34)
        expect(wideLength('ァ..ヾ')).toBe(6)
        expect(wideLength('this string ではカタカナがもちいる')).toBe(wideLength('this string 0011001100110011001100'))
        expect(wideLength('カタカナ')).toBe(8)
      })
      it('contains Japanese kanji', () => {
        expect(wideLength('this string ではカタカナが用いる')).toBe(32)
        expect(wideLength('this string ではカタカナが用いる')).toBe(wideLength('this string 00110011001100110011'))
        expect(wideLength('鳥')).toBe(2)
      })
      it('contains Japanese half-width katakana', () => {
        expect(wideLength('オハヨウゴザイマス')).toBe(18)
        expect(wideLength('ｵﾊﾖｳｺﾞｻﾞｲﾏｽ')).toBe(wideLength('00110011001')) // note: extra space for the dakuten
        expect(wideLength('ｵﾊﾖｳｺﾞｻﾞｲﾏｽ')).not.toBe(wideLength('オハヨウゴザイマス'))
      })
      it('contains CJK unified ideographs', () => {
        expect(wideLength('一龥')).toBe(4)
      })
      it('contains ideographic symbols and punctuation', () => {
        expect(wideLength('\u3000')).toBe(2) // ideographic space
        expect(wideLength('、。【】')).toBe(8)
      })
      it('contains Hangul [Compatibility] Jamo characters', () => {
        expect(wideLength('ᄀᄁᄂᄃᄄᄅᄆᄇ')).toBe(16)
        expect(wideLength('ㄱ..ㆎ')).toBe(6)
      })
      it('contains Hangul syllables', () => {
        expect(wideLength('가각갂갃간갅갆갇갈갉갊갋갌갍갎갏')).toBe(32)
        expect(wideLength('뀀뀁뀂뀃뀄뀅뀆뀇뀈뀉뀊뀋뀌뀍뀎뀏')).toBe(32)
        expect(wideLength('쀀쀁쀂쀃쀄쀅쀆쀇쀈쀉쀊쀋쀌쀍쀎쀏')).toBe(32)
        expect(wideLength('퀀퀁퀂퀃퀄퀅퀆퀇퀈퀉퀊퀋퀌퀍퀎퀏')).toBe(32)
      })
      it('contains kanbun characters', () => {
        expect(wideLength('㆐..㆟')).toBe(6)
        expect(wideLength('㆐㆑㆒㆓㆔㆕㆖㆗㆘㆙㆚㆛㆜㆝㆞㆟')).toBe(32)
      })
      it('contains parenthesized and circled characters', () => {
        expect(wideLength('㈀..㈜㈠..㉃㉠..㊰')).toBe(18)
      })
      it('contains other CJK characters (compatibility ideographs; enclosed letters and months)', () => {
        expect(wideLength('㍻㋀㏠豈鶴')).toBe(10)
      })
      it('contains other fullwidth symbols and punctuation', () => {
        expect(wideLength('︰..﹄﹉..﹒﹔..﹫！..～￠..￦')).toBe(30)
      })
    })
  })
})
