#!/usr/bin/env node

const { wideLength, widePadEnd } = require('../src')

// TODO: SIMPLIFY

const cols = [
  ['Lorem 蝶', 'ipsum 蜂', '年暮ぬ', '笠きて草鞋', 'はきながら', '-', '古池や', '蛙飛びこむ水の音'],
  ['あ', 'B', 'C', 'D', 'え', 'F', 'G', 'H'],
  ['Do not go', 'gentle', 'into that', 'good night', '-', 'As I', 'walked out', 'one evening']
]
const rows = cols[0].map((_, n) => cols.reduce((items, row) => [...items, row[n]], []))
const colWidths = cols.map(col => col.reduce((width, cell) => Math.max(width, wideLength(cell)), 0))

const logRow = row => cols.map((_, m) => widePadEnd(row[m], colWidths[m]))
const logHeader = rows => logRow(rows[0]).map(i => '-'.repeat(wideLength(i)))


console.log(logHeader(rows).join('|'))
rows.forEach(row => {
  console.log(logRow(row).join('|'))
})
console.log(logHeader(rows).join('|'))
