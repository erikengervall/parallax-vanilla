;(window => {
  const defineParallaxVanilla = () => {
    let pv = {}

    Object.assign(pv, require('./help-functions'))
    Object.assign(pv, require('./constants'))

    /**
		 * Primary data handler for containers and blocks.
		 * @type {Array}
		 * @structure
		 * pvArr = [
		 * 	obj : {
		 * 		container : {
		 * 			el : HTML-element,
		 * 			offset : offsetTop,
		 * 			height : clientHeight
		 * 		},
		 * 		blocks : [
		 * 			block : {
		 * 				el : HTML-element,
		 * 				speed : getAttr('pv-speed')
     *        mediatype: getAttr('pv-mediatype'),
     *        mediapath: getAttr('pv-mediapath'),
		 * 			}
		 * 		]
		 * 	}
		 * ]
		 */
    pv.pvArr = []
    pv.windowProps = {}
    pv.init = require('./init')
    pv.translate = require('./translate')
    pv.resize = require('./resize')

    window.onresize = () => pv.resize()

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

    //Main loop for updating variables and performing translates
    const updateLoop = () => {
      pv.translate()
      raf(updateLoop)
    }

    // Initialize main loop
    raf(updateLoop)

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
