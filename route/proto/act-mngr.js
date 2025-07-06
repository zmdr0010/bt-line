const FrHdBtActMngr = {
  create: function () {
    let actInfoList = []

    function add(info) {
      actInfoList.push(info)
    }

    function getInfo(i) {
      return actInfoList[i]
    }

    function getLength() {
      return actInfoList.length
    }

    function remove(info) {
      removeByIndex(actInfoList.indexOf(info))
    }

    function removeByIndex(i) {
      console.log(`remove index: ${i}`)
      actInfoList.splice(i, 1)
    }

    function removeAll() {
      while(actInfoList.length > 0) removeByIndex(actInfoList.length-1)
    }

    function update() {
      for (const info of actInfoList) {
        if (info.crnt < info.list.length) {
          const current = info.list[info.crnt]
          if (info.d === 0) info.act()
          info.d++
          if (info.d > current.d) {
            info.d = 0
            info.crnt++
            if (info.crnt >= info.list.length) {
              if (info.count > 1) {
                info.count--
                info.crnt = 0
              } else if (info.count === 0 || info.count === 1) {
                info.end()
              } else { // count < 0 -> cycle
                info.crnt = 0
              }
            }
          }
        }
      }
    }

    return {
      add: add,
      getInfo: getInfo,
      getLength: getLength,
      remove: remove,
      removeByIndex: removeByIndex,
      removeAll: removeAll,
      update: update
    }
  }
}