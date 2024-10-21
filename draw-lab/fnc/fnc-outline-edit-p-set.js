// edit-p-set
// uCode/raw uCode/szw/szh/color/lineColor/lineWidth/edit type/i num/i,i,i, ... list/edge type num/edge type,type ... list
function createEditPSetInfo(set) {
  const split = set.split('/')
  const uCode = split[0]
  const rawUCode = split[1]
  const szw = Number(split[2])
  const szh = Number(split[3])
  const color = split[4]
  const lineColor = split[5]
  const lineWidth = Number(split[6])
  const editType = split[7]
  const iNum = Number(split[8])
  const iList = []
  if (iNum > 0) {
    const iStr = split[9]
    const iSplit = iStr.split(',')
    for (const ist of iSplit) iList.push(Number(ist))
  }
  const edgeTypeNum = Number(split[10])
  const edgeTypeList = []
  if (edgeTypeNum > 0) {
    const tStr = split[11]
    const tSplit = tStr.split(',')
    for (const t of tSplit) edgeTypeList.push(t)
  }
  return {
    uCode: uCode,
    rawUCode: rawUCode,
    szw: szw,
    szh: szh,
    color: color,
    lineColor: lineColor,
    lineWidth: lineWidth,
    editType: editType,
    iList: iList,
    edgeTypeList: edgeTypeList
  }
}

function createLineInfoFromEditPSetInfo(info, rawInfoList) {
  const rawInfo = rawInfoList.find(r => r.uCode === info.rawUCode)
  if (!rawInfo) return
  const pList = calculatePList(rawInfo)
  const linePList = []
  makeLinePList(pList[0], linePList, info.szw, info.szh)
  let lineInfo
  if (info.editType === 'remove-p') {
    const ed = editOutPInfoList(linePList, info.szw, info.szh, info.iList, info.editType)
    lineInfo = createLinePointFromOutlinePList(ed, info.color, info.lineColor, info.lineWidth)
  } else {
    const ed = editPListEdgeInOutSide(linePList, info.szw, info.szh, 'target', info.editType, { iList: info.iList, list: info.edgeTypeList })
    lineInfo = createLinePointFromOutlinePList(ed, info.color, info.lineColor, info.lineWidth)
  }
  return lineInfo
}