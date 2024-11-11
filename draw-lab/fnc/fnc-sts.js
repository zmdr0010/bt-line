// info: dvcStsInfo
// srn(uCode)/tCode/mdn/stsNum/stsCode,value/stsCode, list by stsNum
function createDvcStsStrSet(info) {
  let str = `${info.srn}/${info.tCode}/${info.mdn}/${info.list.length}`
  for (const sts of info.list) {
    str += `/${sts.code},${sts.value}`
  }
  return str
}

function createDvcStsInfo(set) {
  const split = set.split('/')
  const srn = split[0]
  const tCode = split[1]
  const mdn = split[2]
  const stsNum = Number(split[3])
  const list = []
  for (let i=4; i<split.length; i++) {
    const str = split[i]
    const strSplit = str.split(',')
    const code = strSplit[0]
    const value = Number(strSplit[1])
    list.push({ code: code, value: value })
  }
  return {
    srn: srn,
    tCode: tCode,
    mdn: mdn,
    list: list
  }
}

// info: upgInfo
// uCode/srn/list num/... step/sts list num/stsCode,value/stsCode, ...
function createUpgStrSet(info) {
  let str = `${info.uCode}/${info.srn}/${info.list.length}`
  for (const stp of info.list) {
    str += `/${stp.step}/${stp.list.length}`
    for (const sts of stp.list) {
      str += `/${sts.code},${sts.value}`
    }
  }
  return str
}

function createUpgInfo(set) {
  const split = set.split('/')
  const uCode = split[0]
  const srn = split[1]
  const listNum = Number(split[2])
  const list = []
  let next = 3
  for (let i=0; i<listNum; i++) {
    const step = Number(split[next++])
    const stsListNum = Number(split[next++])
    const stpInfo = { step: step, list: [] }
    list.push(stpInfo)
    for (let j=0; j<stsListNum; j++) {
      const sts = split[next++]
      const stsSplit = sts.split(',')
      const code = stsSplit[0]
      const value = Number(stsSplit[1])
      stpInfo.list.push({ code: code, value: value })
    }
  }
  return {
    uCode: uCode,
    srn: srn,
    list: list
  }
}