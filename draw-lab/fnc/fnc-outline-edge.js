// check p.i
// has p -> i-1: left, i+1: bottom -> rightTop
// has p -> i-1: bottom, i+1: left -> inside rightTop
// has p -> i-1: top, i+1: left -> right bottom
// has p -> i-1: left, i+1: top -> inside right bottom
// has p -> i-1: bottom, i+1: right -> leftTop
// has p -> i-1: right, i+1: bottom -> inside leftTop
// has p -> i-1: right, i+1: top -> leftBottom
// has p -> i-1: top, i+1: right -> inside leftBottom
// start is always leftTop
// in list: start(0) = last(length-1), list.pop -> edit -> last set by first and push
// start(0) - 1: length-1(last-1), length-1(last-1) + 1: start(0)
function editPListEdgeInOutSide(pList, szw, szh, type='inout', editType='add-p') {
  const iPList = []
  for (let i=0; i<pList.length-1; i++) {
    const p = pList[i]
    iPList.push({ i:i, x: p.x, y: p.y})
  }
  const list = []
  for (const p of iPList) {
    const left = iPList.find(pt => p.x - szw === pt.x && p.y === pt.y)
    const right = iPList.find(pt => p.x + szw === pt.x && p.y === pt.y)
    const top = iPList.find(pt => p.y - szh === pt.y && p.x === pt.x)
    const bottom = iPList.find(pt => p.y + szh === pt.y && p.x === pt.x)
    const rp = { x: p.x, y: p.y }
    let prev = p.i - 1
    let next = p.i + 1
    if (prev < 0) prev = iPList.length - 1
    if (next > iPList.length - 1) next = 0
    const prevP = iPList[prev]
    const nextP = iPList[next]
    const addPList = []
    const mx = szw * 0.5
    const my = szh * 0.5
    const mmx = mx * 0.5 * 0.5
    const mmy = my * 0.5 * 0.5
    const interval = 1
    if (type === 'inout' || type === 'out') {
      if (left && bottom && prevP.i === left.i && nextP.i === bottom.i) { // rightTop
        if (editType === 'add-p') {
          const addP0 = { x: p.x - mx, y: p.y }
          const addP1 = { x: p.x, y: p.y + my }
          rp.x -= mmx
          rp.y += mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x -= mx
          rp.y += my
        }
        if (editType === 'curve') {
          const list = createPListCurve(left, bottom, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }
      if (top && left && prevP.i === top.i && nextP.i === left.i) { // rightBottom
        if (editType === 'add-p') {
          const addP0 = { x: p.x, y: p.y - my }
          const addP1 = { x: p.x - mx, y: p.y }
          rp.x -= mmx
          rp.y -= mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x -= mx
          rp.y -= my
        }
        if (editType === 'curve') {
          const list = createPListCurve(top, left, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }
      if (bottom && right && prevP.i === bottom.i && nextP.i === right.i) { // leftTop
        if (editType === 'add-p') {
          const addP0 = { x: p.x, y: p.y + my }
          const addP1 = { x: p.x + mx, y: p.y }
          rp.x += mmx
          rp.y += mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x += mx
          rp.y += my
        }
        if (editType === 'curve') {
          const list = createPListCurve(bottom, right, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }
      if (right && top && prevP.i === right.i && nextP.i === top.i) { // leftBottom
        if (editType === 'add-p') {
          const addP0 = { x: p.x + mx, y: p.y }
          const addP1 = { x: p.x, y: p.y - my }
          rp.x += mmx
          rp.y -= mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x += mx
          rp.y -= my
        }
        if (editType === 'curve') {
          const list = createPListCurve(right, top, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }
    }
    if (type === 'inout' || type === 'in') {
      if (bottom && left && prevP.i === bottom.i && nextP.i === left.i) { // inside rightTop
        if (editType === 'add-p') {
          const addP0 = { x: p.x, y: p.y + my }
          const addP1 = { x: p.x - mx, y: p.y}
          rp.x -= mmx
          rp.y += mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x -= mx
          rp.y += my
        }
        if (editType === 'curve') {
          const list = createPListCurve(bottom, left, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }
      if (left && top && prevP.i === left.i && nextP.i === top.i) { // inside rightBottom
        if (editType === 'add-p') {
          const addP0 = { x: p.x - mx, y: p.y }
          const addP1 = { x: p.x, y: p.y - my }
          rp.x -= mmx
          rp.y -= mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x -= mx
          rp.y -= my
        }
        if (editType === 'curve') {
          const list = createPListCurve(left, top, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }

      if (right && bottom && prevP.i === right.i && nextP.i === bottom.i) { // inside leftTop
        if (editType === 'add-p') {
          const addP0 = { x: p.x + mx, y: p.y }
          const addP1 = { x: p.x, y: p.y + my }
          rp.x += mmx
          rp.y += mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x += mx
          rp.y += my
        }
        if (editType === 'curve') {
          const list = createPListCurve(right, bottom, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }

      if (top && right && prevP.i === top.i && nextP.i === right.i) { // inside leftBottom
        if (editType === 'add-p') {
          const addP0 = { x: p.x, y: p.y - my }
          const addP1 = { x: p.x + mx, y: p.y }
          rp.x += mmx
          rp.y -= mmy
          addPList.push(addP0)
          addPList.push(rp)
          addPList.push(addP1)
        }
        if (editType === 'slice') {
          rp.x += mx
          rp.y -= my
        }
        if (editType === 'curve') {
          const list = createPListCurve(top, right, rp, interval)
          for (let i=1; i<list.length-1; i++) addPList.push({ x: list[i].x, y: list[i].y })
        }
      }
    }

    if (addPList.length > 0) {
      for (const ap of addPList) list.push(ap)
    } else {
      list.push(rp)
    }
  }
  const first = list[0]
  list.push({ x: first.x, y: first.y })
  return list
}