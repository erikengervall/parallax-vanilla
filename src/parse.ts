import { ATTRIBUTES, MEDIA_TYPES, VIDEO_EXTENSIONS } from './constants'
import type { MediaType, Settings } from './types'

const describe = (el: Element) =>
  el.outerHTML.length > 120 ? el.outerHTML.slice(0, 120) + '…' : el.outerHTML

export const normalizeHeight = (height: string | number): string => {
  if (typeof height === 'number') {
    if (!Number.isFinite(height)) throw new Error(`parallax-vanilla: invalid height ${height}`)
    return height + 'px'
  }

  const value = height.trim()
  if (value !== '' && !isNaN(Number(value))) return value + 'px'
  if (/^\d*\.?\d+(px|vh)$/.test(value)) return value

  throw new Error(`parallax-vanilla: invalid height "${height}", expected a number, px or vh`)
}

export const parseHeight = (containerEl: Element, settings: Settings) =>
  normalizeHeight(containerEl.getAttribute(ATTRIBUTES.HEIGHT) || settings.container.height)

export const validateSpeed = (speed: number) => {
  if (!Number.isFinite(speed) || speed === 0) {
    throw new Error(`parallax-vanilla: invalid speed ${speed}, expected a non-zero number`)
  }
  return speed
}

export const parseSpeed = (blockEl: Element, settings: Settings) => {
  const attr = blockEl.getAttribute(ATTRIBUTES.SPEED)
  if (attr === null || attr.trim() === '') return settings.block.speed

  const speed = Number(attr)
  if (!Number.isFinite(speed)) {
    throw new Error(`parallax-vanilla: invalid pv-speed "${attr}" on ${describe(blockEl)}`)
  }

  // A speed of 0 has no parallax to draw, so it keeps the default
  return speed === 0 ? settings.block.speed : speed
}

export const parseMute = (blockEl: Element, settings: Settings) => {
  const attr = blockEl.getAttribute(ATTRIBUTES.MUTE)
  if (attr === null) return settings.block.mute

  // `pv-mute` with no value reads as true, like a boolean HTML attribute
  return attr === '' || attr === 'true'
}

// The lower-cased extension of the path's last segment, ignoring any query string or hash
export const getExtension = (mediapath: string) => {
  const path = mediapath.split(/[?#]/)[0]
  const segment = path.slice(path.lastIndexOf('/') + 1)
  const dot = segment.lastIndexOf('.')
  return dot === -1 ? '' : segment.slice(dot + 1).toLowerCase()
}

export const isVideoPath = (mediapath: string) =>
  VIDEO_EXTENSIONS.indexOf(getExtension(mediapath)) !== -1

const isMediaType = (value: string): value is MediaType =>
  value === MEDIA_TYPES.image || value === MEDIA_TYPES.video || value === MEDIA_TYPES.none

export const parseMedia = (
  blockEl: Element,
  settings: Settings
): { mediatype: MediaType; mediapath: string | null } => {
  const typeAttr = blockEl.getAttribute(ATTRIBUTES.MEDIATYPE)
  const mediapath = blockEl.getAttribute(ATTRIBUTES.MEDIAPATH) || settings.block.mediapath
  const type: string = typeAttr || settings.block.mediatype

  if (!isMediaType(type)) {
    throw new Error(
      `parallax-vanilla: invalid media type "${type}" on ${describe(blockEl)}, expected image, video or none`
    )
  }

  if (type === MEDIA_TYPES.none) return { mediatype: type, mediapath }

  if (!mediapath) {
    throw new Error(
      `parallax-vanilla: no media path for ${describe(blockEl)}; set pv-mediapath, or pv-mediatype="none" to move the block without media`
    )
  }

  return { mediatype: isVideoPath(mediapath) ? MEDIA_TYPES.video : type, mediapath }
}
