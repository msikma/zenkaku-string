// © 2019, MIT license

// TODO
const widePadStart = () => {
  return ''
}

// TODO
const widePadEnd = (str, targetLength, padChar = ' ') => {
  const a = wideLength(str)
  const b = str.length
  const c = targetLength - (a - b)
  return str.padEnd(c, padChar)
}

module.exports = {
  widePadEnd,
  widePadStart
}
