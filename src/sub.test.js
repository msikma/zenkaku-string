// © 2019, MIT license

const { wideSlice } = require('./sub')

describe('Zenkaku-string', () => {
  describe('wideSlice()', () => {
    describe('string slicing behaves exactly as String.prototype.slice() when', () => {
      it('is given incorrect or nonsensical index values', () => {
        expect(wideSlice('asdf', 2)).toBe('asdf'.slice(2))
        expect(wideSlice('asdf', 2, 3)).toBe('asdf'.slice(2, 3))
        expect(wideSlice('asdf', 1234, -1234)).toBe('asdf'.slice(1234, -1234))
        expect(wideSlice('asdf', Infinity, -Infinity)).toBe('asdf'.slice(Infinity, -Infinity))
        expect(wideSlice('asdf', 'z')).toBe('asdf'.slice('z'))
        expect(wideSlice('asdf', null)).toBe('asdf'.slice(null))
        expect(wideSlice('asdf', null, null)).toBe('asdf'.slice(null, null))
        expect(wideSlice('asdf', Number, Array)).toBe('asdf'.slice(Number, Array))
        expect(wideSlice('asdf', () => console.log('hi'), Array)).toBe('asdf'.slice(() => console.log('hi'), Array))
        expect(wideSlice('asdf', 3, 2)).toBe('asdf'.slice(3, 2))
        expect(wideSlice('asdf', -2)).toBe('asdf'.slice(-2))
        expect(wideSlice('asdf', -2, -1)).toBe('asdf'.slice(-2, -1))
      })
    })

    describe('string slicing correctly takes wide characters into account when', () => {
      it('contains only regular characters', () => {
        expect(wideSlice('asdf', -2)).toBe('df')
        expect(wideSlice('asdf', -1)).toBe('f')
        expect(wideSlice('asdf', 2)).toBe('df')
        expect(wideSlice('asdf', 1)).toBe('sdf')
        expect(wideSlice('asdf', 1, -1)).toBe('sd')
        expect(wideSlice('asdf', 1, 0)).toBe('')
        expect(wideSlice('asdf', 1, 1)).toBe('')
        expect(wideSlice('asdf', 0, 2)).toBe('as')
        expect(wideSlice('asdf', 1, 2)).toBe('s')
        expect(wideSlice('asdf', 1, 3)).toBe('sd')
        expect(wideSlice('asdf', 2, 3)).toBe('d')
        expect(wideSlice('asdf', 500)).toBe('')
        expect(wideSlice('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 0, 5)).toBe('Lorem')
        expect(wideSlice('Aenean pulvinar porttitor ex, in lobortis quam vehicula vel. Maecenas est sem, faucibus et pulvinar in, euismod quis leo.', 61)).toBe('Maecenas est sem, faucibus et pulvinar in, euismod quis leo.')
      })

      it('contains only wide characters', () => {
        expect(wideSlice('あ', 2)).toBe('')
        expect(wideSlice('あ', 0)).toBe('あ')
        expect(wideSlice('あ', 0, 2)).toBe('あ')
        expect(wideSlice('あい', 0, 2)).toBe('あ')
        expect(wideSlice('あいえよ', 0, 2)).toBe('あ')
        expect(wideSlice('あいえよ', 2, 2)).toBe('')
        expect(wideSlice('あいえよ', 2, 4)).toBe('い')
        expect(wideSlice('あいえよ', 2, 6)).toBe('いえ')
        expect(wideSlice('あいえよ', 2, -2)).toBe('いえ')
        expect(wideSlice('あいえよ', -2, -2)).toBe('')
        expect(wideSlice('あいえよ', -2)).toBe('よ')
        expect(wideSlice('あいえよ', -4, 7)).toBe('え ')
      })

      it('contains a mixture of wide and regular characters', () => {
        expect(wideSlice('あ', 2)).toBe('')
        expect(wideSlice('あ', 0)).toBe('あ')
        expect(wideSlice('あ', 0, 2)).toBe('あ')
        expect(wideSlice('あaa', 0, 2)).toBe('あ')
        expect(wideSlice('あaaえaa', 0, 2)).toBe('あ')
        expect(wideSlice('あaaえaa', 2, 2)).toBe('')
        expect(wideSlice('あaaえaa', 2, 4)).toBe('aa')
        expect(wideSlice('あaaえaa', 2, 6)).toBe('aaえ')
        expect(wideSlice('aaあいえよ', -4, 8)).toBe('え')
      })
    })

    describe('string slicing correctly pads result strings when', () => {
      it('contains half a wide character at the start', () => {
        expect(wideSlice('あaaえaa', 1, 2)).toBe(' ')
        expect(wideSlice('あaaえaa', 1, 2, '!')).toBe('!')
        expect(wideSlice('あaaえaa', 1, 3, '!')).toBe('!a')
        expect(wideSlice('あaaえaa', 1, 4, '!')).toBe('!aa')
        expect(wideSlice('あaaえaa', 1, 6, '!')).toBe('!aaえ')
        expect(wideSlice('あaaえaa', 1, 7)).toBe(' aaえa')
        expect(wideSlice('あaaえaa', 5, 7)).toBe(' a')
        expect(wideSlice('あaaえaa', 5, 8)).toBe(' aa')
        expect(wideSlice('あaaえaaいう', 5, 8)).toBe(' aa')
        expect(wideSlice('あaaえaaいうiu', 5, 8)).toBe(' aa')
        expect(wideSlice('あaaえaaいうiu', 9, 10)).toBe(' ')
        expect(wideSlice('あaaえaaいうiu', 9, 12)).toBe(' う')
        expect(wideSlice('あaaえaaいうiu', 9, 13)).toBe(' うi')
        expect(wideSlice('あaaえaaいうiu', 11, 13)).toBe(' i')
        expect(wideSlice('あaaえaaいうiu', 11, 14)).toBe(' iu')
      })

      it('contains half a wide character at the end', () => {
        expect(wideSlice('あaaえaa', 2, 5)).toBe('aa ')
        expect(wideSlice('あaaえaa', 2, 5, '!')).toBe('aa!')
        expect(wideSlice('あaaえeeいiiうuu', 4, 5, '!')).toBe('!')
        expect(wideSlice('あaaえeeいiiうuu', 4, 5)).toBe(' ')
        expect(wideSlice('あaaえeeいiiうuu', 4, 9)).toBe('えee ')
        expect(wideSlice('あaaえeeいiiうuu', 4, 13)).toBe('えeeいii ')
      })

      it('contains half a wide character on both sides', () => {
        expect(wideSlice('あaaえeeいiiうuu', 5, 13)).toBe(' eeいii ')
      })
    })
  })
})
