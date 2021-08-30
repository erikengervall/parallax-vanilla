import { defaultSettings, MEDIA_TYPES } from './constants'
import { setContainerHeight } from './initContainer'
import {
  setBlockSpeed,
  setBlockMediaProps,
  setBlockMute,
  setBlockVisual,
  setBlockAttributes,
} from './initBlock'
import { Block, Container, Settings } from './types'

export default (userSettings: Partial<Settings>) => {
  const pv = (<any>window).pv
  pv.containerArr = []
  pv.settings = mergeSettings(userSettings, defaultSettings)

  const containerElements = document.getElementsByClassName(pv.settings.container.class)

  for (let i = 0; i < containerElements.length; i++) {
    const containerEl = containerElements[i] as HTMLElement
    const offset = calculateOffsetTop(containerEl)
    containerEl.style.height = setContainerHeight(containerEl, pv.settings)
    const height = containerEl.clientHeight
    const blocks: Block[] = []

    const container: Container = {
      containerEl,
      offset,
      height,
      blocks,
    }

    const blockElements = containerElements[i].getElementsByClassName(pv.settings.block.class)

    for (let j = 0; j < blockElements.length; j++) {
      const blockEl = blockElements[j] as HTMLElement
      const speed = setBlockSpeed(blockEl, pv.settings)
      const { mediatype, mediapath } = setBlockMediaProps(blockEl, pv.settings)

      const block: Block = {
        blockEl,
        speed,
        mediatype,
        mediapath,
        mute: setBlockMute(blockEl, pv.settings),
      }

      if (block.mediatype !== MEDIA_TYPES.none) {
        if (block.mediatype === MEDIA_TYPES.video) {
          container.hasVideoBlock = true
        }

        setBlockVisual(block)
        setBlockAttributes(container, block)
      }

      container.blocks.push(block)
    }

    pv.containerArr.push(container)
  }
}

const mergeSettings = (
  userSettings: Partial<Settings> = {},
  defaultSettings: Settings
): Settings => {
  return {
    container: {
      ...defaultSettings.container,
      ...userSettings.container,
    },
    block: {
      ...defaultSettings.block,
      ...userSettings.block,
    },
  }
}

// Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
const calculateOffsetTop = (el: HTMLElement) => {
  const rectTop = el.getBoundingClientRect().top
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return rectTop + scrollTop
}
