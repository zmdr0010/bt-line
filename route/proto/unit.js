const FrHdBtUnit = {
  create: function (unitMngr, tgtUnit=null) {
    let unit = {
      ucode: `unit-${Date.now()}`,
      state: 'init',
      appearX: 0, appearY: 0,
      x: 0, y: 0,
      sx: 0, sy: 0,
      sts: { hp: 0, atk: 0, dfc: 0, spd: 0 },
      skin: { color: '', size: { w: 0, h: 0 } },
      shtrMngr: null,
      tanMngr: null,
      cndtnList: [],
      routeList: [],
      currentCndtn: null
    }
    unit.shtrMngr = FrHdBtShtrMngr.create(unit)
    unit.tanMngr = FrHdBtTanMngr.create()
    let targetUnit = tgtUnit

    function detectTarget(tgt) {
      targetUnit = tgt
    }

    function start(actMngr) {
      unit.state = 'start'
      unit.sx = unit.appearX
      unit.sy = unit.appearY
      unit.x = unit.sx
      unit.y = unit.sy
      changeCurrentCndtn(actMngr, 0)
      console.log(`current cndtn: 0`)
    }

    function out() {
      unit.state = 'out'
    }

    function next(actMngr, i) {
      if (i < 0) return
      changeCurrentCndtn(actMngr, i)
      console.log(`current cndtn: ${i}`)
    }

    // detecting ???
    function changeCurrentCndtn(actMngr, cndtnI) {
      const cndtn = unit.cndtnList[cndtnI]
      unit.currentCndtn = cndtn
      // {
      //   code: code,
      //   routeI: routeI,
      //   rotateI: rotateI,
      //   degree: degree,
      //   target: {
      //     type: targetType,
      //     dx: targetDx,
      //     dy: targetDy
      //   },
      //   shtrI: shtrI,
      //   nextI: nextI
      // }

      const routeI = cndtn.routeI
      const shtrI = cndtn.shtrI

      // {
      //   rotateI: rotateI, degree: degree,
      //   pieceSet: pieceStr, maskSet: mskStr
      // }

      let uP = { x: unit.x, y: unit.y }
      let trgP = null
      let stopRoute = false
      if (shtrI >= 0) {
        // let doNext = false
        const shtr = unit.shtrMngr.getShtr(shtrI)
        shtr.sx = unit.x + shtr.dx
        shtr.sy = unit.y + shtr.dy
        if (shtr.type !== 'normal') { // normal / mv / fix
          stopRoute = true // mv: shtr-mv (skl-mv) / fix: no-route
          // doNext = true // shtr-end -> next-cndtn

          const etcInfo = {
            type: 'mv-sht',
            shtr: shtr,
            cndtn: cndtn
          }

          let trgObj = {
            type: 'none', dx: 0, dy: 0
          }
          const shtrRoute = {
            rotateI: shtr.mvRoute.rotateI,
            degree: shtr.mvRoute.degree,
            pieceSet: shtr.mvRoute.pieceSet,
            maskSet: shtr.mvRoute.maskSet,
            target: trgObj
          }
          if (shtr.mvRoute.target.type === 'target') {
            trgObj.type = 'target'
            trgObj.dx = shtr.mvRoute.target.dx
            trgObj.dy = shtr.mvRoute.target.dy
            trgP = { x: targetUnit.x, y: targetUnit.y }
          }
          createRouteActInfo(uP, trgP, actMngr, shtrRoute, cndtn, false, etcInfo)
        } else {
          createShtrActInfo(actMngr, shtr, unit, cndtn, false)
        }
      }

      // unit route target in bundle-set ???
      if (routeI >= 0 && !stopRoute) {

        const rot = unit.routeList[routeI]
        if (rot.target.type === 'target' && targetUnit) trgP = { x: targetUnit.x, y: targetUnit.y }
        createRouteActInfo(uP, trgP, actMngr, unit.routeList[routeI], cndtn)
      }
    }

    function createRouteActInfo(uP, trgP, actMngr, route, cndtn, doNext=true, etcInfo) {
      const pList = createPList(uP, trgP, route.pieceSet, route.maskSet, route.rotateI, route.degree, route.target)

      let actInfo = {
        tCode: 'mv',
        endCode: 'end', // out: remove unit, end: remove info (unit stop), other tCode (change info of tCode
        count: 1, // -1: cycle, 0: stop, 1~n: count
        d: 0,
        crnt: 0, // current index
        type: 'mv', // mv (move) / st (shape transform) / ef (effect)
        // d: 0 -> direct 1 frame
        // d: n -> d = 0 act() and n frame delay
        // {d: 0, x: 2, y: 0},
        list: createActListFromPList(pList),
        // mv list [{d: 5, dr:1, dc:0}]
        // st list [{node: 20, part: {row:5, column:5, rawNum: 3, raw: [1,1,1 ... 3,3,2,2], child: [], colorList: []}}]
        target: { ucode: unit.ucode }, // part
        act: () => { // d = 0 act callback
          const current = actInfo.list[actInfo.crnt]
          unit.x = unit.sx + current.x
          unit.y = unit.sy + current.y

          if (etcInfo) {
            if (etcInfo.type === 'mv-sht') {
              if (etcInfo.shtr.startFrame === actInfo.crnt) {
                etcInfo.shtr.sx = unit.x + etcInfo.shtr.dx
                etcInfo.shtr.sy = unit.y + etcInfo.shtr.dy
                createShtrActInfo(actMngr, etcInfo.shtr, unit, etcInfo.cndtn, true)
              }
            }
          }
        },
        end: () => { // act end callback
          actMngr.remove(actInfo)
          unit.sx = unit.x
          unit.sy = unit.y
          if (doNext) {
            if (unit.state === 'out') {
              if (cndtn.code === 'end' ) {
                const btUnitI = unitMngr.list.findIndex(m => m.getUnit() === unit)
                unitMngr.list.splice(btUnitI, 1)
                console.log('out')
              } else {
                console.log('end-cndtn')
                changeCurrentCndtn(actMngr, 1)
              }
            } else {
              if (cndtn.nextI >= 0) {
                next(actMngr, cndtn.nextI)
              }
            }
          }
        }
      }
      actMngr.add(actInfo)
    }

    function createShtrActInfo(actMngr, shtr, owner, cndtn, doNext=true) {
      const list = []
      if (shtr.startFrame > 0) list.push({ d: shtr.startFrame, state: 'delay' })
      for (let i=0; i<shtr.tanIntv.num; i++) {
        list.push({ d: shtr.tanIntv.frame, state: 'sht', i: i })
      }
      list.push({ d: shtr.sht.reloadFrame, state: 'reload' })

      let actInfo = {
        tCode: 'mv',
        endCode: 'end', // out: remove unit, end: remove info (unit stop), other tCode (change info of tCode
        count: shtr.sht.reloadNum, // -1: cycle, 0: stop, 1~n: count
        d: 0,
        crnt: 0, // current index
        type: 'mv', // mv (move) / st (shape transform) / ef (effect)
        // d: 0 -> direct 1 frame
        // d: n -> d = 0 act() and n frame delay
        // {d: 0, x: 2, y: 0},
        list: list,
        // mv list [{d: 5, dr:1, dc:0}]
        // st list [{node: 20, part: {row:5, column:5, rawNum: 3, raw: [1,1,1 ... 3,3,2,2], child: [], colorList: []}}]
        target: { ucode: unit.ucode }, // part
        act: () => { // d = 0 act callback
          const current = actInfo.list[actInfo.crnt]
          if (current.state === 'sht') {
            const routeI = shtr.sht.routeIList[current.i]
            const route = shtr.tanRouteList[routeI]
            const tanI = shtr.tanIntv.tanIList[current.i]
            const tan = shtr.tanList[tanI]
            let trgObj = {
              type: 'none', dx: 0, dy: 0
            }
            let uP = { x: unit.x, y: unit.y }
            let trgP = null
            if (shtr.sht.target.type === 'target') {
              trgObj.type = 'target'
              trgObj.dx = shtr.sht.target.dx
              trgObj.dy = shtr.sht.target.dy
              trgP = { x: targetUnit.x, y: targetUnit.y }
            }
            const pList = createPList(uP, trgP, route.pieceSet, route.maskSet, route.rotateI, route.degree, trgObj)
            const tanMvList = createActListFromPList(pList)
            const tanSx = owner.x + shtr.dx
            const tanSy = owner.y + shtr.dy
            unit.tanMngr.shot(actMngr, tan, tanMvList, tanSx, tanSy)
          }
        },
        end: () => { // act end callback
          if (doNext) {
            if (unit.state === 'out') {
              if (cndtn.code === 'end' ) {
                const btUnitI = unitMngr.list.findIndex(m => m.getUnit() === unit)
                unitMngr.list.splice(btUnitI, 1)
                console.log('out')
              } else {
                console.log('end-cndtn')
                changeCurrentCndtn(actMngr, 1)
              }
            } else {
              if (cndtn.nextI >= 0) {
                next(actMngr, cndtn.nextI)
              }
            }
          }
        }
      }
      actMngr.add(actInfo)
    }

    // appearP: { x: 0, y: 0 } (from base)
    function createUnitFromBundleSet(str, sx=0, sy=0, appearP=null) {
      const strSplit = str.split('===\n')
      let unitStr = strSplit[0]
      unitStr = unitStr.slice(0, unitStr.length-1) // remove \n
      // console.log(unitStr)
      const unitStrSplit = unitStr.split('/')
      const unitUcode = unitStrSplit[0]
      const unitSPStr = unitStrSplit[1]
      const unitSPStrSplit = unitSPStr.split(',')
      unit.appearX = Number(unitSPStrSplit[0]) + sx
      unit.appearY = Number(unitSPStrSplit[1]) + sy
      if (appearP) {
        unit.appearX = appearP.x + sx
        unit.appearY = appearP.y + sy
      }
      const unitStsStr = unitStrSplit[2]
      const unitStsStrSplit = unitStsStr.split(',')
      unit.sts.hp = Number(unitStsStrSplit[0])
      unit.sts.atk = Number(unitStsStrSplit[1])
      unit.sts.dfc = Number(unitStsStrSplit[2])
      unit.sts.spd = Number(unitStsStrSplit[3])
      const unitSkinStr = unitStrSplit[3]
      const unitSkinStrSplit = unitSkinStr.split(',')
      unit.skin.color = unitSkinStrSplit[0]
      unit.skin.size.w = Number(unitSkinStrSplit[1])
      unit.skin.size.h = Number(unitSkinStrSplit[2])

      let cndtnStr = strSplit[1]
      cndtnStr = cndtnStr.slice(0, cndtnStr.length-1) // remove \n
      // console.log(cndtnStr)
      const cndtnStrSplit = cndtnStr.split('\n')
      for (const cStr of cndtnStrSplit) {
        const cStrSplit = cStr.split('/')
        const code = cStrSplit[0]
        const routeI = Number(cStrSplit[1])
        const shtrI = Number(cStrSplit[2])
        const nextI = Number(cStrSplit[3])
        unit.cndtnList.push({
          code: code,
          routeI: routeI,
          shtrI: shtrI,
          nextI: nextI
        })
      }

      let unitRouteStr = strSplit[2]
      unitRouteStr = unitRouteStr.slice(0, unitRouteStr.length-1) // remove \n
      // console.log(unitRouteStr)
      const unitRouteStrSplit = unitRouteStr.split('\n')
      for (let i=0; i<unitRouteStrSplit.length; i+=3) {
        const rStr = unitRouteStrSplit[i]
        const pieceStr = unitRouteStrSplit[i+1]
        const mskStr = unitRouteStrSplit[i+2]
        const rStrSplit = rStr.split(',')
        const rotateI = Number(rStrSplit[0])
        const degree = Number(rStrSplit[1])
        const targetType = rStrSplit[2]
        const targetDx = Number(rStrSplit[3])
        const targetDy = Number(rStrSplit[4])
        unit.routeList.push({
          rotateI: rotateI, degree: degree,
          pieceSet: pieceStr, maskSet: mskStr,
          target: {
            type: targetType,
            dx: targetDx,
            dy: targetDy
          }
        })
      }

      const shtrNum = Number(strSplit[3])
      // console.log(shtrNum)

      for (let i=4; i<strSplit.length; i++) {
        const shtrStr = strSplit[i]
        console.log(shtrStr)
        unit.shtrMngr.addShtrInfoFromSet(shtrStr)
      }

      unit.state = 'create'
      console.log(unit)
    }

    function getUnit() {
      return unit
    }

    function draw(ctx) {
      if (!(unit.state === 'start' || unit.state === 'out')) return
      const w = unit.skin.size.w
      const h = unit.skin.size.h
      const hw = w * 0.5
      const hh = h * 0.5
      ctx.beginPath()
      ctx.fillStyle = unit.skin.color
      ctx.fillRect(unit.x - hw, unit.y - hh, w, h)

      unit.tanMngr.draw(ctx)
    }

    return {
      detectTarget: detectTarget,
      getUnit: getUnit,
      draw: draw,
      createUnitFromBundleSet: createUnitFromBundleSet,
      start: start,
      out: out
    }
  }
}