function lineInfoListToStrSet(list, ucode) {
  const num = list.length
  let str = ''
  for (const line of list) {
    str += `/${line.p0.x},${line.p0.y},${line.p1.x},${line.p1.y}`
  }
  return `${ucode}/${num}${str}`
}

function lineSetToLineInfoList(str) {
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const num = Number(strSplit[1])
  const list = []
  for (let i=2; i<strSplit.length; i++) {
    const lineStr = strSplit[i]
    const lineStrSplit = lineStr.split(',')
    const x0 = Number(lineStrSplit[0])
    const y0 = Number(lineStrSplit[1])
    const x1 = Number(lineStrSplit[2])
    const y1 = Number(lineStrSplit[3])
    list.push({ p0: { x: x0, y: y0 }, p1: { x: x1, y: y1 } })
  }
  return list
}

// ucode/num/x,y/x,y/...
function pListToPSet(list, ucode) {
  const num = list.length
  let str = ''
  for (const p of list) {
    str += `/${p.x},${p.y}`
  }
  return `${ucode}/${num}${str}`
}

// ucode/num/x,y/x,y/...
function pSetToPList(str) {
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const num = Number(strSplit[1])
  const list = []
  for (let i=2; i<strSplit.length; i++) {
    const pStr = strSplit[i]
    const pStrSplit = pStr.split(',')
    const x = Number(pStrSplit[0])
    const y = Number(pStrSplit[1])
    list.push({ x: x, y: y })
  }
  return list
}

// list: pList
//    [ { x: 0, y: 0 } ]
function calcPListBound(list, sx=0, sy=0) {
  const MAX_INT = Number.MAX_SAFE_INTEGER
  let minX = MAX_INT
  let maxX = -1 * MAX_INT
  let minY = MAX_INT
  let maxY = -1 * MAX_INT
  for (const p of list) {
    const x = p.x + sx
    const y = p.y + sy
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }
  // console.log(`minX: ${minX}, maxX: ${maxX}, minY: ${minY}, maxY: ${maxY}`)
  const w = maxX - minX
  const h = maxY - minY
  return {
    w: w, h: h,
    min: { x: minX, y: minY },
    max: { x: maxX, y: maxY }
  }
}