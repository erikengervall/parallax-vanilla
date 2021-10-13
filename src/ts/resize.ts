import { MEDIA_TYPES } from './constants'
import { setBlockAttributes } from './initBlock'
import { Block, Container, Window } from './types'

export const resize = () => {
  const { pv } = (window as unknown) as Window

  pv.containerArr.forEach((container: Container) => {
    container.height = container.containerEl.clientHeight

    container.blocks.forEach((block: Block) => {
      if (block.mediatype !== MEDIA_TYPES.none) {
        setBlockAttributes(container, block)
      }
    })
  })
}
