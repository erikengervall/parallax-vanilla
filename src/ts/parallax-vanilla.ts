import '../less/parallax-vanilla.less'
import init from './init'
import translate from './translate'
import resize from './resize'

interface Window {
  raf?: any
  pv?: any
  orientation: any
  requestAnimationFrame?: (..._: any) => any
  webkitRequestAnimationFrame?: (..._: any) => any
  mozRequestAnimationFrame?: (..._: any) => any
  setTimeout: (..._: any) => any
  onresize: any
}

;((window: Window) => {
  const defineParallaxVanilla = () => {
    const pv: any = { init }
    window.pv = pv // exposes init function to user

    if (typeof window.orientation === 'undefined') {
      window.onresize = () => resize()
    }

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
      translate()
      window.raf(mainLoop)
    }

    // Initialize main loop
    window.raf(mainLoop)

    return pv
  }

  // Define pv
  if (typeof window.pv === 'undefined') {
    window.pv = defineParallaxVanilla()
    console.log('%c parallax-vanilla defined.', 'color: green')
  } else {
    console.log('%c parallax-vanilla already defined.', 'color: red')
  }
})(window)
