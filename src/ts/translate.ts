import { Block, Container } from './types'

export default () => {
  const pv = (<any>window).pv

  // Update selected attributes in windowProps on window raf event
  pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop
  if (pv.windowProps.scrollTop === pv.prevScrollTop) {
    // No scrolling has occured
    return
  } else {
    pv.prevScrollTop = pv.windowProps.scrollTop
  }

  // translate the parallax blocks, creating the parallax effect
  pv.containerArr.forEach((container: Container, index: number) => {
    let calc = 0

    // check if parallax block is in viewport
    if (isInViewport(container.offset, container.height)) {
      if (index > pv.mostReContainerInViewport) pv.mostReContainerInViewport = index
      // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
      if (container.offset < pv.windowProps.windowHeight) {
        calc = pv.windowProps.scrollTop

        // if the parallax is further down on the page
        // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
      } else {
        calc = pv.windowProps.windowHeight - container.offset + pv.windowProps.scrollTop
      }

      container.blocks.forEach((block: Block) => {
        if (block.videoEl) {
          block.videoEl.play()
          if (block === pv.unmutedBlock) {
            if (!block.muted) {
              block.videoEl.muted = block.muted
              block.muted
                ? pv.unmutedBlock.audioButton.classList.add('mute')
                : pv.unmutedBlock.audioButton.classList.remove('mute')
            }
          }
        }

        transform(block.blockEl, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)')
      })
    } else {
      // check if container has at least one video block
      if (container.hasVideoBlock) {
        // pause blocks with playing videos
        container.blocks.forEach((block: Block) => {
          if (block.videoEl) {
            block.videoEl.pause()
            if (pv.unmutedBlock === block) {
              block.videoEl.muted = true
            }
          }
        })
      }
      const nextContainer = pv.containerArr[index + 1]
      // check if next container is in view - else break
      if (
        nextContainer &&
        !isInViewport(nextContainer.offset, nextContainer.height) &&
        pv.mostReContainerInViewport < index &&
        !nextContainerIsSmaller(container, nextContainer)
      ) {
        return
      } else {
        if (nextContainer && isInViewport(nextContainer.offset, nextContainer.height)) {
          pv.mostReContainerInViewport = index + 1
        }
      }
    }
  })
}

// Transform prefixes for CSS
const transform = (element: HTMLElement, style: string) => {
  element.style.webkitTransform = style
  // @ts-expect-error eslint-disable-line @typescript-eslint/ban-ts-comment
  element.style.MozTransform = style
  // @ts-expect-error eslint-disable-line @typescript-eslint/ban-ts-comment
  element.style.msTransform = style
  // @ts-expect-error eslint-disable-line @typescript-eslint/ban-ts-comment
  element.style.OTransform = style
  element.style.transform = style
}

// Check if the container is in view
const isInViewport = (offset: number, height: number) => {
  const pv = (<any>window).pv

  return (
    pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 &&
    pv.windowProps.scrollTop < offset + height
  )
}

const nextContainerIsSmaller = (container: Container, nextContainer: Container) =>
  container.offset + container.height > nextContainer.offset + nextContainer.height
