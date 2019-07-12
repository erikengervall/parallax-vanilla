import { MEDIA_TYPES } from './constants'
import { setBlockAttributes } from './initBlock'

export default () => {
  const pv = (<any>window).pv

  pv.containerArr.forEach((container: any) => {
    container.height = container.el.clientHeight

    container.blocks.forEach((block: any) => {
      if (block.mediatype !== MEDIA_TYPES.NONE) {
        setBlockAttributes(container, block)
      }
    })
  })
}
