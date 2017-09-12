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
  if (pv.isVideo(mediatype, attrMediapath)) mediatype = 'video'

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
  // videoEl.autoplay = true
  videoEl.loop = true
  videoEl.defaultMuted = true
  videoEl.muted = true
  block.isPlaying = true
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

module.exports = { setBlockSpeed, setBlockMediatype, setBlockMediapath, setBlockVisual }
