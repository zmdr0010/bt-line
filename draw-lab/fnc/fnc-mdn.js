// uCode/num/code,name/code,name/ ... list
function createMdnCodeMapInfo(set) {
  const split = set.split('/')
  const uCode = split[0]
  const num = Number(split[1])
  const info = {
    uCode: uCode,
    map: new Map(),
    nameList: []
  }
  for (let i=2; i<split.length; i++) {
    const str = split[i]
    const strSplit = str.split(',')
    const code = strSplit[0]
    const name = strSplit[1]
    info.map.set(code, name)
    info.nameList.push(name)
  }
  // info.nameList = Array.from(info.map.values())
  return info
}

// info = {
//   uCode: '',
//   map: new Map(),
//   nameList: []
// }
function createMdnCodeSet(info) {
  let str = `${info.uCode}/${info.map.size}`
  info.map.forEach((value, key) => {
    str += `/${key},${value}`
  })
  return str
}