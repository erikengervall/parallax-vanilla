;(window => {
  const defineParallaxVanilla = () => {
    const pv = {}
    pv.init = require('./init') // exposes init function to user

    if (typeof window.orientation === 'undefined') window.onresize = () => require('./resize')()

    // Request animation frame, also binds function to window
    window.raf = (() => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60) // 60 FPS
        }
      )
    })()

    // Main loop for updating variables and performing translates
    const mainLoop = () => {
      require('./translate')()
      raf(mainLoop)
    }

    // Initialize main loop
    raf(mainLoop)

    return pv
  }

  // Define pv
  if (typeof pv === 'undefined') {
    window.pv = defineParallaxVanilla()
    console.log('%c parallax-vanilla defined.', 'color: green')
  } else {
    console.log('%c parallax-vanilla already defined.', 'color: red')
  }
})(window)
