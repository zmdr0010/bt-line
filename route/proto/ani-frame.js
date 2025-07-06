const FrHdBtAniFrame = {
  create: function (update=()=>{}, draw=()=>{}, dFps=30) {
    let isPlaying = false
    let lastTime = performance.now()
    let frameCount = 0
    let fps = 0
    let lastFrameTimeMs = 0
    const msPerFrame = 1000 / dFps

    function start() {
      isPlaying = true
      requestAnimationFrame(aniFrame)
    }

    function stop() {
      isPlaying = false
    }

    function updateFPS() {
      const now = performance.now()
      const delta = now - lastTime
      frameCount++
      if (delta >= 1000) { // 1s
        fps = Math.round((frameCount * 1000) / delta)
        lastTime = now
        frameCount = 0
      }
    }

    function aniFrame(timestamp) {
      if (!isPlaying) return
      requestAnimationFrame(aniFrame)
      if (dFps > 1) {
        if (timestamp < lastFrameTimeMs + msPerFrame) return
      }
      lastFrameTimeMs = timestamp
      updateFPS()
      update(timestamp)
      draw()
    }

    function getFpsInfo() {
      return {
        lastTime: lastTime,
        frameCount: frameCount,
        fps: fps,
        lastFrameTimeMs: lastFrameTimeMs,
        msPerFrame: msPerFrame,
        dFps: dFps
      }
    }

    function getIsPlaying() {
      return isPlaying
    }

    return {
      start: start,
      stop: stop,
      getFpsInfo: getFpsInfo,
      getIsPlaying: getIsPlaying
    }
  }
}