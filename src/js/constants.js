const videoExtensions = [
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

const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  NONE: 'none',
}

const ELEMENT_DATA_KEYS = {
  MEDIAPATH: 'pv-mediapath',
  MEDIATYPE: 'pv-mediatype',
  MUTE: 'pv-mute',
  HEIGHT: 'pv-height',
  SPEED: 'pv-speed',
}

const defaultSettings = {
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

module.exports = { videoExtensions, defaultSettings, ELEMENT_DATA_KEYS, MEDIA_TYPES }
