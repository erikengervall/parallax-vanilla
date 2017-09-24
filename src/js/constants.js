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

const IMAGE = 'image'
const VIDEO = 'video'
const NONE = 'none'

const defaultSettings = {
  container: {
    class: 'pv-container',
    height: '250px',
  },
  block: {
    class: 'pv-block',
    speed: -Math.PI,
    mediatype: 'image',
    mediapath: undefined,
    mute: false,
  },
}

module.exports = { videoExtensions, defaultSettings, IMAGE, VIDEO, NONE }
