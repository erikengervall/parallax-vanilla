import type { Settings } from './types'

// Extensions a browser can play in a <video> element, or that a page might still point one at
export const VIDEO_EXTENSIONS = [
  '3g2',
  '3gp',
  'asf',
  'avi',
  'flv',
  'h264',
  'm4v',
  'mkv',
  'mov',
  'mp4',
  'mpeg',
  'mpg',
  'ogv',
  'rm',
  'vob',
  'webm',
  'wmv',
]

export const MEDIA_TYPES = {
  image: 'image',
  video: 'video',
  none: 'none',
} as const

export const ATTRIBUTES = {
  MEDIAPATH: 'pv-mediapath',
  MEDIATYPE: 'pv-mediatype',
  MUTE: 'pv-mute',
  HEIGHT: 'pv-height',
  SPEED: 'pv-speed',
} as const

export const AUDIO_BUTTON_CLASS = 'audio-icon'
export const MUTED_CLASS = 'mute'

export const defaultSettings: Settings = {
  container: {
    class: 'pv-container',
    height: '250px',
  },
  block: {
    class: 'pv-block',
    speed: -Math.PI,
    mediatype: MEDIA_TYPES.image,
    mediapath: null,
    mute: false,
  },
}
