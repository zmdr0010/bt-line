function makeMvRouteInfo(str, routeList) {
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const sx = Number(strSplit[1])
  const sy = Number(strSplit[2])
  const num = Number(strSplit[3])
  const list = []
  for (let i=4; i<strSplit.length; i++) {
    const routeUCode = strSplit[i]
    const routeSet = routeList.find(set => set.split('/')[0] === routeUCode)
    const pList = makePListFromRouteSet(routeSet)
    const last = pList[pList.length-1]
    list.push({
      routeSet: routeSet,
      pList: pList,
      lastP: last
    })
  }
  return {
    ucode: ucode,
    sx: sx,
    sy: sy,
    num: num,
    list: list
  }
}

function makePListFromRouteSet(str) {
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const eType = strSplit[1]
  const frame = Number(strSplit[2])
  const num = Number(strSplit[3])
  const mvInfoList = []
  for (let i=4; i<strSplit.length; i++) {
    const rStr = strSplit[i]
    const rStrSplit = rStr.split(',')
    const n = Number(rStrSplit[0])
    const piece = rStrSplit[1]
    const size = Number(rStrSplit[2])

    mvInfoList.push({
      n: n, str: piece, sizeList: [ { w: size, h: size } ]
    })
  }
  const lineList = makeLineInfoListFromMvPieceList(mvInfoList)
  const disInfo = makeLineDisInfo(lineList)
  const pList = makePListFromDisInfo(disInfo, frame, eType)
  return pList
}

// list
// [
//   {
//     n: 2,
//     str: '0213',
//     w: 100,
//     h: 100
//   }
// ]
function makeLineInfoListFromMvPieceList(list) {
  let result = []
  let sx = 0
  let sy = 0
  for (const info of list) {
    const lineList = makeLineInfoListFromMvPiece(info, sx, sy)
    const last = lineList[lineList.length-1]
    sx = last.p1.x
    sy = last.p1.y
    result = result.concat(lineList)
  }
  return result
}

// n = 2 : 2x2
// n = 3 : 3x3
// dr, dc -> w, h
//
// {
//   str: '0213', n: 2,
//   sizeList: [
//   { w: 100, h: 100 }
//  ]
// }
function makeLineInfoListFromMvPiece(info, sx=0, sy=0) {
  const strSplit = info.str.split('')
  const list = []
  let x = sx
  let y = sy

  for (let i=0; i<strSplit.length-1; i++) {
    const str = strSplit[i]
    const nextStr = strSplit[i+1]
    const index = Number(str)
    const nextIndex = Number(nextStr)
    const n = info.n
    const c = index % n
    const sizeI = i % info.sizeList.length
    const sizeInfo = info.sizeList[sizeI]
    const w = sizeInfo.w
    const h = sizeInfo.h
    const r = Math.floor(index / n)
    const nextC = nextIndex % n
    const nextR = Math.floor(nextIndex / n)
    const dc = nextC - c
    const dr = nextR - r
    // console.log(`c: ${c}, r: ${r}, nextC: ${nextC}, nextR: ${nextR}, dc: ${dc}, dr: ${dr}`)
    const mx = dc * w
    const my = dr * h
    const p0 = { x: x, y: y }
    x += mx
    y += my
    const p1 = { x: x, y: y }
    const distance = calcDistanceForLine(mx, my)
    list.push({ p0: p0, p1: p1, distance: distance, dx: mx, dy: my })
  }

  return list
}

function calcDistanceForLine(dx, dy) {
  return Math.sqrt(Math.abs(dx * dx) + Math.abs(dy * dy))
}

function makeLineDisInfo(lineList) {
  const list = []
  let sumDistance = 0
  for (const line of lineList) {
    const dx = line.p1.x - line.p0.x
    const dy = line.p1.y - line.p0.y
    const distance = calcDistanceForLine(dx, dy)
    // let check = `p0(${line.p0.x}, ${line.p0.y}), p1(${line.p1.x}, ${line.p1.y}), `
    // check += `dx: ${dx}, dy: ${dy},distance: ${distance}`//, fx: ${fx}`
    // console.log(check)
    list.push({
      // fx: fx,
      dx: dx,
      dy: dy,
      distance: distance,
      prevDistance: sumDistance,
      nextDistance: sumDistance + distance
    })

    sumDistance += distance
  }
  return {
    distance: sumDistance,
    list: list
  }
}

function makePListFromDisInfo(info, frm, eType='none', sx=0, sy=0) {
  const pList = []
  const dd = info.distance / frm
  for (let i=0; i < frm; i++) {
    let currentDis = (i+1) * dd
    if (eType !== 'none') currentDis = calcEasingDistance(eType, frm, i, info.distance)
    const p = getPFromDisInfo(info, currentDis, sx, sy)
    pList.push(p)
  }
  return pList
}

function getPFromDisInfo(info, currentDis, sx=0, sy=0) {
  let dx = 0
  let dy = 0
  for (const disInfo of info.list) {
    if (disInfo.nextDistance < currentDis) {
      dx += disInfo.dx
      dy += disInfo.dy
    } else if (disInfo.nextDistance >= currentDis && disInfo.prevDistance < currentDis) {
      const dis = currentDis - disInfo.prevDistance
      const rate = dis / disInfo.distance
      dx += disInfo.dx * rate
      dy += disInfo.dy * rate
    } else {
      break
    }
  }
  return { x: dx + sx, y: dy + sy }
}

// mv-piece-route-set
// ucode/num/n,mv-piece-str,size-w,size-h/...
function makeMvInfoListFromMvPieceRouteSet(str) {
  const list = []
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const num = Number(strSplit[1])
  for (let i=2; i<strSplit.length; i++) {
    const pcStr = strSplit[i]
    const pcStrSplit = pcStr.split(',')
    const n = Number(pcStrSplit[0])
    const piece = pcStrSplit[1]
    const w = Number(pcStrSplit[2])
    const h = Number(pcStrSplit[3])
    const info = { n: n, str: piece, sizeList: [ { w: w, h: h } ] }
    list.push(info)
    if (pcStrSplit.length > 4) {
      for (let j=4; j<pcStrSplit.length; j+=2) {
        info.sizeList.push({ w: Number(pcStrSplit[j]), h: Number(pcStrSplit[j+1]) })
      }
    }
  }
  return list
}

// setList
// mv-piece-route-set
// ucode/num/n,mv-piece-str,size-w,size-h/...
//
// str
// route-line-easing-set
// ucode/mv-piece-route-set-ucode/num/line index,frame,easing-type/ ...
function makePListFromRouteLineEasingSet(str, setList) {
  const pList = []
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const mvPcUcode = strSplit[1]
  const num = Number(strSplit[2])

  const rtSet = setList.find(st => st.split('/')[0] === mvPcUcode)
  const mvInfoList = makeMvInfoListFromMvPieceRouteSet(rtSet)
  const lineList = makeLineInfoListFromMvPieceList(mvInfoList)

  for (let i=3; i<strSplit.length; i++) {
    const eStr = strSplit[i]
    const eStrSplit = eStr.split(',')
    const index = Number(eStrSplit[0])
    const frame = Number(eStrSplit[1])
    const eType = eStrSplit[2]
    const line = lineList[index]
    const dd = line.distance / frame
    for (let f=0; f<frame; f++) {
      let currentDis = (f+1) * dd
      if (eType !== 'none') currentDis = calcEasingDistance(eType, frame, f, line.distance)

      const rate = currentDis / line.distance
      const x = line.dx * rate + line.p0.x
      const y = line.dy * rate + line.p0.y
      pList.push({ x: x, y: y })
    }
  }
  return pList
}

// mStr
// route-line-easing-mask-set
// by order of list
// ucode/num/frame,easing-type/ ...
//
// str
// mv-piece-route-set
// ucode/num/n,mv-piece-str,size-w,size-h/...
//
// ?? cycle / once / etc ... (line index: 0, 2, 4, 6 ??)
// default cycle
//
// isIndex = true: get easing-type by index
function makePListFromEasingMaskSet(str, mStr, isIndex=false) {
  const pList = []
  const mvInfoList = makeMvInfoListFromMvPieceRouteSet(str)
  const lineList = makeLineInfoListFromMvPieceList(mvInfoList)
  const mStrSplit = mStr.split('/')
  const ucode = mStrSplit[0]
  const num = Number(mStrSplit[1])
  const mList = []
  for (let i=2; i<mStrSplit.length; i++) {
    const eStr = mStrSplit[i]
    const eStrSplit = eStr.split(',')
    const frame = Number(eStrSplit[0])
    let eType = eStrSplit[1]
    if (isIndex) {
      eType = getEasingType(Number(eType))
    }
    mList.push({ frame: frame, eType: eType })
  }

  for (let i=0; i<lineList.length; i++) {
    const mIndex = i % mList.length
    const m = mList[mIndex]

    const frame = m.frame
    const eType = m.eType
    const line = lineList[i]
    const dd = line.distance / frame
    for (let f=0; f<frame; f++) {
      let currentDis = (f+1) * dd
      if (eType !== 'none') currentDis = calcEasingDistance(eType, frame, f, line.distance)

      const rate = currentDis / line.distance
      const x = line.dx * rate + line.p0.x
      const y = line.dy * rate + line.p0.y
      pList.push({ x: x, y: y })
    }
  }

  return pList
}

// str
// mv-piece-route-set
// ucode/num/n,mv-piece-str,size-w,size-h/...
//
// gmStr
// line-group-easing-mask-set: ex. p0-p1-p2, p3-p4, p5-p6-p7-p8 ...
// ucode/num/frame,easing-type,index-num / ...
// index += index-num
//
// ?? cycle / once / etc ... (line index: 0, 2, 4, 6 ??)
// default cycle
function makePListFromGroupEasingMaskSet(str, gmStr) {
  let pList = []
  const mvInfoList = makeMvInfoListFromMvPieceRouteSet(str)
  const lineList = makeLineInfoListFromMvPieceList(mvInfoList)
  // console.log(lineList)
  const gmStrSplit = gmStr.split('/')
  const ucode = gmStrSplit[0]
  const num = Number(gmStrSplit[1])
  const gmList = []
  for (let i=2; i<gmStrSplit.length; i++) {
    const eStr = gmStrSplit[i]
    const eStrSplit = eStr.split(',')
    const frame = Number(eStrSplit[0])
    const eType = eStrSplit[1]
    const iNum = eStrSplit[2]
    gmList.push({ frame: frame, eType: eType, iNum: iNum })
  }

  let count = 0
  let isEnd = false
  for (const gm of gmList) {
    // console.log('----------------')
    const lList = []
    for (let i=0; i<gm.iNum; i++) {
      const line = lineList[count]
      // console.log(line)
      lList.push({
        distance: line.distance, dx: line.dx, dy: line.dy,
        p0: { x: line.p0.x, y: line.p0.y },
        p1: { x: line.p1.x, y: line.p1.y }
      })
      count++
      if (count >= lineList.length) {
        isEnd = true
        break
      }
    }
    const disInfo = makeLineDisInfo(lList)

    // console.log(lList)
    // console.log(disInfo)
    const sp = lList[0].p0
    const ppList = makePListFromDisInfo(disInfo, gm.frame, gm.eType, sp.x, sp.y)
    // console.log(ppList)
    pList = pList.concat(ppList)
    if (isEnd) break
  }

  return pList
}

// str
// edit-p-set
// edit target-p by index (if not skip)
// ucode/num/target-i,type,dx,dy/...
// type: move / delete / add (if index > length => add to last)
function makePListFromEditP(str, pList) {
  const result = []
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const num = Number(strSplit[1])
  const editList = []
  for (let i=2; i<strSplit.length; i++) {
    const eStr = strSplit[i]
    const eStrSplit = eStr.split(',')
    const index = Number(eStrSplit[0])
    const type = eStrSplit[1]
    const dx = Number(eStrSplit[2])
    const dy = Number(eStrSplit[3])
    editList.push({ i: index, type: type, dx: dx, dy: dy })
  }

  for (const p of pList) {
    result.push({ x: p.x, y: p.y })
  }

  for (const e of editList) {
    let i = e.i
    console.log(e.type)
    if (e.type === 'add') {
      const p = { x: e.dx, y: e.dy }
      if (i >= result.length) {
        result.push(p)
      } else {
        result.splice(i, 0, p)
      }
    }
    if (e.type === 'move') {
      if (i < result.length) {
        const op = result[i]
        op.x += e.dx
        op.y += e.dy
      }
    }
    if (e.type === 'delete') {
      if (i < result.length) result.splice(e.i, 1)
    }
  }
  return result
}