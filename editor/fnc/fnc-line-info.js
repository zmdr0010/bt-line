// drtLineSet: direct line set
// uCode/w/h/x/y/listNum/width/color/x,y,x,y ... /width/color ... (dw list) /childNum/childUCode/w/h ... (child list)
function createLineInfoFromDrtLineSet(set) {
  const setSplit = set.split('/')
  const line = createLineInfoFromDrtLineSplit(setSplit, 0)
  return line.lineInfo
}

function createLineInfoFromDrtLineSplit(split, startI) {
  const uCode = split[startI]
  const w = Number(split[startI + 1])
  const h = Number(split[startI + 2])
  const x = Number(split[startI + 3])
  const y = Number(split[startI + 4])
  const listNum = Number(split[startI + 5])
  const list = []
  const listLength = listNum * 3 + 6 + startI
  for (let i=6 + startI; i<listLength; i+=3) {
    const width = Number(split[i])
    const color = split[i+1]
    const str = split[i+2]
    const strSplit = str.split(',')
    const pList = []
    for (let j=0; j<strSplit.length; j+=2) {
      const x = Number(strSplit[j])
      const y = Number(strSplit[j+1])
      pList.push({ x: x, y: y })
    }
    list.push({ width: width, color: color, list: pList})
  }
  const child = []
  let nextI = listLength
  if (split.length >= listLength) {
    const childNum = Number(split[listLength])
    nextI = listLength + 1
    for (let i=0; i<childNum; i++) {
      const cLine = createLineInfoFromDrtLineSplit(split, nextI)
      child.push(cLine.lineInfo)
      nextI = cLine.nextI
    }
  }
  return {
    lineInfo: {
      uCode: uCode,
      w: w,
      h: h,
      x: x,
      y: y,
      list: list,
      child: child
    },
    nextI: nextI
  }
}

// simple line str set -> create lineInfo from spLineSet
// (w, h <= 0) -> calculate bound
// width: 0: (fill), 1 ~ n: (stroke), lineWidth
// uCode/w/h/listNum/width/color/x,y,x,y ... /width/color ... (list)
function createSimpleLineInfo(set) {
  const setSplit = set.split('/')
  const uCode = setSplit[0]
  const w = Number(setSplit[1])
  const h = Number(setSplit[2])
  const listNum = Number(setSplit[3])
  const list = []
  for (let i=4; i<setSplit.length; i+=3) {
    const width = Number(setSplit[i])
    const color = setSplit[i+1]
    const str = setSplit[i+2]
    const strSplit = str.split(',')
    const pList = []
    for (let j=0; j<strSplit.length; j+=2) {
      const x = Number(strSplit[j])
      const y = Number(strSplit[j+1])
      pList.push({ x: x, y: y })
    }
    list.push({
      width: width,
      color: color,
      list: pList
    })
  }
  return {
    uCode: uCode,
    w: w, h: h, x: 0, y: 0,
    list: list,
    child: []
  }
}

// spLineSet -> lineInfo
// uCode/w/h/num/spLineUCode/x/y/spLineUCode/x/y ... (list)
function createSimpleLineInfoFromPlaceSet(set, spLineSetList) {
  const setSplit = set.split('/')
  const uCode = `${setSplit[0]}-merge`
  const w = Number(setSplit[1])
  const h = Number(setSplit[2])
  const num = Number(setSplit[3])
  const child = []
  for (let i=4; i<setSplit.length; i+=3) {
    const lUCode = setSplit[i]
    const lx = Number(setSplit[i+1])
    const ly = Number(setSplit[i+2])
    const lSet = spLineSetList.find(s => s.split('/')[0] === lUCode)
    const line = createSimpleLineInfo(lSet)
    line.x = lx
    line.y = ly
    child.push(line)
  }
  const mrgLine = mergeSpLineInfo(uCode, child)
  // mrgLine.w = w
  // mrgLine.h = h
  return mrgLine
}

// spLineSet -> lineInfo
// uCode/w/h/num/spLineUCode/x/y/spLineUCode/x/y ... (list)
function createLineInfoFromPlaceSet(set, spLineSetList) {
  const setSplit = set.split('/')
  const uCode = setSplit[0]
  const w = Number(setSplit[1])
  const h = Number(setSplit[2])
  const num = Number(setSplit[3])
  const child = []
  for (let i=4; i<setSplit.length; i+=3) {
    const lUCode = setSplit[i]
    const lx = Number(setSplit[i+1])
    const ly = Number(setSplit[i+2])
    const lSet = spLineSetList.find(s => s.split('/')[0] === lUCode)
    const line = createSimpleLineInfo(lSet)
    line.x = lx
    line.y = ly
    child.push(line)
  }
  return {
    uCode: uCode,
    w: w, h: h, x: 0, y: 0,
    list: [],
    child: child
  }
}

// info: lineInfo
function calculateLineInfoSize(info) {
  let minX = 10000000
  let maxX = -10000000
  let minY = 10000000
  let maxY = -10000000

  for (const dw of info.list) {
    for (const p of dw.list) {
      minX = Math.min(minX, p.x)
      maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y)
      maxY = Math.max(maxY, p.y)
    }
  }
  // info.w = Math.abs(maxX - minX)
  // info.h = Math.abs(maxY - minY)
  console.log(`minX: ${minX}, minY: ${minY}`)
  info.w = Math.abs(maxX - minX) + minX
  info.h = Math.abs(maxY - minY) + minY

  for (const c of info.child) calculateLineInfoSize(c)
}

// info: spLineInfo
// (w, h <= 0) -> calculate bound
// width: 0: (fill), 1 ~ n: (stroke), lineWidth
// uCode/w/h/listNum/width/color/x,y,x,y ... /width/color ... (list)
function createSimpleLineStrSet(info) {
  let str = `${info.uCode}/${info.w}/${info.h}/${info.list.length}`
  for (const dw of info.list) {
    str += `/${dw.width}/${dw.color}/`
    let pStr = ''
    for (const p of dw.list) {
      pStr += `${p.x},${p.y},`
    }
    pStr = pStr.slice(0, pStr.length-1)
    str += pStr
  }
  return str
}

// info: lineInfo
function fitSimpleLineInfo(info) {
  let minX = 10000000
  let minY = 10000000

  for (const dw of info.list) {
    for (const p of dw.list) {
      minX = Math.min(minX, p.x)
      minY = Math.min(minY, p.y)
    }
  }

  const eList = []
  for (const dw of info.list) {
    for (const p of dw.list) {
      const ei = eList.indexOf(p)
      if (ei < 0) { // shape pos is duplicate
        eList.push(p)
        p.x -= minX
        p.y -= minY
      }
    }
  }
  calculateLineInfoSize(info)
}