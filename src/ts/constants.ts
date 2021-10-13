import { Settings } from './types'

export const VIDEO_EXTENSIONS = [
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

export const MEDIA_TYPES: {
  image: 'image'
  video: 'video'
  none: 'none'
} = {
  image: 'image',
  video: 'video',
  none: 'none',
}

export const ELEMENT_DATA_KEYS = {
  MEDIAPATH: 'pv-mediapath',
  MEDIATYPE: 'pv-mediatype',
  MUTE: 'pv-mute',
  HEIGHT: 'pv-height',
  SPEED: 'pv-speed',
}

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
