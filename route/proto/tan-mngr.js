const FrHdBtTanMngr = {
  create: function() {
    let list = [] // tanObj list

    function shot(actMngr, tan, mvList, sx, sy) {
      // tan (tanInfo)
      // { atk: atk, color: color, size: { w: sizeW, h: sizeH } }

      let tanObj = {
        x: sx, y: sy, sx: sx, sy: sy, tanInfo: tan
      }
      list.push(tanObj)

      let actInfo = {
        tCode: 'mv',
        endCode: 'out', // out: remove unit, end: remove info (unit stop), other tCode (change info of tCode
        count: 1, // -1: cycle, 0: stop, 1~n: count
        d: 0,
        crnt: 0, // current index
        type: 'mv', // mv (move) / st (shape transform) / ef (effect)
        // d: 0 -> direct 1 frame
        // d: n -> d = 0 act() and n frame delay
        // {d: 0, x: 2, y: 0},
        list: mvList,
        // mv list [{d: 5, dr:1, dc:0}]
        // st list [{node: 20, part: {row:5, column:5, rawNum: 3, raw: [1,1,1 ... 3,3,2,2], child: [], colorList: []}}]
        target: tanObj, // part
        act: () => { // d = 0 act callback
          const current = actInfo.list[actInfo.crnt]
          tanObj.x = tanObj.sx + current.x
          tanObj.y = tanObj.sy + current.y
        },
        end: () => { // act end callback
          list.splice(list.indexOf(tanObj), 1)
          actMngr.remove(actInfo)
        }
      }
      actMngr.add(actInfo)
    }

    function draw(ctx) {
      for (const tan of list) {
        ctx.beginPath()
        ctx.fillStyle = tan.tanInfo.color
        const hw = tan.tanInfo.size.w * 0.5
        const hh = tan.tanInfo.size.h * 0.5
        ctx.fillRect(tan.x - hw, tan.y - hh, tan.tanInfo.size.w, tan.tanInfo.size.h)
      }
    }


    return {
      draw: draw,
      shot: shot
    }
  }
}