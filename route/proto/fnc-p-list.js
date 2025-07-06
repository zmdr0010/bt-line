function createPList(uP, trgP, pieceSet, maskSet, rotateI, degree, target=null) {
  let pList = makePListFromEasingMaskSet(pieceSet, maskSet, true)
  const bound = calcPListBound(pList)
  pList = movePListByRotateI(pList, rotateI, bound.w, bound.h)
  pList = rotatePList(pList, degree)

  if (target && trgP) {
    if (target.type === 'target') {
      const dx = (trgP.x + target.dx) - uP.x
      const dy = (trgP.y + target.dy) - uP.y
      const degree = (Math.atan2(dy, dx) * 180) / Math.PI
      pList = rotatePList(pList, degree - 90)
    }
  }

  return pList
}

function createActListFromPList(pList, d=0) {
  const list = []
  for (const p of pList) list.push({ d: d, x: p.x, y: p.y })
  return list
}