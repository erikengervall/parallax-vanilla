const { NONE } = require('./constants')
const { setBlockAttributes } = require('./initblock')

module.exports = () => {
  for (let i = 0; i < pv.containerArr.length; i++) {
    let container = pv.containerArr[i]
    container.height = container.el.clientHeight
    for (let j = 0; j < pv.containerArr[i].blocks.length; j++) {
      let block = pv.containerArr[i].blocks[j]
      if (block.mediatype !== NONE) setBlockAttributes(container, block)
    }
  }
}
