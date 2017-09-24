const { videoExtensions, IMAGE, VIDEO, NONE } = require('./constants')

const setBlockSpeed = (block, settings) => {
  let attrSpeed = block.el.getAttribute('pv-speed')

  // No data attribute defined
  if (!attrSpeed) return settings.block.speed

  // Speed is a string
  if (typeof attrSpeed === 'string') {
    // Speed must consist solely of integers
    const attrSpeedNumber = Number(attrSpeed)
    if (isNaN(attrSpeedNumber)) {
      return console.error('Speed consist of more symbols than integers for block: ' + block.el)
    } else {
      attrSpeed = attrSpeedNumber
    }
  }

  // Speed is set to 0 (fall back on block speed)
  if (attrSpeed == 0) return settings.block.speed

  return attrSpeed
}

const setBlockMediaProps = (block, settings) => {
  let mediatype = block.el.getAttribute('pv-mediatype')
  const mediapath = block.el.getAttribute('pv-mediapath')

  if (mediatype === NONE) return { mediatype, mediapath }

  // No data attribute defined
  if (!mediatype) mediatype = settings.block.mediatype

  // Media type set to video
  if (mediapath && isVideo(mediatype, mediapath)) mediatype = VIDEO

  // No data attribute defined
  if (!mediapath && mediatype !== NONE)
    return console.error('Media path not defined for block: ' + block.el)

  return { mediatype, mediapath }
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

const videoElClicked = (videoEl, block) => {
  if (pv.unmutedBlock && pv.unmutedBlock.videoEl !== videoEl) {
    pv.unmutedBlock.videoEl.muted = true
    pv.unmutedBlock.audioButton.classList.add('mute')
  }
  pv.unmutedBlock = block
  videoEl.muted = !videoEl.muted
  block.muted = videoEl.muted

  block.audioButton.classList.toggle('mute')
}

const setBlockVideo = block => {
  const { mediatype, mediapath } = block

  let videoEl = document.createElement('video')
  videoEl.src = mediapath
  videoEl.autoplay = true
  videoEl.loop = true
  videoEl.defaultMuted = true
  videoEl.muted = true
  videoEl.addEventListener('click', function() {
    videoElClicked(videoEl, block)
  })
  block.muted = true
  block.videoEl = videoEl
  block.el.appendChild(videoEl)

  let audioButton = document.createElement('a')
  audioButton.href = '#'
  audioButton.className += 'speaker mute'
  audioButton.appendChild(document.createElement('span'))
  audioButton.addEventListener('click', function(e) {
    e.preventDefault()
    videoElClicked(videoEl, block)
  })
  block.audioButton = audioButton
  block.el.insertAdjacentElement('afterend', audioButton)

  return true
}

const setBlockVisual = block => {
  const { mediatype } = block

  if (mediatype === IMAGE) return setBlockImage(block)
  if (mediatype === VIDEO) return setBlockVideo(block)

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
  setBlockMediaProps,
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
  return attrMediatype === VIDEO || videoExtensions.indexOf(getExtension(attrMediapath)) !== -1
}

const updateWindowProps = () => {
  pv.windowProps = {
    scrollTop: window.scrollY || document.documentElement.scrollTop,
    windowHeight: window.innerHeight,
    windowMidHeight: window.innerHeight / 2,
  }
}
