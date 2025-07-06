// shtr-bundle-set
//                // mv (mv-act-skl) (sht next line has route-set)
//                // mv-route-set + target-set (target-type (target / none),dx,dy)
// 10,10,mv,0     // shtr dx, dy, shtr-type (normal / mv / fix), sht-start-frame (-1: last, 0: first, n)
// 2              // tan-info num
// 3,blue,10,10   // tan: atk, color, sizeW, sizeH
// 5,green,13,13  // tan: atk, color, sizeW, sizeH
// 0,0                                                    // tanRoute: rotateI, degree
// pc-00/1/3,031546,30,150,20,40,30,130,40,60,10,110      //           piece-set
// msk-00/5/10,1/4,2/8,2/4,5/6,6                          //           mask-set
// 0,0
// pc-01/1/3,154037,30,150,20,40,-30,-130,10,60,-16,110
// msk-01/5/10,1/4,2/8,2/4,5/6,6
// tan-intv-00/3/10/3/0/1/0                // tan-intv: ucode/num/frame/i-list-num/i/i/...
// sht-00/3/40/5/30/target,50,50/3/0/1/0   // sht: ucode/num/intv-frame/reload-num/reload-frame/target(target/none: none is no target),dx,dy/route-i-list-num/i/i/...
// 0,0        // skl-mv-route
// mv-skl-pc-00/1/3,031546,90,90,40,40,30,60,50,50,40,40
// mv-skl-msk-00/6/14,1/14,2/16,4/14,5/16,7/12,8
// target,0,0

// let tanList = [ // sts, raw, skin info
//   {
//     atk: 3,
//     color: 'blue',
//     size: { w: 10, h: 10 }
//   },
//   {
//     atk: 5,
//     color: 'green',
//     size: { w: 13, h: 13 }
//   }
// ]
//
// let tanRouteList = [
//   {
//     rotateI: 0,
//     degree: 0,
//     pieceSet: 'pc-00/1/3,031546,30,150,20,40,30,130,40,60,10,110',
//     maskSet: 'msk-00/5/10,1/4,2/8,2/4,5/6,6'
//   },
//   {
//     rotateI: 0,
//     degree: 0,
//     pieceSet: 'pc-01/1/3,154037,30,150,20,40,-30,-130,10,60,-16,110',
//     maskSet: 'msk-01/5/10,1/4,2/8,2/4,5/6,6'
//   }
// ]
//
// let tanIntvInfo = {
//   num: 3,
//   frame: 10, // 0: at the same time sht
//   tanIList: [0, 1, 0], // tan index list: intv order (matching routeIList)
// }
//
// let shtInfo = {
//   num: 3, // sht num in 1 reload
//   intvFrame: 40, // sht intv frame (over tanIntv.num x tanIntv.frame)
//   reloadNum: 5, // 3 sht -> reload x5 (18 sht (3 x 6 (5 + 1(first))
//   reloadFrame: 30,
//   routeIList: [0, 1, 0], // tan route index list: by order (matching tanIList)
//   target: {
//     type: 'target', // none / target
//     dx: 50, // target dx, dy
//     dy: 50,
//   }
// }

// shtrInfo = {
//   type: 'normal', // normal / mv / fix
//   startFrame: 0,
//   state: 'end', // start / end
//   frame: 0,
//   reloadNum: 0,
//   shtNum: 0,
//   tanIntvNum: 0,
//   dx: 10,
//   dy: 10,
//   sx: unit.sx + 10,
//   sy: unit.sy + 10,
//   sht: shtInfo,
//   tanIntv: tanIntvInfo,
//   tanRouteList: tanRouteList,
//   tanList: tanList
//   mvRoute: {
//     frame: 0,
//     sx: 0,
//     sy: 0,
//     rotateI: 0,
//     degree: 0,
//     pieceSet: '',
//     maskSet: '',
//     pList: [],
//     target: {
//      type: 'target', // none / target
//      dx: 0, // target dx, dy
//      dy: 0,
//     }
//   }
// }
const FrHdBtShtrMngr = {
  create: function(owner) {
    let list = [] // shtrInfoList

    function init() {
      list = []
    }

    // add shtrInfo from shtr-bundle-set
    function addShtrInfoFromSet(str) {
      const split = str.split('\n')
      // console.log(split)
      const first = split[0]
      const firstSplit = first.split(',')
      const shtrDx = Number(firstSplit[0])
      const shtrDy = Number(firstSplit[1])
      const shtrType = firstSplit[2]
      const shtrStartFrame = Number(firstSplit[3])
      const tanInfoNum = Number(split[1])
      const tanList = []
      let next = 2
      for (let i=next; i<next + tanInfoNum; i++) {
        const str = split[i]
        const strSplit = str.split(',')
        const atk = Number(strSplit[0])
        const color = strSplit[1]
        const sizeW = Number(strSplit[2])
        const sizeH = Number(strSplit[3])
        // console.log(atk)
        // console.log(color)
        // console.log(sizeW)
        // console.log(sizeH)
        tanList.push({ atk: atk, color: color, size: { w: sizeW, h: sizeH } })
      }
      next += tanInfoNum
      const tanRouteList = []
      for (let i=0; i<tanInfoNum; i++) {
        const rotateStr = split[next]
        const pieceStr = split[next+1]
        const maskStr = split[next+2]
        // console.log(rotateStr)
        // console.log(pieceStr)
        // console.log(maskStr)
        const rotateStrSplit = rotateStr.split(',')
        const rotateI = Number(rotateStrSplit[0])
        const degree = Number(rotateStrSplit[1])
        const targetType = rotateStrSplit[2]
        const targetDx = Number(rotateStrSplit[3])
        const targetDy = Number(rotateStrSplit[4])
        tanRouteList.push({
          rotateI: rotateI, degree: degree,
          pieceSet: pieceStr, maskSet: maskStr,
          target: {
            type: targetType,
            dx: targetDx,
            dy: targetDy
          }
        })
        next += 3
      }
      const tanIntvStr = split[next++]
      const shtStr = split[next++]
      // console.log(tanIntvStr)
      // console.log(shtStr)
      const tanIntvStrSplit = tanIntvStr.split('/')
      const tanIntvUcode = tanIntvStrSplit[0]
      const tanIntvNum = Number(tanIntvStrSplit[1])
      const tanIntvFrame = Number(tanIntvStrSplit[2])
      const tanIListNum = Number(tanIntvStrSplit[3])
      const tanIList = []
      for (let i=4; i<tanIntvStrSplit.length; i++) {
        tanIList.push(Number(tanIntvStrSplit[i]))
      }
      const tanIntvInfo = {
        num: tanIntvNum,
        frame: tanIntvFrame,
        tanIList: tanIList
      }

      const shtStrSplit = shtStr.split('/')
      const shtUcode = shtStrSplit[0]
      const shtNum = Number(shtStrSplit[1])
      const intvFrame = Number(shtStrSplit[2])
      const reloadNum = Number(shtStrSplit[3])
      const reloadFrame = Number(shtStrSplit[4])
      const targetStr = shtStrSplit[5]
      const targetStrSplit = targetStr.split(',')
      const targetType = targetStrSplit[0]
      const targetDx = Number(targetStrSplit[1])
      const targetDy = Number(targetStrSplit[2])
      const routeINum = Number(shtStrSplit[6])
      const routeIList = []
      for (let i=7; i<shtStrSplit.length; i++) {
        routeIList.push(Number(shtStrSplit[i]))
      }
      const shtInfo = {
        num: shtNum,
        intvFrame: intvFrame,
        reloadNum: reloadNum,
        reloadFrame: reloadFrame,
        routeIList: routeIList,
        target: {
          type: targetType,
          dx: targetDx,
          dy: targetDy
        }
      }

      const mvRoute = {
        frame: 0,
        sx: 0,
        sy: 0,
        rotateI: 0,
        degree: 0,
        pieceSet: '',
        maskSet: '',
        pList: [],
        target: {
          type: 'target', // none / target
          dx: 0, // target dx, dy
          dy: 0,
        }
      }

      if (shtrType === 'mv') {
        const sPStr = split[next++]
        const pcStr = split[next++]
        const mskStr = split[next++]
        const sPStrSplit = sPStr.split(',')
        mvRoute.rotateI = Number(sPStrSplit[0])
        mvRoute.degree = Number(sPStrSplit[1])
        mvRoute.target.type = sPStrSplit[2]
        mvRoute.target.dx = Number(sPStrSplit[3])
        mvRoute.target.dy = Number(sPStrSplit[4])
        mvRoute.pieceSet = pcStr
        mvRoute.maskSet = mskStr
      }

      const shtrInfo = {
        type: shtrType,
        startFrame: shtrStartFrame,
        state: 'end',
        frame: 0,
        reloadNum: 0,
        shtNum: 0,
        tanIntvNum: 0,
        dx: shtrDx,
        dy: shtrDy,
        sx: owner.x + shtrDx,
        sy: owner.y + shtrDy,
        sht: shtInfo,
        tanIntv: tanIntvInfo,
        tanRouteList: tanRouteList,
        tanList: tanList,
        mvRoute: mvRoute
      }

      list.push(shtrInfo)
    }

    function getShtr(i) {
      return list[i]
    }

    return {
      init: init,
      addShtrInfoFromSet: addShtrInfoFromSet,
      getShtr: getShtr
    }
  }
}