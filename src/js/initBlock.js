const { videoExtensions } = require('./constants')

const setBlockSpeed = (block, settings) => {
  const attrSpeed = block.el.getAttribute('pv-speed')

  // No data attribute defined
  if (!attrSpeed) return settings.block.speed

  // Speed is set to 0 (fall back on block speed)
  if (attrSpeed == 0) return settings.block.speed

  return attrSpeed
}

const setBlockMediapath = (block, settings) => {
  const attrMediapath = block.el.getAttribute('pv-mediapath')

  // No data attribute defined
  if (!attrMediapath) return console.error('Media path not defined for block: ' + block.el)

  return attrMediapath
}

const setBlockMediatype = (block, settings) => {
  let mediatype = block.el.getAttribute('pv-mediatype')
  const attrMediapath = block.el.getAttribute('pv-mediapath')

  // Data attribute defined
  if (!mediatype) mediatype = settings.block.mediatype

  // Media type set to video
  if (isVideo(mediatype, attrMediapath)) mediatype = 'video'

  // Default
  return mediatype
}

const setBlockImage = block => {
  const { mediatype, mediapath } = block

  block.el.style.backgroundImage = "url('" + mediapath + "')"

  // Check if the background image did not get set
  const backgroundImageFromDOM = window
    .getComputedStyle(block.el)
    .getPropertyValue('background-image')
  if (backgroundImageFromDOM == 'none') return false

  return true
}

const setBlockVideo = block => {
  const { mediatype, mediapath } = block

  let videoEl = document.createElement('video')
  videoEl.src = mediapath
  videoEl.autoplay = true
  videoEl.loop = true
  videoEl.defaultMuted = true
  videoEl.muted = true
  block.videoEl = videoEl
  block.el.appendChild(videoEl)

  return true
}

const setBlockVisual = block => {
  const { mediatype } = block

  if (mediatype === 'image') return setBlockImage(block)
  if (mediatype === 'video') return setBlockVideo(block)

  return false
}

const setBlockAttributes = (container, block) => {
  updateWindowProps()
  // calculates the negative top property
  // negative scroll distance
  // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
  let marginTop = 0,
    scrollDist = 0,
    paddingBottom = 0

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

  block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null)
  block.el.style.setProperty('margin-top', marginTop + 'px', null)
}

module.exports = {
  setBlockSpeed,
  setBlockMediatype,
  setBlockMediapath,
  setBlockVisual,
  setBlockAttributes,
}

// Returns the extension of a media path
const getExtension = attrMediapath => {
  const extension = attrMediapath
    .substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length)
    .toLowerCase()
  return extension === -1
    ? console.error('Invalid extension for media with media path: ' + attrMediapath)
    : extension
}

// returns {true} if media is a video
const isVideo = (attrMediatype, attrMediapath) => {
  return attrMediatype === 'video' || videoExtensions.indexOf(getExtension(attrMediapath)) !== -1
}

const updateWindowProps = () => {
  pv.windowProps = {
    scrollTop: window.scrollY || document.documentElement.scrollTop,
    windowHeight: window.innerHeight,
    windowMidHeight: window.innerHeight / 2,
  }
}
