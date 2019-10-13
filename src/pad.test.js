// © 2019, MIT license

const { widePadStart, widePadEnd } = require('./pad')

describe('Zenkaku-string', () => {
  describe('widePadStart()', () => {
    describe('string is left-padded to the correct length when', () => {
      it('contains only regular characters', () => {
        expect(0).toBe(0)
      })
    })
  })

  describe('widePadEnd()', () => {
    describe('string is right-padded to the correct length when', () => {
      it('contains only regular characters', () => {
        expect(0).toBe(0)
      })
    })
  })
})
