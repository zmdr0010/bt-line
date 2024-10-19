const bkI0 = {
  uCode: '',
  tCode: 'bk-i-0',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: { // has -> override parent calcJrcInfo
    list: [
      { target: 'bk-i-0', key: 'bk-i-0_bk-i-1', jrcType: 'g', x: 50, y: 50 }
    ]
  },
  transInfo: null, // in device -> apply to child
  // transInfo: {
  //   list: [
  //     {
  //       type: 'scale',
  //       scaleX: 0.21,
  //       scaleY: 0.21
  //     },
  //     {
  //       type: 'rotate',
  //       degree: -80
  //     }
  //   ]
  // }
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const bkI1 = {
  uCode: '',
  tCode: 'bk-i-1',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: { // has -> override parent calcJrcInfo
    list: [
      { target: 'bk-i-1', key: 'bk-i-0_bk-i-1', jrcType: 'm', x: 50, y: 50 }
    ]
  },
  transInfo: null, // in device -> apply to child
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const bk = {
  uCode: '',
  tCode: 'bk',
  type: 'device', // device / part
  lineUCode: '',
  child: [ // device: device has part or device
    bkI0, bkI1
  ],
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: { // device
    list: [
      { target: 'bk-i-0', key: 'bk-i-0_bk-i-1', jrcType: 'g', x: 0, y: 0 },
      { target: 'bk-i-1', key: 'bk-i-0_bk-i-1', jrcType: 'm', x: 0, y: 0 }
    ]
  }
}

const b1I0 = {
  uCode: '',
  tCode: 'b1-i-0',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const b1I1 = {
  uCode: '',
  tCode: 'b1-i-1',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const b1 = {
  uCode: '',
  tCode: 'b1',
  type: 'device', // device / part
  lineUCode: '',
  child: [ // device: device has part or device
    b1I0, b1I1
  ],
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: { // device
    list: [
      { target: 'b1-i-0', key: 'b1-i-0_b1-i-1', jrcType: 'g', x: 20, y: 30 },
      { target: 'b1-i-1', key: 'b1-i-0_b1-i-1', jrcType: 'm', x: 50, y: 50 }
    ]
  }
}

const cI0 = {
  uCode: '',
  tCode: 'c-i-0',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const cI1 = {
  uCode: '',
  tCode: 'c-i-1',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const c = {
  uCode: '',
  tCode: 'c',
  type: 'device', // device / part
  lineUCode: '',
  child: [ // device: device has part or device
    cI0, cI1
  ],
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: { // device
    list: [
      { target: 'c-i-0', key: 'c-i-0_c-i-1', jrcType: 'g', x: 20, y: 30 },
      { target: 'c-i-1', key: 'c-i-0_c-i-1', jrcType: 'm', x: 50, y: 50 }
    ]
  }
}

const t000 = {
  uCode: '',
  tCode: 't000',
  type: 'device', // device / part
  lineUCode: '',
  child: [ // device: device has part or device
    bk, b1, c
  ],
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: { // device
    list: [
      { target: 'c', key: 'c_bk', jrcType: 'g', x: 20, y: 30 },
      { target: 'c', key: 'c_b1', jrcType: 'g', x: 50, y: 50 },
      { target: 'bk', key: 'c_bk', jrcType: 'm', x: 20, y: 30 },
      { target: 'b1', key: 'c_b1', jrcType: 'm', x: 50, scy: 50 },
    ]
  }
}

const armor = {
  uCode: '',
  tCode: 'armor',
  type: 'part', // device / part
  lineUCode: '',
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: null, // device
  child: [] // device: device has part or device
}

const t000Armor = {
  uCode: '',
  tCode: 't000_armor',
  type: 'device', // device / part
  lineUCode: '',
  child: [ // device: device has part or device
    t000, armor
  ],
  jrcInfo: null, // has -> override parent calcJrcInfo
  transInfo: null, // in device -> apply to child
  calcJrcInfo: { // device
    list: [
      { target: 't000', key: 't000_armor', jrcType: 'g', x: 50, y: 50 },
      { target: 'armor', key: 't000_armor', jrcType: 'm', x: 100, y: 100 }
    ]
  }
}

// child: bk, b2, br, b1, bl, c, b0, l
// calcJrc: c, b1 <- bk, b0, b2, br, bl

// device structure strSet
// tCode/child num/child tCode,tCode,tCode ... list /calc key num/key,key,key ... list
//     tCode = uCode
//     calc key: gTCode_mTCode -> create calcJrcInfo
//     no tCode in device list -> part -> create part set
//     child num: 0 or length: 1 (tCode) -> part

// bundle set
//  tCode
//  tCode
//  tCode/child num/child tCode,tCode/calc key num/key,key
//  tCode/child num/child tCode,tCode/calc key num/key,key
//  ...
// order: parent device, device, part <- create from last (bottom)

// dvc: device
const dvcTCodeStrSetList = [
  'bk/3/bkI0,bkI1,bkI2/2/bkI0_bkI1,bkI0_bkI2',
  'b2/4/b2I0,b2I1,b2I2,b2I3/3/b2I0_b2I1,b2I0_b2I2,b2I0_b2I3',
  'br/5/brI0,brI1,brI2,brI3,brI4/4/brI0_brI1,brI0_brI2,brI0_brI3,brI0_brI4',
  'b1/3/b1I0,b1I1,b1I2/2/b1I0_b1I1,b1I0_b1I2',
  'bl/5/blI0,blI1,blI2,blI3,blI4/4/blI0_blI1,blI0_blI2,blI0_blI3,blI0_blI4',
  'c/6/cI0,cI1,cI2,cI3,cI4,cI5/5/cI0_cI1,cI0_cI2,cI0_cI3,cI0_cI4,cI0_cI5',
  'b0/3/b0I0,b0I1,b0I2/2/b0I0_b0I1,b0I0_b0I2',
  'l/5/lI0,lI1,lI2,lI3,lI4/4/lI0_lI1,lI0_lI2,lI0_lI3,lI0_lI4',
  't000/8/bk,b2,br,b1,bl,c,b0,l/7/c_l,c_bk,c_b1,b1_b0,b1_b2,b1_br,b1_bl'
]