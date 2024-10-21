// uCode/column/row/rawNum/rw rw rw  ... list
function createRawInfo(set) {
  const split = set.split('/')
  const uCode = split[0]
  const column = Number(split[1])
  const row = Number(split[2])
  const rawNum = Number(split[3])
  const rawStr = split[4]
  const rawSplit = rawStr.split('')
  const raw = []
  for (const str of rawSplit) raw.push(Number(str))
  return {
    uCode: uCode,
    row: row,
    column: column,
    raw: raw,
    rawNum: rawNum
  }
}

function createRawStrSet(info) {
  return `${info.uCode}/${info.column}/${info.row}/${info.rawNum}/${info.raw.join('')}`
}