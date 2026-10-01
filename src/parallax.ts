import { MEDIA_TYPES, defaultSettings } from './constants'
import {
  computeBlockLayout,
  computeTranslateY,
  isInViewport,
  type ContainerMetrics,
} from './layout'
import {
  createAudioButton,
  createVideo,
  cssUrl,
  pauseVideo,
  playVideo,
  syncAudioButton,
} from './media'
import {
  normalizeHeight,
  parseHeight,
  parseMedia,
  parseMute,
  parseSpeed,
  validateSpeed,
} from './parse'
import type { Block, Container, Settings, UserSettings } from './types'

interface State {
  settings: Settings
  containers: Container[]
  /** The block whose sound the visitor turned on. One video plays sound at a time. */
  soundBlock: Block | null
  /** Viewport height the layout is computed for, see `onResize`. */
  viewportHeight: number
  viewportWidth: number
  frame: number | null
  forceLayout: boolean
  resizeObserver: ResizeObserver | null
  motionQuery: MediaQueryList | null
  /** Inline styles as they were before init, restored by destroy. */
  originalStyles: Map<HTMLElement, Map<string, string>>
}

let state: State | null = null

const mergeSettings = (user: UserSettings = {}): Settings => ({
  container: { ...defaultSettings.container, ...user.container },
  block: { ...defaultSettings.block, ...user.block },
})

const setStyle = (s: State, el: HTMLElement, prop: string, value: string) => {
  let saved = s.originalStyles.get(el)
  if (!saved) {
    saved = new Map()
    s.originalStyles.set(el, saved)
  }
  if (!saved.has(prop)) saved.set(prop, el.style.getPropertyValue(prop))
  el.style.setProperty(prop, value)
}

const matches = (query: MediaQueryList | null) => (query ? query.matches : false)

const isCoarsePointer = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches

const toggleSound = (block: Block) => {
  const { videoEl } = block
  if (!state || !videoEl) return

  const previous = state.soundBlock
  if (previous && previous !== block && previous.videoEl) {
    previous.videoEl.muted = true
    syncAudioButton(previous)
  }

  videoEl.muted = !videoEl.muted
  state.soundBlock = videoEl.muted ? null : block
  syncAudioButton(block)
}

const buildBlock = (s: State, blockEl: HTMLElement): Block => {
  const { mediatype, mediapath } = parseMedia(blockEl, s.settings)
  const block: Block = {
    blockEl,
    speed: parseSpeed(blockEl, s.settings),
    mediatype,
    mediapath,
    mute: parseMute(blockEl, s.settings),
  }

  if (mediatype === MEDIA_TYPES.image) {
    setStyle(s, blockEl, 'background-image', cssUrl(mediapath as string))
  } else if (mediatype === MEDIA_TYPES.video) {
    createVideo(block)
    if (!block.mute) {
      const toggle = () => toggleSound(block)
      block.videoEl?.addEventListener('click', toggle)
      createAudioButton(block, toggle)
    }
  }

  return block
}

const layoutBlocks = (
  s: State,
  container: Container,
  metrics: ContainerMetrics,
  windowHeight: number,
  still: boolean
) => {
  container.blocks.forEach((block) => {
    if (block.mediatype === MEDIA_TYPES.none) return

    // With reduced motion the block simply covers its container
    const { marginTop, paddingBottom } = still
      ? { marginTop: 0, paddingBottom: metrics.height }
      : computeBlockLayout(metrics, windowHeight, block.speed)

    setStyle(s, block.blockEl, 'padding-bottom', paddingBottom + 'px')
    setStyle(s, block.blockEl, 'margin-top', marginTop + 'px')
  })

  container.layoutOffset = metrics.offset
  container.layoutHeight = metrics.height
  container.layoutWindowHeight = windowHeight
}

const update = () => {
  const s = state
  if (!s) return
  s.frame = null

  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowHeight = s.viewportHeight
  const still = matches(s.motionQuery)
  const force = s.forceLayout
  s.forceLayout = false

  // Read every position before writing any style, so a frame costs one layout
  const allMetrics = s.containers.map((container): ContainerMetrics => {
    const rect = container.containerEl.getBoundingClientRect()
    return { offset: rect.top + scrollTop, height: rect.height }
  })

  s.containers.forEach((container, i) => {
    const metrics = allMetrics[i]
    if (
      force ||
      Math.abs(metrics.offset - container.layoutOffset) > 0.5 ||
      Math.abs(metrics.height - container.layoutHeight) > 0.5 ||
      windowHeight !== container.layoutWindowHeight
    ) {
      layoutBlocks(s, container, metrics, windowHeight, still)
    }

    const visible = isInViewport(metrics, scrollTop, windowHeight)

    container.blocks.forEach((block) => {
      if (block.videoEl) {
        if (visible) playVideo(block.videoEl)
        else pauseVideo(block.videoEl)
      }

      if (!visible) return
      const y = still ? 0 : computeTranslateY(metrics, scrollTop, windowHeight, block.speed)
      setStyle(s, block.blockEl, 'transform', 'translate3d(0, ' + y + 'px, 0)')
    })
  })
}

const scheduleUpdate = (forceLayout = false) => {
  if (!state) return
  if (forceLayout) state.forceLayout = true
  if (state.frame === null) state.frame = window.requestAnimationFrame(update)
}

const onScroll = () => scheduleUpdate()
const onLayoutChange = () => scheduleUpdate(true)

const onResize = () => {
  if (!state) return
  const widthChanged = window.innerWidth !== state.viewportWidth

  // On touch devices the height changes whenever the browser bar slides in or out while
  // scrolling. Following it would make the media jump, so only a width change (a rotation)
  // moves the layout there.
  if (widthChanged || !isCoarsePointer()) {
    state.viewportWidth = window.innerWidth
    state.viewportHeight = window.innerHeight
    scheduleUpdate(true)
  }
}

/**
 * Finds every container and block on the page and starts the parallax effect.
 * Calling it again first tears down the previous setup, so it is safe after the DOM changes.
 */
export const init = (userSettings?: UserSettings) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('parallax-vanilla: init() needs a browser window')
  }

  destroy()

  const settings = mergeSettings(userSettings)
  validateSpeed(settings.block.speed)
  normalizeHeight(settings.container.height)

  const s: State = {
    settings,
    containers: [],
    soundBlock: null,
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    frame: null,
    forceLayout: true,
    resizeObserver: null,
    motionQuery:
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null,
    originalStyles: new Map(),
  }
  state = s

  try {
    const containerEls = Array.from(document.getElementsByClassName(settings.container.class))
    containerEls.forEach((el) => {
      const containerEl = el as HTMLElement
      setStyle(s, containerEl, 'height', parseHeight(containerEl, settings))

      const blockEls = Array.from(containerEl.getElementsByClassName(settings.block.class))
      s.containers.push({
        containerEl,
        blocks: blockEls.map((blockEl) => buildBlock(s, blockEl as HTMLElement)),
        layoutOffset: NaN,
        layoutHeight: NaN,
        layoutWindowHeight: NaN,
      })
    })
  } catch (error) {
    destroy()
    throw error
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  if (s.motionQuery) s.motionQuery.addEventListener('change', onLayoutChange)

  // Content above a container can grow (late images, fonts, banners) and push it down
  if (typeof ResizeObserver !== 'undefined') {
    s.resizeObserver = new ResizeObserver(onLayoutChange)
    s.resizeObserver.observe(document.documentElement)
    s.containers.forEach((container) => s.resizeObserver?.observe(container.containerEl))
  }

  // Lay out and position everything now, so the first paint is already correct
  update()
}

/** Recomputes sizes and positions, for layout changes the library cannot observe itself. */
export const refresh = () => {
  if (!state) return
  state.viewportWidth = window.innerWidth
  state.viewportHeight = window.innerHeight
  state.forceLayout = true
  update()
}

/** Stops the effect, removes the elements the library added and restores the inline styles. */
export const destroy = () => {
  const s = state
  if (!s) return
  state = null

  if (s.frame !== null) window.cancelAnimationFrame(s.frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (s.motionQuery) s.motionQuery.removeEventListener('change', onLayoutChange)
  if (s.resizeObserver) s.resizeObserver.disconnect()

  s.containers.forEach((container) =>
    container.blocks.forEach((block) => {
      if (block.videoEl) {
        block.videoEl.pause()
        block.videoEl.remove()
      }
      if (block.audioButton) block.audioButton.remove()
    })
  )

  s.originalStyles.forEach((props, el) =>
    props.forEach((value, prop) => {
      if (value) el.style.setProperty(prop, value)
      else el.style.removeProperty(prop)
    })
  )
}
