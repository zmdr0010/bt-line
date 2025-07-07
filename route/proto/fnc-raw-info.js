// ucode/base-i-list (0,1,...)/new-set,new-set,...(c-r-n-001100)
function createRawInfo(str) {
  const strSplit = str.split('/')
  const ucode = strSplit[0]
  const baseIListStr = strSplit[1]
  const setListStr = strSplit[2]
  const baseIListStrSplit = baseIListStr.split(',')
  const baseIList = []
  for (const iStr of baseIListStrSplit) baseIList.push(Number(iStr))
  const setListStrSplit = setListStr.split(',')
  const list = []
  let i = 0
  for (const st of setListStrSplit) {
    const stSplit = st.split('-')
    const c = Number(stSplit[0])
    const r = Number(stSplit[1])
    const n = Number(stSplit[2])
    const rw = stSplit[3]
    const rwSplit = rw.split('')
    const baseIndex = baseIList.indexOf(i)
    const type = (baseIndex >= 0) ? 'base' : 'ovr'
    const raw = []
    for (const rws of rwSplit) raw.push(Number(rws))
    list.push({
      type: type,
      c: c,
      r: r,
      n: n,
      raw: raw,
    })
    i++
  }
  return {
    ucode: ucode,
    baseIList: baseIList,
    list: list,
    // {
    //   type: 'name', // name / rgb
    //   list: []
    // }
    colorInfo: null
  }
}

// color/type (name / rgb)/color,color,... (raw-index % color-list-length)
// color/name/color-name,color-name,color-name,...
// color/rgb/r-g-b,r-g-b,r-g-b,...
// color/rgb/169-169-169,255-20-147,0-191-255,205-92-92,240-230-140,255-160-122,128-0-0,0-250-154,25-25-112,218-112-214
function createColorInfo(str) {
  const strSplit = str.split('/')
  const colorCode = strSplit[0]
  const type = strSplit[1]
  const vStr = strSplit[2]
  const vStrSplit = vStr.split(',')
  const list = []
  for (const v of vStrSplit) {
    if (type === 'rgb') {
      const vSplit = v.split('-')
      const r = Number(vSplit[0])
      const g = Number(vSplit[1])
      const b = Number(vSplit[2])
      list.push([r, g, b])
    } else {
      list.push(v)
    }
  }
  return {
    type: type,
    list: list
  }
}