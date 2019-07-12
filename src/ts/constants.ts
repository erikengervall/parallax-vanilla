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

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  NONE: 'none',
}

export const ELEMENT_DATA_KEYS = {
  MEDIAPATH: 'pv-mediapath',
  MEDIATYPE: 'pv-mediatype',
  MUTE: 'pv-mute',
  HEIGHT: 'pv-height',
  SPEED: 'pv-speed',
}

export const defaultSettings = {
  container: {
    class: 'pv-container',
    height: '250px',
  },
  block: {
    class: 'pv-block',
    speed: -Math.PI,
    mediatype: MEDIA_TYPES.IMAGE,
    mediapath: null,
    mute: false,
  },
}
