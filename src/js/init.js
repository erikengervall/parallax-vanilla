const { setContainerHeight } = require('./initContainer')
const {
  setBlockSpeed,
  setBlockMediatype,
  setBlockMediapath,
  setBlockVisual,
} = require('./initBlock')

module.exports = settings => {
  pv.windowProps = {
    scrollTop: window.scrollY,
    windowHeight: window.innerHeight,
    windowMidHeight: window.innerHeight / 2,
  }

  const { defaultSettings } = require('./constants')

  settings
    ? (settings = Object.assign(settings, defaultSettings))
    : (settings = Object.assign({}, defaultSettings))
  settings.container.class.toLowerCase()
  settings.block.class.toLowerCase()
  settings.block.mediatype.toLowerCase()

  const containers = document.getElementsByClassName(settings.container.class)
  for (let i = 0; i < containers.length; i++) {
    let pvObj = {}
    let container = {}

    container.el = containers[i]
    container.offset = pv.offsetTop(container.el)
    container.el.style.height = setContainerHeight(container, settings)
    container.height = container.el.clientHeight

    pvObj.container = container
    pvObj.blocks = []

    const blocks = containers[i].getElementsByClassName(settings.block.class)
    for (let j = 0; j < blocks.length; j++) {
      let block = {}

      block.el = blocks[j]
      block.speed = setBlockSpeed(block, settings)
      block.mediapath = setBlockMediapath(block, settings)
      block.mediatype = setBlockMediatype(block, settings)

      const successful = setBlockVisual(block)
      if (!successful) console.error('Did not successfully set media for block: ' + block)

      // calculates the negative top property
      // negative scroll distance
      // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
      let marginTop = 0
      let scrollDist = 0
      let paddingBottom = 0

      // if the pv-block offset is less than the windowheight, then the scrolldist will have to be recalculated
      if (container.offset < pv.windowProps.windowHeight) {
        scrollDist = (container.height + container.offset) / Math.abs(block.speed)

        if (block.speed > 0) {
          marginTop = -Math.abs(container.offset)
          paddingBottom = container.height + container.offset
        } else {
          paddingBottom = scrollDist + container.height
        }
      } else {
        // the pv-block is below the initial windowheight
        scrollDist = (container.height + pv.windowProps.windowHeight) / Math.abs(block.speed)
        paddingBottom = scrollDist + container.height

        if (block.speed > 0) {
          marginTop = -scrollDist
          paddingBottom = container.height + pv.windowProps.windowHeight / Math.abs(block.speed)
        } else {
          paddingBottom = scrollDist + container.height
        }
      }

      if (Math.abs(marginTop) >= Math.abs(paddingBottom)) paddingBottom = Math.abs(marginTop) + 1

      if (block.mediatype === 'video') {
        block.videoEl.style.setProperty('height', paddingBottom + 'px', null)
        block.videoEl.style.setProperty('margin-top', marginTop + 'px', null)
      } else {
        block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null)
        block.el.style.setProperty('margin-top', marginTop + 'px', null)
      }

      pvObj.blocks.push(block)
    } // end of for blocks

    pv.pvArr.push(pvObj)
  } // loop container
  // pp("pv.pvArr", pv.pvArr)
}
