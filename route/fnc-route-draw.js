function drawLineInfoList(ctx, list, sx, sy, color='blue') {
  ctx.beginPath()
  ctx.stroke.style = color
  let x1 = 0
  let y1 = 0
  for (const line of list) {
    const x0 = line.p0.x + sx
    const y0 = line.p0.y + sy
    x1 = line.p1.x + sx
    y1 = line.p1.y + sy
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.strokeStyle = 'gray'
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(x0 + 4, y0)
    ctx.arc(x0, y0, 4, 0, 2 * Math.PI)
    // ctx.moveTo(line.p1.x + 4, line.p1.y)
    // ctx.arc(line.p1.x, line.p1.y, 4, 0, 2 * Math.PI)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.moveTo(x1 + 4, y1)
  ctx.arc(x1, y1, 4, 0, 2 * Math.PI)
  ctx.fill()
}

function drawPList(ctx, list, sx, sy, color='blue', isCircle=true) {
  // draw start
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.strokeRect(sx-5, sy-5, 10, 10)

  ctx.beginPath()
  ctx.strokeStyle = 'gray'
  ctx.moveTo(sx, sy)
  let i = 0
  for (const p of list) {
    const x = p.x + sx
    const y = p.y + sy
    // if (i === 0) {
    //   ctx.moveTo(x, y)
    // } else {
    ctx.lineTo(x, y)
    // }
    i++
  }
  ctx.stroke()

  if (!isCircle) return

  ctx.beginPath()
  for (const p of list) {
    const x = p.x + sx
    const y = p.y + sy
    ctx.strokeStyle = color
    // ctx.strokeRect(x, y, size, size)

    ctx.moveTo(x + 4, y)
    ctx.arc(x, y, 4, 0, 2 * Math.PI)

    ctx.stroke()
  }
}