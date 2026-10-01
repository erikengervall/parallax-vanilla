// Pure layout math. Every input is a live measurement; nothing here touches the DOM.

export interface ContainerMetrics {
  /** Distance from the top of the document to the top of the container. */
  offset: number
  height: number
}

/**
 * Sizes a block so it still covers its container at both ends of the scroll range.
 * The block is lifted with a negative margin and lengthened with bottom padding
 * by however far it travels while the container crosses the viewport.
 */
export const computeBlockLayout = (
  { offset, height }: ContainerMetrics,
  windowHeight: number,
  speed: number
) => {
  const factor = Math.abs(speed)
  let marginTop = 0
  let paddingBottom: number

  if (offset < windowHeight) {
    // The container is visible on load, so its travel starts at scrollTop 0
    if (speed > 0) {
      marginTop = -Math.abs(offset)
      paddingBottom = height + offset
    } else {
      paddingBottom = (height + offset) / factor + height
    }
  } else if (speed > 0) {
    marginTop = -(height + windowHeight) / factor
    paddingBottom = height + windowHeight / factor
  } else {
    paddingBottom = (height + windowHeight) / factor + height
  }

  if (Math.abs(marginTop) >= Math.abs(paddingBottom)) paddingBottom = Math.abs(marginTop) + 1

  return { marginTop, paddingBottom }
}

/** How far a block is translated for the current scroll position. */
export const computeTranslateY = (
  { offset }: ContainerMetrics,
  scrollTop: number,
  windowHeight: number,
  speed: number
) => {
  // A container visible on load moves from scrollTop 0; one further down starts when it enters
  const travelled = offset < windowHeight ? scrollTop : windowHeight - offset + scrollTop
  return Math.round(travelled / speed)
}

export const isInViewport = (
  { offset, height }: ContainerMetrics,
  scrollTop: number,
  windowHeight: number
) => scrollTop + windowHeight - offset > 0 && scrollTop < offset + height
