//Transform prefixes for CSS
const transform = (element, style) => {
  element.style.webkitTransform = style
  element.style.MozTransform = style
  element.style.msTransform = style
  element.style.OTransform = style
  element.style.transform = style
}

module.exports = () => {
  // Update selected attributes in windowProps on window raf event
  pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop

  // translate the parallax blocks, creating the parallax effect
  for (let i = 0; i < pv.pvArr.length; i++) {
    const containerObj = pv.pvArr[i].container
    let calc

    // check if parallax block is in viewport
    if (pv.isInViewport(containerObj.offset, containerObj.height)) {
      // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
      if (containerObj.offset < pv.windowProps.windowHeight) {
        calc = pv.windowProps.scrollTop

        // if the parallax is further down on the page
        // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
      } else {
        calc = pv.windowProps.windowHeight - containerObj.offset + pv.windowProps.scrollTop
      }

      for (let j = 0; j < pv.pvArr[i].blocks.length; j++) {
        const block = pv.pvArr[i].blocks[j]
        // if (!block.isPlaying) block.el.firstChild.play() // IF IS VIDEO

        // perform the transform
        transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)')
      } // end of for blocks
    } else {
      // pause blocks with video
      for (let j = 0; j < pv.pvArr[i].blocks.length; j++) {
        let block = pv.pvArr[i].blocks[j]
        if (block.isPlaying) block.el.firstChild.pause()
      }
    }
  }
}
