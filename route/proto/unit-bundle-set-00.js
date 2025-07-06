//unit-ucode/sx, sy (from base-p)/hp,atk,dfc,spd/color,size-w,size-h
const unitBundleSet00 = 'unit-00/-10,-10/30,10,6,5/red,20,20\n' +
  // separator
  '===\n' +
  // cndt-set
  // code/route-i/shtr-i/next-cndtn-i (0: start, 1: end <- fix)
  'start/0/-1/2\n' +
  'end/1/-1/-1\n' +
  'cdtn-00/2/0/3\n' +
  'cdtn-01/3/-1/4\n' +
  'cdtn-02/4/-1/2\n' +
  '===\n' +
  // route-set list (per 3 lines)
  // rotate-i,degree,target-type,target-dx,target-dy
  // piece-set-code/num/n(2: 2x2, 3: 3x3),piece-str,size-w,size-h,size-w,size-h,...([{w,h},...] line-i % list-length )
  // mask-set-code/num/frame,easing-i/frame,easing-i/... (line-i % list-length)
  '0,0,none,0,0\n' +
  'pc-00/1/2,03,90,90\n' +
  'mask-00/6/20,2/24,2/18,4/22,5/16,7/18,8\n' +
  '0,0,none,0,0\n' +
  'pc-00/1/2,03,190,190\n' +
  'mask-00/6/20,2/24,2/18,4/22,5/16,7/18,8\n' +
  '0,0,none,0,0\n' +
  'pc-01/2/2,01,90,90/3,01436758,90,90,30,30,100,100,50,50,60,60,90,90\n' +
  'mask-00/8/10,1/14,2/8,4/12,5/14,7/12,7/10,8/14,9\n' +
  '0,0,none,0,0\n' +
  'pc-01/2/2,01,90,90/3,25746,90,90\n' +
  'mask-00/8/10,1/14,2/8,4/12,5/14,7/12,7/10,8/14,9\n' +
  '0,0,none,0,0\n' +
  'pc-01/5/2,320,90,90/3,1376,90,90/2,320,90,90/2,20,90,120/3,64012,100,100\n' +
  'mask-00/8/10,1/14,2/8,4/12,5/14,7/12,7/10,8/14,9\n' +
  '===\n' +
  // shtr-num
  '1\n' +
  '===\n' +
  // shtr-dx,dy,shtr-type (normal / mv / fix),sht-start-frame (-1: last, 0: first, n)
  '10,10,mv,0\n' +
  // tan-set num
  // next num lines
  '2\n' +
  // tan-set
  // atk,color,size-w,size-h
  '3,blue,10,10\n' +
  '5,green,13,13\n' +
  // tan-route-set
  // next 3 x num lines
  // rotate-i,degree,target-type,target-dx,target-dy
  // piece-set-code/num/n(2: 2x2, 3: 3x3),piece-str,size-w,size-h,size-w,size-h,...([{w,h},...] line-i % list-length )
  // mask-set-code/num/frame,easing-i/frame,easing-i/... (line-i % list-length)
  '0,0,none,0,0\n' +
  'pc-00/1/3,031546,30,150,20,40,30,130,40,60,10,110\n' +
  'msk-00/5/10,1/4,2/8,2/4,5/6,6\n' +
  '0,0,none,0,0\n' +
  'pc-01/1/3,154037,30,150,20,40,-30,-130,10,60,-16,110\n' +
  'msk-01/5/10,1/4,2/8,2/4,5/6,6\n' +
  // tan-intv-ucode/num/frame/tan-i-list-num(=num)/i/i/...
  'tan-intv-00/3/10/3/0/1/0\n' +
  // sht-ucode/num/intv-frame/reload-num/reload-frame/target,dx,dy/tan-route-i-list-num(=num)/i/i/...
  'sht-00/3/40/5/30/target,50,50/3/0/1/0\n' +
  // shtr-type = mv
  // skl-mv-route
  // last 3 lines
  // rotate-i,degree,target-type,target-dx,target-dy
  // piece-set-code/num/n(2: 2x2, 3: 3x3),piece-str,size-w,size-h,size-w,size-h,...([{w,h},...] line-i % list-length )
  // mask-set-code/num/frame,easing-i/frame,easing-i/... (line-i % list-length)
  '0,0,target,0,0\n' +
  'mv-skl-pc-00/1/3,031546,90,90,50,50,40,70,60,60,50,50\n' +
  'mv-skl-msk-00/6/34,1/34,2/36,4/34,5/36,7/32,8'