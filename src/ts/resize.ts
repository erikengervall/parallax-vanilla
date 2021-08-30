import { MEDIA_TYPES } from './constants'
import { setBlockAttributes } from './initBlock'
import { Block, Container } from './types'

export default () => {
  const pv = (<any>window).pv

  pv.containerArr.forEach((container: Container) => {
    container.height = container.containerEl.clientHeight

    container.blocks.forEach((block: Block) => {
      if (block.mediatype !== MEDIA_TYPES.none) {
        setBlockAttributes(container, block)
      }
    })
  })
}
