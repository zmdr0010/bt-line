// colorInfo: {
//   type: 'name', // name / rgb
//   rgb: [], // type = rgb: [255, 0, 0]
//   name: 'red'
// }
//   rwInfo: {
//     c: 0,
//     r: 0,
//     n: 3,
//     raw: [ 0, 0, 1, 1, 0, 0 ]
//   }
function drawRwLayer(ctx, info, x, y, size, colorInfo=null) {
  let color = 'black'
  if (colorInfo) {
    if (colorInfo.type === 'name') color = colorInfo.name
    if (colorInfo.type === 'rgb') color = `rgb(${colorInfo.rgb[0]},${colorInfo.rgb[1]},${colorInfo.rgb[2]})`
  }
  ctx.beginPath()
  ctx.fillStyle = color

  let i = -1
  for (const rw of info.raw) {
    i++
    if (rw < 1) continue
    const c = i % info.n
    const r = Math.floor(i / info.n)
    const mx = (info.c + c) * size + x
    const my = (info.r + r) * size + y
    ctx.rect(mx, my, size, size)
  }
  ctx.fill()
}

function drawRwLayerColor(ctx, info, x, y, size, color='black') {
  ctx.beginPath()
  ctx.fillStyle = color

  let i = -1
  for (const rw of info.raw) {
    i++
    if (rw < 1) continue
    const c = i % info.n
    const r = Math.floor(i / info.n)
    const mx = (info.c + c) * size + x
    const my = (info.r + r) * size + y
    ctx.rect(mx, my, size, size)
  }
  ctx.fill()
}