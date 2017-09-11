const setBlockSpeed = (block, settings) => {
  const attrSpeed = block.el.getAttribute('pv-speed')

  // No data attribute defined
  if (!attrSpeed) return settings.block.speed

  // Speed is set to 0 (fall back on block speed)
  if (attrSpeed == 0) return settings.block.speed

  return attrSpeed
}

const setBlockMediatype = (block, settings) => {
  const attrMediatype = block.el.getAttribute('pv-mediatype')
  const attrMediapath = block.el.getAttribute('pv-mediapath')

  // Data attribute defined
  if (attrMediatype) return attrMediatype

  // Media type set to video
  if (pv.isVideo(attrMediatype, attrMediapath)) return 'video'

  // Default
  return settings.block.mediatype
}

const setBlockMediapath = (block, settings) => {
  const attrMediapath = block.el.getAttribute('pv-mediapath')

  // No data attribute defined
  if (!attrMediapath) return console.error('Media path not defined for block: ' + block.el)

  return attrMediapath
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
  // videoEl.type = 'video/' + extension
  videoEl.loop = true
  videoEl.defaultMuted = true
  videoEl.muted = true
  block.el.appendChild(videoEl)
  block.isPlaying = true
  // videoEl.play()

  return true
}

const setBlockVisual = block => {
  const { mediatype } = block

  if (mediatype === 'image') return setBlockImage(block)
  if (mediatype === 'video') return setBlockVideo(block)

  return false
}

module.exports = { setBlockSpeed, setBlockMediatype, setBlockMediapath, setBlockVisual }
