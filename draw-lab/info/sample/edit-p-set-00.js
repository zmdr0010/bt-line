// edit-p-set
// uCode/raw uCode/szw/szh/color/lineColor/lineWidth/edit type/i num/i,i,i, ... list/edge type num/edge type,type ... list
const editPSet00List = [
  // 'edit-p-set-00/raw-sample-00/40/40/white/black/1/remove-p/3/10,12,23/0/',
  // 'edit-p-set-01/raw-sample-00/40/40/white/black/1/add-p/0//4/left-top,right-bottom,right-bottom-inside,left-top-inside',
  'edit-p-set-20241022145604/raw-20241021181810/20/20/Green/black/1/add-p/1/0/2/left-top,right-top',
  'edit-p-set-20241022145611/raw-20241021181435/20/20/OrangeRed/black/1/curve/1/0/1/left-top-inside',
  'edit-p-set-20241022145626/raw-20241021181507/20/20/MediumAquamarine/black/1/slice/1/0/2/left-bottom,right-bottom',

  'edit-p-set-20241022173619-0/raw-20241022173619-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022173619-1/raw-20241022173619-1/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241022175107-0/raw-20241022175107-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022175107-1/raw-20241022175107-1/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022175107-2/raw-20241022175107-2/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241022181831-0/raw-20241022181831-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022181831-1/raw-20241022181831-1/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022181831-2/raw-20241022181831-2/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241022182309-0/raw-20241022182309-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022182309-1/raw-20241022182309-1/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241022182309-2/raw-20241022182309-2/20/20/white/black/1/none/0//0/',

  // 'edit-p-set-20241023152955/raw-20241023151603/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241023152955/raw-20241023151603/20/20/Thistle/black/1/slice/1/0/4/left-top,right-top,left-bottom,right-bottom',
  // 'edit-p-set-20241023153006/raw-20241023143855/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241023153006/raw-20241023143855/20/20/SteelBlue/black/1/slice/1/0/2/left-top,right-top',
  // 'edit-p-set-20241023153013/raw-20241023143305/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241023153013/raw-20241023143305/20/20/SteelBlue/SteelBlue/1/slice/1/0/2/left-top,right-top',
  // 'edit-p-set-20241023153022/raw-20241023144452/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241023153022/raw-20241023144452/20/20/Peru/black/1/slice/1/0/4/left-top,right-top,left-bottom,right-bottom',
  'edit-p-set-20241023160501-0/raw-20241023143855/20/20/white/black/1/none/1/0/0/',
  'edit-p-set-20241023160501-1/raw-20241023143305/20/20/white/black/1/none/1/0/0/',
  'edit-p-set-20241023160501-2/raw-20241023151603/20/20/white/black/1/none/1/0/0/',
  'edit-p-set-20241023160501-3/raw-20241023144452/20/20/white/black/1/none/1/0/0/',

  'edit-p-set-20241024121927-0/raw-20241021181435/20/20/OrangeRed/black/1/curve/1/0/1/left-top-inside',
  'edit-p-set-20241024121927-1/raw-20241021181810/20/20/Green/black/1/add-p/1/0/2/left-top,right-top',
  'edit-p-set-20241024121927-2/raw-20241021181507/20/20/MediumAquamarine/black/1/slice/1/0/2/left-bottom,right-bottom',

  'edit-p-set-20241024125814-0/raw-20241022173619-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024125814-1/raw-20241022173619-1/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241024125955-0/raw-20241022175107-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024125955-1/raw-20241022175107-1/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024125955-2/raw-20241022175107-2/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241024130234-0/raw-20241022181831-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024130234-1/raw-20241022181831-1/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024130234-2/raw-20241022181831-2/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241024130507-0/raw-20241022182309-0/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024130507-1/raw-20241022182309-1/20/20/white/black/1/none/0//0/',
  'edit-p-set-20241024130507-2/raw-20241022182309-2/20/20/white/black/1/none/0//0/',

  'edit-p-set-20241024130757-0/raw-20241023143855/20/20/SteelBlue/black/1/slice/1/0/2/left-top,right-top',
  'edit-p-set-20241024130757-1/raw-20241023143305/20/20/SteelBlue/SteelBlue/1/slice/1/0/2/left-top,right-top',
  'edit-p-set-20241024130757-2/raw-20241023151603/20/20/Thistle/black/1/slice/1/0/4/left-top,right-top,left-bottom,right-bottom',
  'edit-p-set-20241024130757-3/raw-20241023144452/20/17/Peru/black/1/slice/1/0/4/left-top,right-top,left-bottom,right-bottom',

  'edit-p-set-20241024131318-0/raw-20241023143855/20/20/white/black/1/none/1/0/0/',
  'edit-p-set-20241024131318-1/raw-20241023143305/20/20/white/black/1/none/1/0/0/',
  'edit-p-set-20241024131318-2/raw-20241023151603/20/20/white/black/1/none/1/0/0/',
  'edit-p-set-20241024131318-3/raw-20241023144452/20/20/white/black/1/none/1/0/0/',

  'edit-p-set-20241029190058/raw-20241021181305/20/20/MediumSlateBlue/black/1/add-p/1/0/2/right-top,left-bottom',

  'edit-p-set-20241030112653/raw-20241030112821/20/20/BlueViolet/black/1/none/1/0/0/',
  'edit-p-set-20241030112704/raw-20241030113111/20/20/Peru/black/1/none/1/0/0/',
  'edit-p-set-20241030112715/raw-20241030112927/20/20/RoyalBlue/black/1/none/1/0/0/',

  'edit-p-set-20241030133452/raw-20241030133518/10/10/MediumTurquoise/black/1/slice/1/0/3/left-top,right-bottom,left-bottom',
  'edit-p-set-20241030133811/raw-20241023180427/20/20/DarkSlateGrey/black/1/slice/1/0/1/left-top-inside',


  // '',
]