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
    list: list
  }
}