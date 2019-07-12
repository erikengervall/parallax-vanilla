import { ELEMENT_DATA_KEYS } from './constants'

const setContainerHeight = (container: any, settings: any) => {
  const attrHeight = container.el.getAttribute(ELEMENT_DATA_KEYS.HEIGHT)

  // No data attribute
  if (!attrHeight) return settings.container.height

  // String only consists of integers, add px
  if (!isNaN(Number(attrHeight))) return attrHeight + 'px'

  // String has more than integers, assume suffix is either px or vh
  const suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length)
  if (suffix === 'px' || suffix === 'vh') return attrHeight

  throw new Error('Invalid height suffix, expected "px" or "vh" but got: ' + suffix)
}

export { setContainerHeight }
