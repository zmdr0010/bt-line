// uCode/num/code,name,type/code,name,type/ ... list
// type: mdn (mdn code) / ftr (ftr code)
function createMdCodeInfo(set) {
  const split = set.split('/')
  const uCode = split[0]
  const num = Number(split[1])
  const mdnMap = new Map()
  const ftrMap = new Map()
  for (let i=2; i<split.length; i++) {
    const str = split[i]
    const strSplit = str.split(',')
    const code = strSplit[0]
    const name = strSplit[1]
    const type = strSplit[2]
    if (type === 'mdn') mdnMap.set(code, name)
    if (type === 'ftr') ftrMap.set(code, name)
  }
  return {
    uCode: uCode,
    mdnMap: mdnMap,
    ftrMap: ftrMap
  }
}

function createMdCodeSet(info) {
  let str = `${info.uCode}/${info.mdnMap.size + info.ftrMap.size}`
  info.mdnMap.forEach((value, key) => {
    str += `/${key},${value},mdn`
  })
  info.ftrMap.forEach((value, key) => {
    str += `/${key},${value},ftr`
  })
  return str
}