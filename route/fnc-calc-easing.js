function getEasingType(i) {
  const list = getEasingTypeList()
  return list[i]
}

function getEasingTypeList() {
  return [
    'none',
    'quadratic-in','quadratic-out', 'quadratic-in-out',
    'cubic-in', 'cubic-out', 'cubic-in-out',
    'quartic-in', 'quartic-out', 'quartic-in-out',
    'quintic-in', 'quintic-out', 'quintic-in-out',
    'sinusoidal-in', 'sinusoidal-out', 'sinusoidal-in-out',
    'exponential-in', 'exponential-out', 'exponential-in-out',
    'circular-in', 'circular-out', 'circular-in-out'
  ]
}

function calcEasingDistance(type, frm, i, distance) {
  switch (type) {
    case 'quadratic-in': return calcDisQuadraticIn(frm, i, distance)
    case 'quadratic-out': return calcDisQuadraticOut(frm, i, distance)
    case 'quadratic-in-out': return calcDisQuadraticInOut(frm, i, distance)
    case 'cubic-in': return calcDisCubicIn(frm, i, distance)
    case 'cubic-out': return calcDisCubicOut(frm, i, distance)
    case 'cubic-in-out': return calcDisCubicInOut(frm, i, distance)
    case 'quartic-in': return calcDisQuarticIn(frm, i, distance)
    case 'quartic-out': return calcDisQuarticOut(frm, i, distance)
    case 'quartic-in-out': return calcDisQuarticInOut(frm, i, distance)
    case 'quintic-in': return calcDisQuinticIn(frm, i, distance)
    case 'quintic-out': return calcDisQuinticOut(frm, i, distance)
    case 'quintic-in-out': return calcDisQuinticInOut(frm, i, distance)
    case 'sinusoidal-in': return calcDisSinusoidalIn(frm, i, distance)
    case 'sinusoidal-out': return calcDisSinusoidalOut(frm, i, distance)
    case 'sinusoidal-in-out': return calcDisSinusoidalInOut(frm, i, distance)
    case 'exponential-in': return calcDisExponentialIn(frm, i, distance)
    case 'exponential-out': return calcDisExponentialOut(frm, i, distance)
    case 'exponential-in-out': return calcDisExponentialInOut(frm, i, distance)
    case 'circular-in': return calcDisCircularIn(frm, i, distance)
    case 'circular-out': return calcDisCircularOut(frm, i, distance)
    case 'circular-in-out': return calcDisCircularInOut(frm, i, distance)
    default: return distance
  }
}

// c x (t /= d) x t + b
function calcDisQuadraticIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * t * t
  return result
}
// -c x (t /= d) x (t - 2) + b
function calcDisQuadraticOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = -distance * t * (t - 2)
  return result
}
// if (t /= d/2 < 1) c/2 x t x t + b
// else -c / 2 x ((--t) x (t-2) - 1) + b
function calcDisQuadraticInOut(frm, i, distance) {
  let t = (i + 1) / (frm / 2)
  let result = 0
  if (t < 1) {
    result = distance / 2 * t * t
  } else {
    result = -distance / 2 * ((t-1) * (t-3) - 1)
  }
  return result
}
// c x Math.pow(t/d, 3) + b
function calcDisCubicIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * Math.pow(t, 3)
  return result
}
// c x (Math.pow(t/d - 1, 3) + 1) + b
function calcDisCubicOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * (Math.pow(t - 1, 3) + 1)
  return result
}
// if (t /= d/2 <1) c/2 * Math.pow(t, 3) + b
// else c / 2 x (Math.pow(t - 2, 3) + 2) + b
function calcDisCubicInOut(frm, i, distance) {
  let t = (i + 1) / (frm / 2)
  let result = 0
  if (t < 1) {
    result = distance / 2 * Math.pow(t, 3)
  } else {
    result = distance / 2 * (Math.pow(t - 2, 3) + 2)
  }
  return result
}
// Quartic :
//      in: c x Math.pow(t/d, 4) + b
//      out: -c x (Math.pow(t/d - 1, 4) - 1) + b
//      inOut:
//        if (t /= d/2 <1) c/2 x Math.pow(ct, 4) + b
//        else -c/2 x (Math.pow(t - 2, 4) - 2) + b
// c x Math.pow(t/d, 4) + b
function calcDisQuarticIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * Math.pow(t, 4)
  return result
}
// -c x (Math.pow(t/d - 1, 4) - 1) + b
function calcDisQuarticOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = -distance * (Math.pow(t - 1, 4) - 1)
  return result
}
// if (t /= d/2 <1) c/2 x Math.pow(ct, 4) + b
// else -c/2 x (Math.pow(t - 2, 4) - 2) + b
function calcDisQuarticInOut(frm, i, distance) {
  let t = (i + 1) / (frm / 2)
  let result = 0
  if (t < 1) {
    result = distance / 2 * Math.pow(t, 4)
  } else {
    result = -distance / 2 * (Math.pow(t - 2, 4) - 2)
  }
  return result
}
// Quintic :
//      in: c x Math.pow(t/d, 5) + b
//      out: c x (Math.pow(t/d - 1, 5) + 1) + b
//      inOut:
//        if (t /= d/2 <1) c/2 x Math.pow(t, 5) + b
//        else c/2 x (Math.pow(t - 2, 5) + 2) + b
// c x Math.pow(t/d, 5) + b
function calcDisQuinticIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * Math.pow(t, 5)
  return result
}
// c x (Math.pow(t/d - 1, 5) + 1) + b
function calcDisQuinticOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * (Math.pow(t - 1, 5) + 1)
  return result
}
// if (t /= d/2 <1) c/2 x Math.pow(t, 5) + b
// else c/2 x (Math.pow(t - 2, 5) + 2) + b
function calcDisQuinticInOut(frm, i, distance) {
  let t = (i + 1) / (frm / 2)
  let result = 0
  if (t < 1) {
    result = distance / 2 * Math.pow(t, 5)
  } else {
    result = distance / 2 * (Math.pow(t - 2, 5) + 2)
  }
  return result
}
// Sinusoidal :
//      in: c x (1 - Math.cos(t/d x (Math.PI/2))) + b
//      out: c x Math.sin(t/d x (Math.PI/2)) + b
//      inOut: c/2 x (1 - Math.cos(Math.PI x t/d)) + b
// c x (1 - Math.cos(t/d x (Math.PI/2))) + b
function calcDisSinusoidalIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * (1 - Math.cos(t * (Math.PI/2)))
  return result
}
// c x Math.sin(t/d x (Math.PI/2)) + b
function calcDisSinusoidalOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * Math.sin(t * (Math.PI/2))
  return result
}
// c/2 x (1 - Math.cos(Math.PI x t/d)) + b
function calcDisSinusoidalInOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance / 2 * (1 - Math.cos(Math.PI * t))
  return result
}
// Exponential :
//      in: c x Math.pow(2, 10 x (t/d - 1)) + b
//      out: c x (-Math.pow(2, -10 x t/d) + 1) + b
//      inOut:
//        if (t /= d/2 < 1) c/2 x Math.pow(2, 10 x (t-1))
//        else c/2 x (-Math.pow(2, -10 x --t) + 2) + b
// c x Math.pow(2, 10 x (t/d - 1)) + b
function calcDisExponentialIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * Math.pow(2, 10 * (t - 1))
  return result
}
// c x (-Math.pow(2, -10 x t/d) + 1) + b
function calcDisExponentialOut(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * (-Math.pow(2, -10 * t) + 1)
  return result
}
// if (t /= d/2 < 1) c/2 x Math.pow(2, 10 x (t-1))
// else c/2 x (-Math.pow(2, -10 x --t) + 2) + b
function calcDisExponentialInOut(frm, i, distance) {
  let t = (i + 1) / (frm / 2)
  let result = distance * (-Math.pow(2, -10 * t) + 1)
  return result
}
// Circular :
//      in: c x (1 - Math.sqrt(1 - (t/=d) x t)) + b
//      out: c x Math.sqrt(1 - (t /= d - 1) x t) + b
//      inOut:
//        if (t /= d/2 < 1) c/2 x (1 - Math.sqrt(1 - t x t)) + b
//        else c / 2 x (Math.sqrt(1 - (t -= 2) x t) + 1) + b
// c x (1 - Math.sqrt(1 - (t/=d) x t)) + b
function calcDisCircularIn(frm, i, distance) {
  let t = (i + 1) / frm
  let result = distance * (1 - Math.sqrt(1 - t * t))
  return result
}
// c x Math.sqrt(1 - (t /= d - 1) x t) + b
function calcDisCircularOut(frm, i, distance) {
  let t = (i + 1) / (frm - 1)
  let result = distance * Math.sqrt(1 - t * t)
  return result
}
// if (t /= d/2 < 1) c/2 x (1 - Math.sqrt(1 - t x t)) + b
// else c / 2 x (Math.sqrt(1 - (t -= 2) x t) + 1) + b
function calcDisCircularInOut(frm, i, distance) {
  let t = (i + 1) / (frm / 2)
  let result = 0
  if (t < 1) {
    result = distance / 2 * (1 - Math.sqrt(1 - t * t))
  } else {
    result = distance / 2 * (Math.sqrt(1 - (t - 2) * (t - 2)) +1)
  }
  return result
}