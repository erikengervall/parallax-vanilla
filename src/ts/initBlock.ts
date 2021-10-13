import { VIDEO_EXTENSIONS, ELEMENT_DATA_KEYS, MEDIA_TYPES } from './constants'
import { Block, Container, Settings, Window } from './types'

export const setBlockSpeed = (blockEl: Block['blockEl'], settings: Settings) => {
  const attrSpeed = blockEl.getAttribute(ELEMENT_DATA_KEYS.SPEED)

  // No data attribute defined
  if (!attrSpeed) {
    return settings.block.speed
  }

  const attrSpeedAsNumber = parseInt(attrSpeed, 10)
  if (isNaN(attrSpeedAsNumber)) {
    console.error('Invalid type for attribute speed for block: ' + blockEl)
    throw new Error('Invalid type for attribute speed for block')
  }

  return attrSpeedAsNumber === 0 ? settings.block.speed : attrSpeedAsNumber
}

export const setBlockMediaProps = (blockEl: Block['blockEl'], settings: Settings) => {
  let mediatype = blockEl.getAttribute(ELEMENT_DATA_KEYS.MEDIATYPE) as
    | keyof typeof MEDIA_TYPES
    | null
  const mediapath = blockEl.getAttribute(ELEMENT_DATA_KEYS.MEDIAPATH)

  if (mediatype === MEDIA_TYPES.none) {
    return {
      mediatype,
      mediapath,
    }
  }

  // No data attribute defined
  if (!mediatype) {
    mediatype = settings.block.mediatype
  }

  // Media type set to video
  if (mediapath && isVideo(mediatype, mediapath)) {
    mediatype = MEDIA_TYPES.video
  }

  // No data attribute defined
  if (!mediapath && mediatype !== MEDIA_TYPES.none) {
    console.error('Media path not defined for block: ' + blockEl)
    throw new Error('Media path not defined')
  }

  return {
    mediatype,
    mediapath,
  }
}

export const setBlockMute = (blockEl: Block['blockEl'], settings: Settings) => {
  const attrMute = blockEl.getAttribute(ELEMENT_DATA_KEYS.MUTE)

  if (attrMute !== undefined && attrMute !== null) {
    return attrMute === 'true'
  }

  return settings.block.mute
}

const setBlockImage = (block: Block) => {
  const { mediapath } = block

  block.blockEl.style.backgroundImage = "url('" + mediapath + "')"

  // Check if the background image wasn't set
  const backgroundImageFromDOM = window
    .getComputedStyle(block.blockEl)
    .getPropertyValue('background-image')

  return backgroundImageFromDOM !== 'none'
}

const videoElClicked = (videoEl: HTMLVideoElement, block: Block) => {
  const { pv } = (window as unknown) as Window

  if (pv.unmutedBlock && pv.unmutedBlock.videoEl !== videoEl) {
    if (pv.unmutedBlock.videoEl) {
      pv.unmutedBlock.videoEl.muted = true
    }

    if (pv.unmutedBlock.audioButton) {
      pv.unmutedBlock.audioButton.classList.add('mute')
    }
  }

  pv.unmutedBlock = block
  videoEl.muted = !videoEl.muted
  block.muted = videoEl.muted

  if (block.audioButton) {
    block.audioButton.classList.toggle('mute')
  }
}

const setBlockVideo = (block: Block) => {
  const { mediapath } = block

  const videoEl = document.createElement('video')
  videoEl.src = mediapath as string
  videoEl.autoplay = true
  videoEl.loop = true
  videoEl.defaultMuted = true
  videoEl.muted = true
  block.muted = true
  block.videoEl = videoEl
  block.blockEl.appendChild(videoEl)

  if (typeof window.orientation === 'undefined') {
    if (!block.mute) {
      videoEl.addEventListener('click', function() {
        videoElClicked(videoEl, block)
      })
      const audioButton = document.createElement('a')
      audioButton.href = '#'
      audioButton.className += 'audio-icon mute'
      audioButton.appendChild(document.createElement('span'))
      audioButton.addEventListener('click', function(e) {
        e.preventDefault()
        videoElClicked(videoEl, block)
      })
      block.audioButton = audioButton
      block.blockEl.insertAdjacentElement('afterend', audioButton)
    }
  }

  return true
}

export const setBlockVisual = (block: Block) => {
  const { mediatype } = block

  if (mediatype === MEDIA_TYPES.image) {
    setBlockImage(block)
    return
  }
  if (mediatype === MEDIA_TYPES.video) {
    setBlockVideo(block)
    return
  }

  console.error('Failed to set media for block:', block)
  throw new Error('Failed to set media')
}

export const setBlockAttributes = (container: Container, block: Block) => {
  const { pv } = (window as unknown) as Window

  updateWindowProps()
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

  block.blockEl.style.setProperty('padding-bottom', paddingBottom + 'px')
  block.blockEl.style.setProperty('margin-top', marginTop + 'px')
}

// Returns the extension of a media path
const getExtension = (attrMediapath: string) => {
  const extension = attrMediapath
    .substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length)
    .toLowerCase()

  if (extension.length === 0) {
    console.error('Invalid extension for media with media path: ' + attrMediapath)
    throw new Error('Invalid extension for media')
  }

  return extension
}

// returns `true` if media is a video
const isVideo = (attrMediatype: keyof typeof MEDIA_TYPES, attrMediapath: string) =>
  attrMediatype === MEDIA_TYPES.video ||
  VIDEO_EXTENSIONS.indexOf(getExtension(attrMediapath)) !== -1

const updateWindowProps = () => {
  const { pv } = (window as unknown) as Window

  pv.windowProps = {
    scrollTop: window.scrollY || document.documentElement.scrollTop,
    windowHeight: window.innerHeight,
    windowMidHeight: window.innerHeight / 2,
  }
}
