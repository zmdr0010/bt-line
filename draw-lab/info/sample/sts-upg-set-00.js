// uCode/mdn code/sts num/sts code,tCode,value/... list
//    sts code,tCode,value -> length: 3 -> add type
//    sts code,tCode,value,rate sts code,rate tCode -> length: 5 -> rate type
// /upg num/step/sts num/sts code,tCode,.../sts code,tCode, ... sts list(sts num)/step/sts num/ ... upg list(upg num)
const stsUpgSetList00 = [
  // sample to test psh-pwr hit check
  'smp-sts-upg-00/test-dvc-00/6/drb,main,50/atk,main,10/spd,main,1/psh-pwr,main,5/bnc-atk-rate,main,0.5,atk,main/psh-atk-rate,main,1.0,atk,main/0',
  'smp-sts-upg-01/test-dvc-01/6/drb,main,60/atk,main,10/spd,main,1/psh-pwr,main,6/bnc-atk-rate,main,0.6,atk,main/psh-atk-rate,main,1.0,atk,main/0',
  'smp-sts-upg-02/test-dvc-02/6/drb,main,40/atk,main,12/spd,main,2/psh-pwr,main,4/bnc-atk-rate,main,1.0,atk,main/psh-atk-rate,main,1.0,atk,main/0',
  // '',
]