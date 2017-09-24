module.exports = () => {
  // Update selected attributes in windowProps on window raf event
  pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop
  if (pv.windowProps.scrollTop === pv.prevScrollTop) {
    return
  } else {
    pv.prevScrollTop = pv.windowProps.scrollTop
  }

  // translate the parallax blocks, creating the parallax effect
  for (let i = 0; i < pv.containerArr.length; i++) {
    const container = pv.containerArr[i]
    let calc

    // check if parallax block is in viewport
    if (isInViewport(container.offset, container.height)) {
      if (i > pv.mostReContainerInViewport) pv.mostReContainerInViewport = i
      // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
      if (container.offset < pv.windowProps.windowHeight) {
        calc = pv.windowProps.scrollTop

        // if the parallax is further down on the page
        // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
      } else {
        calc = pv.windowProps.windowHeight - container.offset + pv.windowProps.scrollTop
      }

      for (let j = 0; j < pv.containerArr[i].blocks.length; j++) {
        const block = pv.containerArr[i].blocks[j]
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

        transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)')
      }
    } else {
      // check if container even has a video block
      if (container.hasVideoBlock) {
        // pause blocks with playing video
        for (let j = 0; j < pv.containerArr[i].blocks.length; j++) {
          let block = pv.containerArr[i].blocks[j]
          if (block.videoEl) {
            block.videoEl.pause()
            if (pv.unmutedBlock === block) {
              block.videoEl.muted = true
            }
          }
        }
      }
      const nextContainer = pv.containerArr[i + 1]
      // check if next container is in view - else break
      if (
        nextContainer &&
        !isInViewport(nextContainer.offset, nextContainer.height) &&
        pv.mostReContainerInViewport < i &&
        !nextContainerIsSmaller(container, nextContainer)
      ) {
        break
      } else {
        if (nextContainer && isInViewport(nextContainer.offset, nextContainer.height)) {
          pv.mostReContainerInViewport = i + 1
        }
      }
    }
  }
}

//Transform prefixes for CSS
const transform = (element, style) => {
  element.style.webkitTransform = style
  element.style.MozTransform = style
  element.style.msTransform = style
  element.style.OTransform = style
  element.style.transform = style
}

// Check if the container is in view
const isInViewport = (offset, height) => {
  return (
    pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 &&
    pv.windowProps.scrollTop < offset + height
  )
}

const nextContainerIsSmaller = (container, nextContainer) => {
  return container.offset + container.height > nextContainer.offset + nextContainer.height
}
