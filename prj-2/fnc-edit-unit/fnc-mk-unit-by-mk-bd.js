// mkSt: mk-u-stc-temp-comp-st-bd:
// part-code,list-i/part-code,list-i/...
//
// editSt: edit-st-u-stc-temp-comp-st-bd:
// part-i/clr-st/dv-type/exp-n/border-n/clr-value
// part-i/clr-st/...
// ...
//
function createUnitFromMkBd(partCodeUStcBd, mkSt, uStcJpSt, editSt='') {
  const pcuInfoList = createPartCodeUStcInfoList(partCodeUStcBd)
  let tempCompStBd = createUStcTempCompStBdFromMkSt(mkSt, pcuInfoList)
  console.log(tempCompStBd)
  if (editSt.length > 0) tempCompStBd = editUStcTempCompStBd(editSt, tempCompStBd)
  const mkInfo = createMkMkSt(tempCompStBd)
  const unitSt = createMkUnitSt(mkInfo.mkPartStBd, mkInfo.mkUnitSt)

  const unit = createUnitFromUnitSt(unitSt)

  const uStcJpInfo = createUStcJpInfo(uStcJpSt)
  placeUnitPartByUStcJpInfo(unit, uStcJpInfo)

  // set part-code
  for (const partCode of uStcJpInfo.orderList) {
    const partI = uStcJpInfo.partCodeList.indexOf(partCode)
    const part = unit.partList[partI]
    part.code = partCode
  }

  return unit
}

function editUStcTempCompStBd(editSt, tempCompStBd) {
  const tcStList = tempCompStBd.split('\n=====\n')
  const eStList = editSt.split('\n')
  for (const eSt of eStList) {
    // part-i/clr-st/dv-type/exp-n/border-n/clr-value
    const eStSp = eSt.split('/')
    const partI = Number(eStSp[0])
    let clrSt = eStSp[1]
    if (clrSt !== 'none') {
      const clrSp = clrSt.split(',')
      clrSt = clrSp.join('_')
    }
    const dvType = eStSp[2]
    const expN = Number(eStSp[3])
    const borderN = Number(eStSp[4])
    const clrValue = Number(eStSp[5])

    const tcSt = tcStList[partI]
    const tcStSp = tcSt.split('\n====\n')
    const uStc = tcStSp[0]
    const uStcSp = uStc.split('\n')
    const leSt = uStcSp[3]
    const leStSp = leSt.split('/')
    const posSt = leStSp[0]
    leStSp.shift()
    const nwLeStSp = []
    for (const les of leStSp) {
      const eSp = les.split(',')
      eSp[4] = clrSt
      eSp[5] = dvType
      eSp[6] = expN
      eSp[7] = borderN
      eSp[8] = clrValue
      const nwLes = eSp.join(',')
      nwLeStSp.push(nwLes)
    }
    uStcSp[3] = `${posSt}/${nwLeStSp.join('/')}`
    tcStSp[0] = uStcSp.join('\n')
    tcStList[partI] = tcStSp.join('\n====\n')
  }
  return tcStList.join('\n=====\n')
}

// part-code-u-stc-bd:
// part-code
// =====
// u-stc-st
// =====
// u-stc-st
// ...
// ======
// part-code
// ...
//
function createPartCodeUStcInfoList(partCodeUStcBd) {
  const infoList = []
  const pcuStcList = partCodeUStcBd.split('\n======\n')
  for (const pcuStc of pcuStcList) {
    const pcuStcSp = pcuStc.split('\n=====\n')
    const partCode = pcuStcSp[0]
    pcuStcSp.shift()
    const info = {
      partCode: partCode,
      uStcStList: pcuStcSp
    }
    console.log(`${partCode}: pcu-stc num: ${pcuStcSp.length}`)
    infoList.push(info)
  }
  return infoList
}

// mk-st:
// part-code,i(list-i)/part-code,i/part-code,i/...
//
// list: partCodeUStcInfoList
function createUStcTempCompStBdFromMkSt(mkSt, list) {
  const uStcList = []
  const mkStSp = mkSt.split('/')
  for (const mks of mkStSp) {
    const mksSp = mks.split(',')
    const partCode = mksSp[0]
    let i = Number(mksSp[1])
    const info = list.find(pcu => pcu.partCode === partCode)
    if (!info) continue
    if (i < 0) i = Math.floor(Math.random() * info.uStcStList.length)
    const index = i % info.uStcStList.length
    const uStc = info.uStcStList[index]
    uStcList.push(uStc)
  }
  return uStcList.join('\n=====\n')
}

// u-stc-temp-comp-st-bd:
// one-part u-stc-st
// ====
// u-stc-lyr-st-bd
// =====
// one-part u-stc-st
// ====
// u-stc-lyr-st-bd
// =====
// ...
//
function createMkMkSt(tempComp) {
  const tcSp = tempComp.split('\n=====\n')
  let usPartList = []
  let uStcLyrStList = []
  for (const cmpSt of tcSp) {
    const cmpStSp = cmpSt.split('\n====\n')

    const usSp = cmpStSp[0].split('\n')
    usSp.shift() // ucode
    usSp.shift() // style-00
    usSp.shift() // 1
    usPartList = usPartList.concat(usSp)

    const usLyrSp = cmpStSp[1].split('\n===\n')
    uStcLyrStList = uStcLyrStList.concat(usLyrSp)
  }

  let uStcSt = `u-stc-st-from-temp-comp-${getCurrentDateUCode()}\n`
  uStcSt += 'style-00\n'
  uStcSt += '1\n'
  uStcSt += `${usPartList.join('\n')}`
  const uStcLyrStBd = uStcLyrStList.join('\n===\n')
  const uStcStInfo = createUStcStInfo(uStcSt, uStcLyrStBd)

  const mkPartStList = []
  const mkUnitStList = []

  let partI = 0
  for (const prtInfo of uStcStInfo.partList) {
    mkUnitStList.push(`${partI},${prtInfo.x},${prtInfo.y}`)

    const mkLyrStList = []

    for (const lyrInfo of prtInfo.lyrList) {
      let mlSt = `${lyrInfo.size}/${lyrInfo.x},${lyrInfo.y}/${lyrInfo.ri}/${lyrInfo.clrSt}/${lyrInfo.dvType}/${lyrInfo.expN},${lyrInfo.borderN},${lyrInfo.clrValue}`
      mlSt += `\n${lyrInfo.lyrSt}`
      mkLyrStList.push(mlSt)
    }

    mkPartStList.push(mkLyrStList.join('\n==\n'))

    partI++
  }

  return {
    uStcStInfo: uStcStInfo,
    mkPartStBd: mkPartStList.join('\n===\n'),
    mkUnitSt: mkUnitStList.join('/')
  }
}

function createMkUnitSt(mkPartStBd, mkUnitSt) {
  const unitSt = createUnitStByMkSt(mkUnitSt, mkPartStBd)
  return unitSt
}

function placeUnitPartByUStcJpInfo(unit, uStcJpInfo) {
  for (const partCode of uStcJpInfo.orderList) {
    const jpInfoList = uStcJpInfo.jpInfoList.filter(jp => jp.partCode === partCode)
    for (const jpInfo of jpInfoList) {
      if (jpInfo.jpType === 'm') {
        const gJpInfo = uStcJpInfo.jpInfoList.find(jp => jp.jpCode === jpInfo.jpCode && jp.jpType === 'g')
        if (!gJpInfo) continue

        const mPartI = uStcJpInfo.partCodeList.indexOf(jpInfo.partCode)
        const mPart = unit.partList[mPartI]
        const gPartI = uStcJpInfo.partCodeList.indexOf(gJpInfo.partCode)
        const gPart = unit.partList[gPartI]

        // calc w/h from part-lyr.vertices
        const mPartWh = calcWhOfUnitPart(mPart)
        const gPartWh = calcWhOfUnitPart(gPart)

        const gx = gPartWh.w * gJpInfo.xScale + gPart.x
        const gy = gPartWh.h * gJpInfo.yScale + gPart.y
        const mx = mPartWh.w * jpInfo.xScale
        const my = mPartWh.h * jpInfo.yScale

        const mvx = gx - mx
        const mvy = gy - my
        mPart.x = mvx
        mPart.y = mvy
        mPart.originPos.x = mvx
        mPart.originPos.y = mvy
      }
    }
  }
}

function calcWhOfUnitPart(part) {
  let left = Number.MAX_SAFE_INTEGER
  let right = Number.MAX_SAFE_INTEGER * -1
  let top = Number.MAX_SAFE_INTEGER * -1
  let bottom = Number.MAX_SAFE_INTEGER

  for (const lyrInfo of part.lyrInfoList) {
    const vertices = lyrInfo.vtxInfo.vertices
    // const indices = lyrInfo.vtxInfo.indices
    // const colors = lyrInfo.vtxInfo.colors

    for (let i=0; i<vertices.length; i+=3) {
      const x = vertices[i] + lyrInfo.x
      const y = vertices[i+1] + lyrInfo.y
      // const z = vertices[i+2]
      left = Math.min(left, x)
      right = Math.max(right, x)
      top = Math.max(top, y)
      bottom = Math.min(bottom, y)
    }
  }

  const w = Math.abs(right - left)
  const h = Math.abs(top - bottom)
  return {
    w: w,
    h: h
  }
}

// detail u-stc-st:
// ucode
// style-code
// detail-code (n > 0)
// part-x,y/lyr size,x,y,ri,clr-st,dv-type,exp-n,border-n,clr-value/lyr size,...
// part-x,y/...
// ...
//
// (x,y: 3d-pos)
// (clr-st: none / 0-0-0_255-255-255_10-20-30)
//
function createUStcStInfo(uStcSt, uStcLyrStBd) {
  const uStcLyrStList = uStcLyrStBd.split('\n===\n')
  const uStcStSp = uStcSt.split('\n')
  const ucode = uStcStSp[0]
  const styleCode = uStcStSp[1]
  const detailCode = Number(uStcStSp[2])
  uStcStSp.shift()
  uStcStSp.shift()
  uStcStSp.shift()

  const uStcStInfo = {
    ucode: ucode,
    styleCode: styleCode,
    detailCode: detailCode,
    partList: []
  }

  let uStcLyrI = 0

  for (const prtSt of uStcStSp) {
    const prtStSp = prtSt.split('/')
    const prtPosSp = prtStSp[0].split(',')
    const prtX = Number(prtPosSp[0])
    const prtY = Number(prtPosSp[1])
    prtStSp.shift()

    const prtInfo = {
      x: prtX,
      y: prtY,
      lyrList: []
    }

    for (const lrSt of prtStSp) {
      const lrStSp = lrSt.split(',')
      let lyrSize = 12
      let lyrX = 0
      let lyrY = 0
      let lyrRi = 0
      let lyrClrSt = 'none'
      let dvType = 'origin'
      let expN = 4
      let borderN = 1
      let clrValue = 10

      if (detailCode === 0) {
        lyrX = Number(lrStSp[0])
        lyrY = Number(lrStSp[1])
      } else {
        // lyr size,x,y,ri,clr-st,dv-type,exp-n,border-n,clr-value
        lyrSize = Number(lrStSp[0])
        lyrX = Number(lrStSp[1])
        lyrY = Number(lrStSp[2])
        lyrRi = Number(lrStSp[3])

        lyrClrSt = lrStSp[4] // none / 0-0-0_255-255-255_10-20-30
        if (lyrClrSt !== 'none') {
          const clrSp = lyrClrSt.split('_')
          lyrClrSt = clrSp.join(',')
        }

        dvType = lrStSp[5]
        expN = Number(lrStSp[6])
        borderN = Number(lrStSp[7])
        clrValue = Number(lrStSp[8])
      }

      const lyrInfo = {
        size: lyrSize,
        x: lyrX,
        y: lyrY,
        ri: lyrRi,
        clrSt: lyrClrSt,
        dvType: dvType,
        expN: expN,
        borderN: borderN,
        clrValue: clrValue,
        lyrSt: uStcLyrStList[uStcLyrI++]
      }

      prtInfo.lyrList.push(lyrInfo)
    }
    uStcStInfo.partList.push(prtInfo)
  }

  return uStcStInfo
}

// uStcJpSt: u-stc-jp-st:
// ucode
// ===
// order-st (none / order-st)
// ===
// part-code
// jp-code/type(m/g)/x-scale(x part-w),y-scale(x part-h)
// jp-code/...
// ...
// ===
// part-code
// jp-code/...
// ...
//
function createUStcJpInfo(uStcJpSt) {
  const uStcJpStSp = uStcJpSt.split('\n===\n')
  const orderSt = uStcJpStSp[1]
  uStcJpStSp.shift() // ucode
  uStcJpStSp.shift() // order-st

  const partCodeList = []
  const jpList = []

  for (const jpSt of uStcJpStSp) {
    const jpStSp = jpSt.split('\n')
    const partCode = jpStSp[0]
    partCodeList.push(partCode)
    jpStSp.shift()

    for (const jst of jpStSp) {
      const jstSp = jst.split('/')
      const jpCode = jstSp[0]
      const jpType = jstSp[1]
      const jpPsSp = jstSp[2].split(',')
      const xScale = Number(jpPsSp[0])
      const yScale = Number(jpPsSp[1])

      const jpInfo = {
        partCode: partCode,
        jpCode: jpCode,
        jpType: jpType, // m/g
        xScale: xScale,
        yScale: yScale
      }

      jpList.push(jpInfo)
    }
  }

  let orderList = []
  if (orderSt !== 'none') {
    const orderSp = orderSt.split(',')
    for (const code of orderSp) orderList.push(code)
    for (const code of partCodeList) {
      const i = orderList.indexOf(code)
      if (i < 0) orderList.push(code)
    }
  } else {
    orderList = JSON.parse(JSON.stringify(partCodeList))
  }

  return {
    partCodeList: partCodeList,
    jpInfoList: jpList,
    orderList: orderList
  }
}