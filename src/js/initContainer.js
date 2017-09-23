const setContainerHeight = (container, settings) => {
  let attrHeight = container.el.getAttribute('pv-height')

  // No data attribute
  if (!attrHeight) return settings.container.height

  // String only consists of integers, add px
  if (!isNaN(Number(attrHeight))) return attrHeight + 'px'

  // String has more than integers, assume suffix is either px or vh
  let suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length)
  if (suffix == 'px' || suffix == 'vh') return attrHeight

  throw new Error('Invalid height suffix, expected "px" or "vh" but got: ' + suffix)
}

module.exports = { setContainerHeight }
