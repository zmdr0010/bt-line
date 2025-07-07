// {
//   ucode: '',
//   baseIList: [],
//   list: [
//     {
//       type: 'base', // base / ovr
//       c: 0,
//       r: 1,
//       n: 6,
//       raw: [0,1,0,0,1,0,0,1,0,0,1,0]
//     }
//   ]
// }
function drawRawInfo(ctx, info, x, y, size, colorList) {
  let index = 0
  let colorType = 'rgb'
  let clrList = colorList
  if (info.colorInfo) {
    clrList = info.colorInfo.list
    colorType = info.colorInfo.type
  }
  for (const rwInfo of info.list) {
    const color = clrList[index % clrList.length]
    ctx.beginPath()
    if (colorType === "rgb") {
      ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
    } else { // name
      ctx.fillStyle = color
    }

    let i = -1
    for (const rw of rwInfo.raw) {
      i++
      if (rw < 1) continue
      const c = i % rwInfo.n
      const r = Math.floor(i / rwInfo.n)
      const mx = (rwInfo.c + c) * size + x
      const my = (rwInfo.r + r) * size + y
      ctx.rect(mx, my, size, size)
    }
    ctx.fill()
    index++
  }
}

function drawRawInfoLayers(ctx, info, x, y, size, colorList) {
  let ttr = 0
  let colorType = 'rgb'
  let clrList = colorList
  if (info.colorInfo) {
    clrList = info.colorInfo.list
    colorType = info.colorInfo.type
  }
  for (let i=0; i<info.list.length; i++) {
    const rwInfo = info.list[i]
    const color = clrList[i % clrList.length]
    ctx.beginPath()
    if (colorType === "rgb") {
      ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
    } else { // name
      ctx.fillStyle = color
    }
    let prevR = -1
    let count = 0
    for (let j=0; j<rwInfo.raw.length; j++) {
      const rw = rwInfo.raw[j]
      const c = j % rwInfo.n
      const r = Math.floor(j / rwInfo.n)
      const mx = (rwInfo.c + c) * size + x
      const my = (r + ttr) * size + y
      if (prevR !== r) {
        prevR = r
        count++
      }
      if (rw < 1) continue
      ctx.rect(mx, my, size, size)
    }
    ctx.fill()
    ttr += count + 2
  }
}