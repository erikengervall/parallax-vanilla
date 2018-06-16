const { MEDIA_TYPES } = require('./constants')
const { setBlockAttributes } = require('./initblock')

module.exports = () => {
  pv.containerArr.forEach(container => {
    container.height = container.el.clientHeight
    container.blocks.forEach(block => {
      if (block.mediatype !== MEDIA_TYPES.NONE) setBlockAttributes(container, block)
    })
  })
}
