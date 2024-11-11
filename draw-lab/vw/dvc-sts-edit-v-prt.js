const dvcStsEditVPrt = function() {
  function createMenu(list0, list1, main) {
    dvcStsSetList = list0
    upgSetList = list1
    makeStsEditMenu(main)
  }

  function move(x, y) {
    sx = x
    sy = y
    menuCntr.border.style.left = `${sx}px`
    menuCntr.border.style.top = `${sy}px`
  }

  let dvcStsSetList = []
  let upgSetList = []
  let sx = 10
  let sy = 10

  let dvcStsInfo = {
    srn: '',
    tCode: '',
    mdn: '',
    list: []
  }

  let upgInfo = {
    uCode: '',
    srn: '',
    list: []
  }

  const idInputDvcSrn = 'id-input-dvc-srn'
  const idInputDvcTCode = 'id-input-dvc-tcode'
  const idInputDvcMdn = 'id-input-dvc-mdn'
  const idTxtDivDvc = 'id-txt-div-dvc'
  const idTxtDivUpgUCode = 'id-txt-div-upg-ucode'
  const idTxtDivUpgSrn = 'id-txt-div-upg-srn'
  const idDivUpgStep = 'id-div-upg-step'

  let dvcStsCount = 0
  let upgStepCount = 0
  let upgStepStsCount = 0

  let menuCntr
  let dvcStsCntr
  let upgStpCntr

  function makeStsEditMenu(main) {
    const cntr = createContainer()
    menuCntr = cntr
    main.appendChild(cntr.border)
    cntr.border.style.width = '500px'
    cntr.border.style.position = 'absolute'
    cntr.border.style.left = `${sx}px`
    cntr.border.style.top = `${sy}px`

    makeLoadMenu(cntr.content)
    makeDvcSts(cntr.content)
    makeUpg(cntr.content)
  }

  function makeLoadMenu(menu) {
    const cntr = createContainer()
    menu.appendChild(cntr.border)
    const idInput = 'id-input-srn-load'
    makeInputTextBtn(idInput, cntr.content, 'srn: ', 'load',
      () => {
        const srn = getInputValue(idInput)
        const dvcStsSet = dvcStsSetList.find(s => s.split('/')[0] === srn)
        const upgSet = upgSetList.find(s => s.split('/')[1] === srn)
        dvcStsInfo = createDvcStsInfo(dvcStsSet)
        upgInfo = createUpgInfo(upgSet)
        changeInputValue(idInputDvcSrn, dvcStsInfo.srn)
        changeInputValue(idInputDvcTCode, dvcStsInfo.tCode)
        changeInputValue(idInputDvcMdn, dvcStsInfo.mdn)
        updateTxtDiv()
        for (const sts of dvcStsInfo.list) addDvcSts(dvcStsCntr, sts)
        for (const stp of upgInfo.list) addStep(upgStpCntr, stp)
        for (const stp of upgInfo.list) {
          const divId = `${idDivUpgStep}-${stp.i}`
          const div = document.getElementById(divId)
          for (const sts of stp.list) addStepSts(stp.i, div, stp, sts)
        }
      })
  }

  function makeDvcSts(menu) {
    const cntr = createContainer()
    dvcStsCntr = cntr
    menu.appendChild(cntr.border)

    makeInputTextBtn(idInputDvcSrn, cntr.content, 'srn: ', 'change',
      () => {
        dvcStsInfo.srn = getInputValue(idInputDvcSrn)
        updateTxtDiv()
      })
    makeInputTextBtn(idInputDvcTCode, cntr.content, 'tCode: ', 'change',
      () => {
        dvcStsInfo.tCode = getInputValue(idInputDvcTCode)
        updateTxtDiv()
      })
    makeInputTextBtn(idInputDvcMdn, cntr.content, 'mdn: ', 'change',
      () => {
        dvcStsInfo.mdn = getInputValue(idInputDvcMdn)
        updateTxtDiv()
      })
    makeSimpleTxtDiv(idTxtDivDvc, cntr.content, 'srn: , tCode: , mdn: ')
    makeBtnGroup(cntr.content, [
      { id: 'id-btn-dvc-sts-add', labelTxt: 'add',
        onClick: () => {
          addDvcSts(cntr)
        } },
      { id: 'id-btn-dvc-sts-print', labelTxt: 'print',
        onClick: () => {
          console.log(dvcStsInfo)
          console.log(createDvcStsStrSet(dvcStsInfo))
        } },
      { id: 'id-btn-dvc-sts-save', labelTxt: 'save',
        onClick: () => {
          const str = createDvcStsStrSet(dvcStsInfo)
          saveString(dvcStsInfo.srn, str)
        } }
    ])
  }

  function updateTxtDiv() {
    let hasSrn = false
    const set = dvcStsSetList.find(s => s.split('/')[0] === dvcStsInfo.srn)
    if (set) hasSrn = true
    let str = `srn: [${dvcStsInfo.srn}], tCode: [${dvcStsInfo.tCode}], mdn: [${dvcStsInfo.mdn}]`
    if (hasSrn) str = `(already has) ${str}`
    for (const sts of dvcStsInfo.list) {
      str += `, ${sts.code}: ${sts.value}`
    }
    changeSimpleTxtDiv(idTxtDivDvc, str)
    changeSimpleTxtDiv(idTxtDivUpgUCode, `upgSet uCode: [upg-set-${dvcStsInfo.srn}]`)
    changeSimpleTxtDiv(idTxtDivUpgSrn, `srn: [${dvcStsInfo.srn}]`)
    upgInfo.uCode = `upg-set-${dvcStsInfo.srn}`
    upgInfo.srn = dvcStsInfo.srn
  }

  function addDvcSts(cntr, stsInfo=null) {
    const i = dvcStsCount++
    let sts = stsInfo
    if (!sts) {
      sts = { code: '', value: 0 }
      dvcStsInfo.list.push(sts)
    }
    const idDiv = `id-div-sts-${i}`
    const idInputCode = `id-input-code-${i}`
    const idInputValue = `id-input-value-${i}`
    const div = createContentDiv()
    div.id = idDiv
    cntr.content.appendChild(div)
    makeInputText(idInputCode, div, 'code: ', () => {})
    changeInputValue(idInputCode, sts.code)
    makeInputNum(idInputValue, div, 'value: ', sts.value, () => {})
    makeBtnGroup(div, [
      { id: `id-btn-dvc-sts-change-${i}`, labelTxt: 'change',
        onClick: () => {
          sts.code = getInputValue(idInputCode)
          sts.value = getInputValue(idInputValue)
          updateTxtDiv()
        } },
      { id: `id-btn-dvc-sts-remove-${i}`, labelTxt: 'remove',
        onClick: () => {
          div.remove()
          const index = dvcStsInfo.list.indexOf(sts)
          dvcStsInfo.list.splice(index, 1)
          updateTxtDiv()
        } }
    ])
    updateTxtDiv()
  }

  function makeUpg(menu) {
    const cntr = createContainer()
    upgStpCntr = cntr
    menu.appendChild(cntr.border)
    makeSimpleTxtDiv(idTxtDivUpgUCode, cntr.content, `upgSet uCode: [upg-set-${dvcStsInfo.srn}]`)
    makeSimpleTxtDiv(idTxtDivUpgSrn, cntr.content, `srn: [${dvcStsInfo.srn}]`)
    makeBtnGroup(cntr.content, [
      { id: 'id-btn-upg-step-add', labelTxt: 'add step',
        onClick: () => {
          addStep(cntr)
        } },
      { id: 'id-btn-upg-step-print', labelTxt: 'print',
        onClick: () => {
          console.log(upgInfo)
          console.log(createUpgStrSet(upgInfo))
        } },
      { id: 'id-btn-upg-step-save', labelTxt: 'save',
        onClick: () => {
          const str = createUpgStrSet(upgInfo)
          saveString(upgInfo.uCode, str)
        } }
    ])
  }

  function addStep(cntr, stp=null) {
    const i = upgStepCount++
    let stpInfo = stp
    if (!stpInfo) {
      stpInfo = {
        i: i,
        step: upgInfo.list.length + 1,
        list: []
      }
      upgInfo.list.push(stpInfo)
    } else {
      stpInfo.i = i
    }
    const div = createContentDiv()
    div.id = `${idDivUpgStep}-${i}`
    cntr.content.appendChild(div)
    makeBtnGroup(div, [
      { id: `id-btn-upg-step-${i}-sts-add`, labelTxt: `step[${stpInfo.step}] add sts`,
        onClick: () => {
          addStepSts(i, div, stpInfo)
        } },
      { id: `id-btn-upg-step-${i}-sts-remove`, labelTxt: 'remove',
        onClick: () => {
          div.remove()
          const index = upgInfo.list.indexOf(stpInfo)
          upgInfo.list.splice(index, 1)
          let step = 1
          for (const stp of upgInfo.list) {
            stp.step = step
            const btnId = `id-btn-upg-step-${stp.i}-sts-add`
            changeSimpleTxtDiv(btnId, `step[${stp.step}] add sts`)
            step++
          }
        } }
    ])
  }

  function addStepSts(i, div, stpInfo, stpStsInfo=null) {
    const stsI = upgStepStsCount++
    let stpSts = stpStsInfo
    if (!stpSts) {
      stpSts = { i: stsI, code: '', value: 0 }
      stpInfo.list.push(stpSts)
    }
    const stsDiv = createContentDiv()
    div.appendChild(stsDiv)
    const idTxtDiv = `id-txt-div-sts-${i}-${stsI}`
    const idInputCode = `id-input-code-${i}-${stsI}`
    const idInputValue = `id-input-value-${i}-${stsI}`
    makeSimpleTxtDiv(idTxtDiv, stsDiv, `code: [${stpSts.code}], value: [${stpSts.value}]`)
    makeInputTextBtn(idInputCode, stsDiv, 'code: ', 'change',
      () => {
        stpSts.code = getInputValue(idInputCode)
        changeSimpleTxtDiv(idTxtDiv, `code: [${stpSts.code}], value: [${stpSts.value}]`)
      })
    changeInputValue(idInputCode, stpSts.code)
    makeInputNumBtn(idInputValue, stsDiv, 'value: ', 'change',
      () => {
        stpSts.value = getInputValue(idInputValue)
        changeSimpleTxtDiv(idTxtDiv, `code: [${stpSts.code}], value: [${stpSts.value}]`)
      }, stpSts.value)
    makeBtnGroup(stsDiv, [
      { id: `id-btn-remove-sts-${i}-${stpInfo.i}`, labelTxt: 'remove',
        onClick: () => {
          stsDiv.remove()
          const stsIndex = stpInfo.list.indexOf(stpSts)
          stpInfo.list.splice(stsIndex, 1)
        } }
    ])
  }

  return {
    createMenu: createMenu,
    move: move,
    dvcStsInfo: dvcStsInfo,
    upgInfo: upgInfo
  }
}