// 2d-canvas-coords
//
// rotate x axis (roll)
// [ 1   0      0   ]   [ x ]
// | 0 cos() -sin() |   | y |
// [ 0 sin()  cos() ]   [ z ]
//
// rotate y axis (pitch)
// [ cos()   0  sin() ]  [ x ]
// |    0    1    0   |  | y |
// [ -sin()  0  cos() ]  [ z ]
//
// rotate z axis (yaw)
// [ cos() -sin()  0 ]  [ x ]
// | sin()  cos()  0 |  | y |
// [    0     0    1 ]  [ z ]


// 3d-coords
//
// rotate x axis (roll)
// [ 1   0      0    ]   [ x ]
// | 0  cos()  sin() |   | y |
// [ 0 -sin()  cos() ]   [ z ]
//
// rotate y axis (pitch)
// [ cos()  0 -sin() ]  [ x ]
// |    0   1    0   |  | y |
// [ sin()  0  cos() ]  [ z ]
//
// rotate z axis (yaw)
// [ cos()  sin()  0 ]  [ x ]
// | -sin() cos()  0 |  | y |
// [    0     0    1 ]  [ z ]
//
function rotateXAxis(radian, x, y, z) {
  const rx = x
  const ry = Math.cos(radian) * y + Math.sin(radian) * z
  const rz = Math.sin(radian) * -1 * y + Math.cos(radian) * z
  return {
    x: rx,
    y: ry,
    z: rz
  }
}

function rotateYAxis(radian, x, y, z) {
  const rx = Math.cos(radian) * x + Math.sin(radian) * -1 * z
  const ry = y
  const rz = Math.sin(radian) * x + Math.cos(radian) * z
  return {
    x: rx,
    y: ry,
    z: rz
  }
}

function rotateZAxis(radian, x, y, z) {
  const rx = Math.cos(radian) * x + Math.sin(radian) * y
  const ry = Math.sin(radian) * -1 * x + Math.cos(radian) * y
  const rz = z
  return {
    x: rx,
    y: ry,
    z: rz
  }
}