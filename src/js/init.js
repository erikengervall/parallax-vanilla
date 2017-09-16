const { setContainerHeight } = require('./initContainer')
const {
  setBlockSpeed,
  setBlockMediatype,
  setBlockMediapath,
  setBlockVisual,
  setBlockAttributes,
} = require('./initBlock')
const { defaultSettings } = require('./constants')

module.exports = settings => {
  pv.containerArr = []
  pv.settings = initSettings(settings, defaultSettings)

  const containers = document.getElementsByClassName(pv.settings.container.class)
  for (let i = 0; i < containers.length; i++) {
    let container = {}

    container.el = containers[i]
    container.offset = offsetTop(container.el)
    container.el.style.height = setContainerHeight(container, pv.settings)
    container.height = container.el.clientHeight

    container.blocks = []

    const blocks = containers[i].getElementsByClassName(pv.settings.block.class)
    for (let j = 0; j < blocks.length; j++) {
      let block = {}

      block.el = blocks[j]
      block.speed = setBlockSpeed(block, pv.settings)
      block.mediapath = setBlockMediapath(block, pv.settings)
      block.mediatype = setBlockMediatype(block, pv.settings)
      if (block.mediatype === 'video') container.hasVideoBlock = true

      const successful = setBlockVisual(block)
      if (!successful) console.error('Did not successfully set media for block: ' + block)

      setBlockAttributes(container, block)

      container.blocks.push(block)
    } // end of for blocks

    pv.containerArr.push(container)
  } // loop container
}

const initSettings = (settings, defaultSettings) => {
  if (!settings || settings === {}) return defaultSettings
  if (!settings.container || settings.container === {}) {
    settings.container = defaultSettings.container
  } else {
    if (!settings.container.class) settings.container.class = defaultSettings.container.class
    if (!settings.container.height) settings.container.height = defaultSettings.container.height
  }
  if (!settings.block || settings.block === {}) {
    settings.block = defaultSettings.block
  } else {
    if (!settings.block.class) settings.block.class = defaultSettings.block.class
    if (!settings.block.speed) settings.block.speed = defaultSettings.block.speed
    if (!settings.block.mediatype) settings.block.mediatype = defaultSettings.block.mediatype
    if (!settings.block.mediapath) settings.block.mediapath = defaultSettings.block.mediapath
  }
  return settings
}

// Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
const offsetTop = el => {
  let rectTop = el.getBoundingClientRect().top,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return rectTop + scrollTop
}
