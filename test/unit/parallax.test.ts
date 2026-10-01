import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { destroy, init, refresh } from '../../src/index'

const page = (html: string) => {
  document.body.innerHTML = html
}

const placeContainers = (top: number, height: number) => {
  document.querySelectorAll<HTMLElement>('.pv-container').forEach((el) => {
    el.getBoundingClientRect = () => ({ top, height }) as DOMRect
  })
}

const mockReducedMotion = (reduce: boolean) => {
  window.matchMedia = ((query: string) => ({
    matches: reduce && query.includes('reduced-motion'),
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  // jsdom implements neither playback nor matchMedia
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue(undefined)
  mockReducedMotion(false)
})

afterEach(() => {
  destroy()
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('init', () => {
  it('adds one video and one labelled audio toggle per video block, even when called twice', () => {
    page(`<div class="pv-container"><div class="pv-block" pv-mediapath="clip.mp4"></div></div>`)

    init()
    init()

    expect(document.querySelectorAll('video')).toHaveLength(1)
    const buttons = document.querySelectorAll('button.audio-icon')
    expect(buttons).toHaveLength(1)
    expect(buttons[0].getAttribute('aria-label')).toBe('Video sound')
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
    expect(document.querySelector('video')?.playsInline).toBe(true)
  })

  it('skips the audio toggle for muted blocks', () => {
    page(
      `<div class="pv-container"><div class="pv-block" pv-mute pv-mediapath="clip.mp4"></div></div>`
    )
    init()
    expect(document.querySelectorAll('.audio-icon')).toHaveLength(0)
  })

  it('applies the mediapath and numeric height settings', () => {
    page(`<div class="pv-container"><div class="pv-block"></div></div>`)

    init({ container: { height: 300 }, block: { mediapath: `owl's.jpg` } })

    expect(document.querySelector<HTMLElement>('.pv-container')?.style.height).toBe('300px')
    expect(document.querySelector<HTMLElement>('.pv-block')?.style.backgroundImage).toBe(
      `url("owl's.jpg")`
    )
  })

  it('leaves the page untouched when a setting is invalid', () => {
    page(`<div class="pv-container"><div class="pv-block" pv-mediapath="clip.mp4"></div></div>`)

    expect(() => init({ block: { speed: 0 } })).toThrow(/invalid speed/)
    expect(() => init({ container: { height: '10rem' } })).toThrow(/invalid height/)
    expect(document.querySelectorAll('video')).toHaveLength(0)
  })

  it('cleans up after itself when a block is invalid', () => {
    page(`
      <div class="pv-container"><div class="pv-block" pv-mediapath="clip.mp4"></div></div>
      <div class="pv-container"><div class="pv-block"></div></div>`)

    expect(() => init()).toThrow(/no media path/)
    expect(document.querySelectorAll('video')).toHaveLength(0)
    expect(document.querySelector<HTMLElement>('.pv-container')?.style.height).toBe('')
  })

  it('translates visible blocks by their speed', () => {
    page(
      `<div class="pv-container"><div class="pv-block" pv-speed="2" pv-mediapath="a.jpg"></div></div>`
    )
    placeContainers(100, 300)
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })

    init()

    // offset = top (100) + scrollY (50); visible on load, so it moves scrollY / speed
    expect(document.querySelector<HTMLElement>('.pv-block')?.style.transform).toBe(
      'translate3d(0, 25px, 0)'
    )
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('keeps blocks still when the visitor prefers reduced motion', () => {
    mockReducedMotion(true)
    page(
      `<div class="pv-container"><div class="pv-block" pv-speed="2" pv-mediapath="a.jpg"></div></div>`
    )
    placeContainers(100, 300)

    init()

    const block = document.querySelector<HTMLElement>('.pv-block')
    expect(block?.style.transform).toBe('translate3d(0, 0px, 0)')
    expect(block?.style.marginTop).toBe('0px')
    expect(block?.style.paddingBottom).toBe('300px')
  })
})

describe('audio toggle', () => {
  it('gives sound to one video at a time', () => {
    page(`
      <div class="pv-container"><div class="pv-block" pv-mediapath="a.mp4"></div></div>
      <div class="pv-container"><div class="pv-block" pv-mediapath="b.mp4"></div></div>`)
    init()

    const [first, second] = Array.from(document.querySelectorAll('video'))
    const [firstButton, secondButton] = Array.from(document.querySelectorAll('button'))

    firstButton.click()
    expect(first.muted).toBe(false)
    expect(firstButton.getAttribute('aria-pressed')).toBe('true')
    expect(firstButton.classList.contains('mute')).toBe(false)

    secondButton.click()
    expect(first.muted).toBe(true)
    expect(firstButton.classList.contains('mute')).toBe(true)
    expect(second.muted).toBe(false)
  })
})

describe('refresh', () => {
  it('relays out blocks after the container moves', () => {
    page(
      `<div class="pv-container"><div class="pv-block" pv-speed="2" pv-mediapath="a.jpg"></div></div>`
    )
    placeContainers(100, 300)
    init()
    const block = document.querySelector<HTMLElement>('.pv-block')
    expect(block?.style.marginTop).toBe('-100px')

    placeContainers(200, 300)
    refresh()
    expect(block?.style.marginTop).toBe('-200px')
  })
})

describe('destroy', () => {
  it('removes added elements and restores inline styles', () => {
    page(`
      <div class="pv-container" style="height: 123px">
        <div class="pv-block" pv-mediapath="clip.mp4"></div>
        <div class="pv-block" pv-mediapath="a.jpg"></div>
      </div>`)
    placeContainers(100, 300)

    init()
    destroy()

    expect(document.querySelectorAll('video, button')).toHaveLength(0)
    expect(document.querySelector<HTMLElement>('.pv-container')?.style.height).toBe('123px')
    document.querySelectorAll<HTMLElement>('.pv-block').forEach((block) => {
      expect(block.getAttribute('style') || '').toBe('')
    })
  })
})
