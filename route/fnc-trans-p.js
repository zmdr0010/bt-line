// [    ]     [               ]   [     ]
// | rx |  =  |  cos() -sin() |   |  x  |
// | ry |     |  sin()  cos() |   |  y  |
// [    ]     [               ]   [     ]
//
// rx = x cos() - y sin()
// ry = x sin() + y cos()
//
// rotate [x, 0] (ex. movieClip, canvas, rect ... rotation)
// rx = x cos() - 0 sin() = x cos()
// ry = x sin() + 0 cos() = x sin()
function rotate(radian, x, y, cx, cy, sx, sy) {
  const dx = x - cx
  const dy = y - cy
  const dis = calculateDistance(cx, cy, x, y)
  let ra = Math.atan2(dy, dx)
  ra += radian
  const mx = cx + dis * Math.cos(ra) + sx
  const my = cy + dis * Math.sin(ra) + sy
  return {x: mx, y: my}
}

function calculateDistance(x0, y0, x1, y1) {
  const x = x1 - x0
  const y = y1 - y0
  return Math.sqrt(x * x + y * y)
}

function degreeToRadian(degree) {
  return degree * Math.PI / 180
}

function radianToDegree(radian) {
  return radian * 180 / Math.PI
}

// rotateI
//     4 5
//   3     6
//   2     7
//     1 0
function calcPosByRotateI(x, y, w, h, rotateI) {
  let rX = x
  let rY = y

  if (rotateI === 1) {
    rX = w - x
    rY = y
  }
  if (rotateI === 2) {
    rX = h - y
    rY = x
  }
  if (rotateI === 3) {
    rX = h - y
    rY = w - x
  }
  if (rotateI === 4) {
    rX = w - x
    rY = h - y
  }
  if (rotateI === 5) {
    rX = x
    rY = h - y
  }
  if (rotateI === 6) {
    rX = y
    rY = w - x
  }
  if (rotateI === 7) {
    rX = y
    rY = x
  }
  return { x: rX, y: rY }
}

// pList: [{x: 0, y: 0}]
// pInfo: {
//    lt: {scx: 0, scy: 0}, rt: {scx: 1, scy: 0},
//    lb: {scx: 0, scy: 1}, rb: {scx: 1, scy: 1}
//  }
function transformPoints4(pList, w, h, pInfo) {
  const x0 = pInfo.lt.scx * w
  const y0 = pInfo.lt.scy * h
  const x1 = pInfo.rt.scx * w
  const y1 = pInfo.rt.scy * h
  const x2 = pInfo.rb.scx * w
  const y2 = pInfo.rb.scy * h
  const x3 = pInfo.lb.scx * w
  const y3 = pInfo.lb.scy * h

  const dx1 = x1 - x2
  const dx2 = x3 - x2
  const dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2
  const dy2 = y3 - y2
  const dy3 = y0 - y1 + y2 - y3

  const a13 = (dx3 * dy2 - dy3 * dx2) / (dx1 * dy2 - dy1 * dx2)
  const a23 = (dx1 * dy3 - dy1 * dx3) / (dx1 * dy2 - dy1 * dx2)
  const a11 = x1 - x0 + a13 * x1
  const a21 = x3 - x0 + a23 * x3
  const a31 = x0
  const a12 = y1 - y0 + a13 * y1
  const a22 = y3 - y0 + a23 * y3
  const a32 = y0

  const m = [
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, 1
  ]

  const rpList = []
  for (const p of pList) {
    const scx = p.x / w
    const scy = p.y / h
    const rm = multiplyMatrixAndPoint3(m, [scx, scy, 1])

    const x = rm[0] / rm[2]
    const y = rm[1] / rm[2]

    rpList.push({ x: x, y: y})
  }
  return rpList
}

function multiplyMatrixAndPoint3(m, p) {
  const c0r0 = m[0]
  const c1r0 = m[1]
  const c2r0 = m[2]
  const c0r1 = m[3]
  const c1r1 = m[4]
  const c2r1 = m[5]
  const c0r2 = m[6]
  const c1r2 = m[7]
  const c2r2 = m[8]
  const x = p[0]
  const y = p[1]
  const z = p[2]
  const rx = x * c0r0 + y * c0r1 + z * c0r2
  const ry = x * c1r0 + y * c1r1 + z * c1r2
  const rz = x * c2r0 + y * c2r1 + z * c2r2
  return [rx, ry, rz]
}

/////// 3d

// rotate x axis (roll)
// [ 1   0      0   ]   [ x ]
// | 0 cos() -sin() |   | y |
// [ 0 sin()  cos() ]   [ z ]
//
// rotate y axis (pitch)
// [ cos()   0  sin() ]  [ x ]
// |    0    1    0   |  | y |
// [ -sin()  0  cos() ]  [ z ]
//
// rotate z axis (yaw)
// [ cos() -sin()  0 ]  [ x ]
// | sin()  cos()  0 |  | y |
// [    0     0    1 ]  [ z ]

function rotateRoll(radian, x, y, z) {
  const ab = rotateAb(radian, z, y)
  return {x: x, y: ab.b, z: ab.a}
}

function rotatePitch(radian, x, y, z) {
  const ab = rotateAb(radian, x, z)
  return {x: ab.a, y: y, z: ab.b}
}

function rotateYaw(radian, x, y, z) {
  const ab = rotateAb(radian, y, x)
  return {x: ab.a, y: ab.b, z: z}
}

function rotateAb(radian, a, b, ca=0, cb=0, sa=0, sb=0) {
  const da = a - ca
  const db = b - cb
  const dis = calculateDistance(ca, cb, a, b)
  let ra = Math.atan2(da, db)
  ra += radian
  const ma = ca + dis * Math.cos(ra) + sa
  const mb = cb + dis * Math.sin(ra) + sb
  return {a: ma, b: mb}
}

//////////// pList

function rotatePList(pList, degree, cx=0, cy=0, sx=0, sy=0) {
  const list = []
  for (const p of pList) {
    const rp = rotate(degreeToRadian(degree), p.x, p.y, cx, cy, sx, sy)
    list.push(rp)
  }
  return list
}

function movePListByRotateI(pList, i, w, h) {
  const list = []
  const firstP = pList[0]
  for (const p of pList) {
    const rp = calcPosByRotateI(p.x, p.y, w, h, i)
    list.push(rp)
  }
  const firstRp = list[0]
  const mx = firstP.x - firstRp.x
  const my = firstP.y - firstRp.y
  for (const p of list) {
    p.x += mx
    p.y += my
  }
  return list
}

function scalePList(pList, scaleX, scaleY) {
  const list = []
  for (const p of pList) list.push({ x: p.x * scaleX, y: p.y * scaleY })
  return list
}

function initPList3D(pList, z=0) {
  const list = []
  for (const p of pList) list.push( { x: p.x, y: p.y, z: z } )
  return list
}

function rotateRollPList(degree, pList, z=0) {
  const list = []
  let p3dList = pList
  const p0 = pList[0]
  if (!p0.z) p3dList = initPList3D(pList, z)
  for (const p of p3dList) list.push(rotateRoll(degreeToRadian(degree), p.x, p.y, p.z))
  return list
}

function rotatePitchPList(degree, pList, z=0) {
  const list = []
  let p3dList = pList
  const p0 = pList[0]
  if (!p0.z) p3dList = initPList3D(pList, z)
  for (const p of p3dList) list.push(rotatePitch(degreeToRadian(degree), p.x, p.y, p.z))
  return list
}

function rotateYawPList(degree, pList, z=0) {
  const list = []
  let p3dList = pList
  const p0 = pList[0]
  if (!p0.z) p3dList = initPList3D(pList, z)
  for (const p of p3dList) list.push(rotateYaw(degreeToRadian(degree), p.x, p.y, p.z))
  return list
}