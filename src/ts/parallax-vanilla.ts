import '../less/parallax-vanilla.less'
import { defaultSettings } from './constants'
import { init } from './init'
import { PV, Window } from './types'
import { resize } from './resize'
import { translate } from './translate'

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(window => {
  const defineParallaxVanilla = () => {
    const pv: PV = {
      init,
      containerArr: [],
      mostReContainerInViewport: -1,
      prevScrollTop: -1,
      settings: defaultSettings,
      windowProps: {
        scrollTop: -1,
        windowHeight: -1,
        windowMidHeight: -1,
      },
    }

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
})((window as unknown) as Window)
