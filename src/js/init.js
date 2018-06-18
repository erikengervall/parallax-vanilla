const { defaultSettings, MEDIA_TYPES } = require('./constants')
const { setContainerHeight } = require('./initContainer')
const {
  setBlockSpeed,
  setBlockMediaProps,
  setBlockMute,
  setBlockVisual,
  setBlockAttributes,
} = require('./initBlock')

module.exports = userSettings => {
  pv.containerArr = []
  pv.settings = mergeSettings(userSettings, defaultSettings)

  const containerElements = document.getElementsByClassName(pv.settings.container.class)
  for (let i = 0; i < containerElements.length; i++) {
    const container = {}

    container.el = containerElements[i]
    container.offset = calculateOffsetTop(container.el)
    container.el.style.height = setContainerHeight(container, pv.settings)
    container.height = container.el.clientHeight

    container.blocks = []

    const blockElements = containerElements[i].getElementsByClassName(pv.settings.block.class)
    for (let j = 0; j < blockElements.length; j++) {
      const block = {}

      block.el = blockElements[j]
      block.speed = setBlockSpeed(block, pv.settings)
      const { mediatype, mediapath } = setBlockMediaProps(block, pv.settings)
      block.mediatype = mediatype
      block.mediapath = mediapath
      block.mute = setBlockMute(block, pv.settings)

      if (block.mediatype !== MEDIA_TYPES.NONE) {
        if (block.mediatype === MEDIA_TYPES.VIDEO) container.hasVideoBlock = true

        const successful = setBlockVisual(block)
        if (!successful) {
          console.error('Did not successfully set media for block:', block)
          throw new Error('Did not successfully set media')
        }

        setBlockAttributes(container, block)
      }

      container.blocks.push(block)
    }

    pv.containerArr.push(container)
  }
}

const mergeSettings = (userSettings = {}, defaultSettings) => {
  Object.keys(userSettings).forEach(elementSettings => {
    if (!userSettings[elementSettings] instanceof Object) {
      throw new Error(`Expected ${elementSettings} to be of instance Object`)
    }

    Object.keys(userSettings[elementSettings]).forEach(setting => {
      if (userSettings[elementSettings][setting] instanceof Object) {
        throw new Error(`Expected ${elementSettings} to be primitive value`)
      }
      if (!defaultSettings[elementSettings].hasOwnProperty(setting)) {
        throw new Error(`Expected ${setting} to match available settings`)
      }

      defaultSettings[elementSettings][setting] = userSettings[elementSettings][setting]
    })
  })

  return defaultSettings
}

// Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
const calculateOffsetTop = el => {
  const rectTop = el.getBoundingClientRect().top
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return rectTop + scrollTop
}
