const test = require('./test')
test()
;(window => {
  /**
   * Defines pv
   * @return {Object} pv object
   */
  const defineParallaxVanilla = () => {
    const videoExtensions = [
      '3g2',
      '3gp',
      'asf',
      'avi',
      'flv',
      'h264',
      'm4v',
      'mov',
      'mp4',
      'mpg',
      'mpeg',
      'rm',
      'srt',
      'swf',
      'vow',
      'vob',
      'wmv',
    ]

    /**
  	 * [Library object]
  	 * @type {Object}
  	 */
    let pv = {}

    /**
  	 * Checks if String argument consists exclusively of numbers
  	 * @param  {String}  arg String to check
  	 * @return {Boolean}     True if String consists exclusively of numbers
  	 */
    pv.stringOfIntegers = arg => {
      return /^[0-9]+$/.test(arg)
    }

    /**
		 * Transform prefixes for CSS
		 * @param  {HTML-element} element A para-block element
		 * @param  {CSS-style} style   E.g. 'transform3d(x, y, z)'
		 */
    pv.transform = (element, style) => {
      element.style.webkitTransform = style
      element.style.MozTransform = style
      element.style.msTransform = style
      element.style.OTransform = style
      element.style.transform = style
    }

    /**
		 * Primary data handler for containers and blocks.
		 * @type {Array}
		 * @structure
		 * paraArr = [
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
    pv.paraArr = []

    /**
  	 * Window properties
  	 * @type {Object}
  	 */
    pv.windowProps = {
      scrollTop: window.scrollY,
      windowHeight: window.innerHeight,
      windowMidHeight: window.innerHeight / 2,
    }

    /**
		 * Update selected attributes in windowProps on window raf event
		 */
    pv.updateWindowProps_OnRaf = () => {
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop
    }

    /**
		 * Update selected attributes in pv.windowProps on window resize event
		 */
    pv.updateWindowProps_OnResize = () => {
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop
      pv.windowProps.windowHeight = window.innerHeight
      pv.windowProps.windowMidHeight = window.innerHeight / 2
    }

    /**
		 * Calculates the top offset from an element to the window's || document's top
		 * @param  {HTML-element} el A pv-block element
		 * @return {Int}    The element's top offset to document.
		 * Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
		 */
    pv.offsetTop = el => {
      let rectTop = el.getBoundingClientRect().top,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return rectTop + scrollTop
    }

    /**
		 * Initialize pv.paraArr
		 * @param  {Object} settings User settings
		 */
    pv.init = settings => {
      const defaultSettings = {
        container: {
          class: 'pv-container',
          height: '250px',
        },
        block: {
          class: 'pv-block',
          speed: -Math.PI,
          mediatype: 'image',
          mediapath: undefined,
        },
      }

      settings = settings || defaultSettings
      settings.container = settings.container || defaultSettings.container
      settings.container.class = settings.container.class
        ? settings.container.class.toLowerCase()
        : defaultSettings.container.class
      settings.container.height = settings.container.height || defaultSettings.container.height
      settings.block = settings.block || defaultSettings.block
      settings.block.class = settings.block.class
        ? settings.block.class.toLowerCase()
        : defaultSettings.block.class
      settings.block.speed = settings.block.speed || defaultSettings.block.speed
      settings.block.mediatype = settings.block.mediatype
        ? settings.block.mediatype.toLowerCase()
        : defaultSettings.block.mediatype
      settings.block.mediapath = settings.block.mediapath || defaultSettings.block.mediapath

      const containers = document.getElementsByClassName(settings.container.class)
      for (let i = 0; i < containers.length; i++) {
        let obj = {}
        let container = {}

        container.el = containers[i]
        container.offset = pv.offsetTop(container.el)

        let attrContainerHeight = container.el.getAttribute('pv-height')
        if (attrContainerHeight == null) {
          container.el.style.height = settings.container.height
        } else {
          if (pv.stringOfIntegers(attrContainerHeight)) {
            // string only consists of integers, add px
            container.el.style.height = attrContainerHeight + 'px'
          } else {
            // string has more than integers, assume suffix is either px or vh
            let suffix = attrContainerHeight.substr(
              attrContainerHeight.length - 2,
              attrContainerHeight.length
            )
            if (suffix == 'px' || suffix == 'vh') {
              container.el.style.height = attrContainerHeight
            } else {
              throw new Error('Invalid height')
            }
          }
        }

        container.height = container.el.clientHeight

        obj.container = container

        obj.blocks = []
        const blocks = containers[i].getElementsByClassName(settings.block.class)
        for (let j = 0; j < blocks.length; j++) {
          let block = {}
          block.el = blocks[j]

          const attrSpeed = block.el.getAttribute('pv-speed')
          if (attrSpeed == null) {
            block.speed = settings.block.speed
          } else {
            if (attrSpeed == 0 || attrSpeed == 0.0) {
              block.speed = settings.block.speed
            } else {
              block.speed = attrSpeed
            }
          }

          const attrMediaPath = block.el.getAttribute('pv-mediapath')

          // if (extension === -1) return console.error('Media files must have an extension')

          const attrMediaType = block.el.getAttribute('pv-mediatype')
          if (attrMediaPath) {
            block.mediapath = attrMediaPath
            if (attrMediaType) block.mediatype = attrMediaType
            if (pv.isVideo(attrMediaType, attrMediaPath)) {
              let videoEl = document.createElement('video')
              videoEl.src = attrMediaPath
              videoEl.autoPlay = true
              videoEl.type = 'video/' + extension
              videoEl.loop = true
              videoEl.muted = true
              block.el.appendChild(videoEl)
              block.isPlaying = true
              videoEl.play()
            } else {
              block.el.style.backgroundImage = "url('" + attrMediaPath + "')"
            }
          } else {
            console.error('Mediapath undefined for pv-block: ', block.el)
          }

          const backgroundImageFromDOM = window
            .getComputedStyle(block.el)
            .getPropertyValue('background-image')

          // if the pv-block for some reason does not have any image
          if (block.mediatype === 'image' && backgroundImageFromDOM == 'none') return

          // calculates the negative top property
          // negative scroll distance
          // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
          let top = 0
          let scrollDist = 0
          let paddingBottom = 0

          // if the pv-block offset is less than the windowheight, then the scrolldist will have to be recalculated
          if (container.offset < pv.windowProps.windowHeight) {
            scrollDist = (container.height + container.offset) / Math.abs(block.speed)

            if (block.speed > 0) {
              top = -Math.abs(container.offset)
              paddingBottom = container.height + container.offset
            } else {
              paddingBottom = scrollDist + container.height
            }

            // the pv-block is below the initial windowheight
          } else {
            scrollDist = (container.height + pv.windowProps.windowHeight) / Math.abs(block.speed)
            paddingBottom = scrollDist + container.height

            if (block.speed > 0) {
              top = -scrollDist
              paddingBottom = container.height + pv.windowProps.windowHeight / Math.abs(block.speed)
            } else {
              paddingBottom = scrollDist + container.height
            }
          }

          if (Math.abs(top) >= Math.abs(paddingBottom)) paddingBottom = Math.abs(top) + 1

          block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null)
          block.el.style.setProperty('margin-top', top + 'px', null)

          obj.blocks.push(block)
        } // end of for blocks

        pv.paraArr.push(obj)
      } // loop container
      // pp("pv.paraArr", pv.paraArr)
    }

    // checks if the parallax image is in viewport.
    pv.isInViewport = (offset, height) => {
      return (
        pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 &&
        pv.windowProps.scrollTop < offset + height
      )
    }

    pv.getExtension = attrMediaPath => {
      const extension = attrMediaPath
        .substr(attrMediaPath.lastIndexOf('.') + 1, attrMediaPath.length)
        .toLowerCase()
      extension === -1 ? console.log('Invalid extension') : extension
    }

    // returns {true} if media is a video
    pv.isVideo = (attrMediaType, attrMediaPath) => {
      return (
        attrMediaType === 'video' || videoExtensions.indexOf(pv.getExtension(attrMediaPath)) !== -1
      )
    }

    // translates the parallax blocks, creating the effect
    pv.translate = () => {
      // loop parallax blocks
      for (let i = 0; i < pv.paraArr.length; i++) {
        const containerObj = pv.paraArr[i].container
        let calc

        // check if parallax block is in viewport
        if (pv.isInViewport(containerObj.offset, containerObj.height)) {
          // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
          if (containerObj.offset < pv.windowProps.windowHeight) {
            calc = pv.windowProps.scrollTop

            // if the parallax is further down on the page
            // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
          } else {
            calc = pv.windowProps.windowHeight - containerObj.offset + pv.windowProps.scrollTop
          }

          for (let j = 0; j < pv.paraArr[i].blocks.length; j++) {
            const block = pv.paraArr[i].blocks[j]
            // if (!block.isPlaying) block.el.firstChild.play() // IF IS VIDEO

            // perform the transform
            pv.transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)')
          } // end of for blocks
        } else {
          // pause blocks with video
          for (let j = 0; j < pv.paraArr[i].blocks.length; j++) {
            let block = pv.paraArr[i].blocks[j]
            if (block.isPlaying) block.el.firstChild.pause()
          }
        } // end of isInViewport if
      } // end of for container
    } // translate

    // window resize event
    /**
	   * Window on resize event, updates pv.windowProps
	   */
    window.onresize = () => {
      pv.updateWindowProps_OnResize()
      pv.init()
    }

    /**
		 * Request animation frame
		 * Binds function to window
		 */
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

    /**
		 * Main loop for updating variables and performing translates
		 */
    const updateLoop = () => {
      pv.updateWindowProps_OnRaf()
      pv.translate()
      raf(updateLoop)
    }

    /**
		 * Initialize main loop
		 */
    raf(updateLoop)

    /**
		 * Returns the library
		 */
    return pv
  } // end of define_pv()

  /**
   * Define pv to window if not already done
   */
  if (typeof pv === 'undefined') {
    window.pv = defineParallaxVanilla()
    console.log('%c parallax-vanilla defined.', 'color: green')
  } else {
    console.log('%c parallax-vanilla already defined.', 'color: red')
  }
})(window)
