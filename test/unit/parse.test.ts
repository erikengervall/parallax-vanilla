import { describe, expect, it } from 'vitest'
import { defaultSettings } from '../../src/constants'
import {
  getExtension,
  normalizeHeight,
  parseHeight,
  parseMedia,
  parseMute,
  parseSpeed,
  validateSpeed,
} from '../../src/parse'
import type { Settings } from '../../src/types'

const el = (attrs: Record<string, string> = {}) => {
  const div = document.createElement('div')
  Object.entries(attrs).forEach(([name, value]) => div.setAttribute(name, value))
  return div
}

const settings = (block: Partial<Settings['block']> = {}): Settings => ({
  container: { ...defaultSettings.container },
  block: { ...defaultSettings.block, ...block },
})

describe('parseSpeed', () => {
  it('keeps decimal speeds', () => {
    expect(parseSpeed(el({ 'pv-speed': '1.5' }), settings())).toBe(1.5)
    expect(parseSpeed(el({ 'pv-speed': '-3.14' }), settings())).toBe(-3.14)
    expect(parseSpeed(el({ 'pv-speed': '0.5' }), settings())).toBe(0.5)
  })

  it('falls back to the setting when the attribute is missing, empty or 0', () => {
    expect(parseSpeed(el(), settings({ speed: 2 }))).toBe(2)
    expect(parseSpeed(el({ 'pv-speed': '' }), settings({ speed: 2 }))).toBe(2)
    expect(parseSpeed(el({ 'pv-speed': '0' }), settings({ speed: 2 }))).toBe(2)
  })

  it('rejects values that are not numbers', () => {
    expect(() => parseSpeed(el({ 'pv-speed': 'fast' }), settings())).toThrow(/invalid pv-speed/)
    expect(() => parseSpeed(el({ 'pv-speed': '2x' }), settings())).toThrow(/invalid pv-speed/)
  })
})

describe('validateSpeed', () => {
  it('rejects a speed of 0 and non-finite speeds', () => {
    expect(() => validateSpeed(0)).toThrow()
    expect(() => validateSpeed(Infinity)).toThrow()
    expect(() => validateSpeed(NaN)).toThrow()
    expect(validateSpeed(-1)).toBe(-1)
  })
})

describe('normalizeHeight', () => {
  it('turns numbers and numeric strings into pixels', () => {
    expect(normalizeHeight(250)).toBe('250px')
    expect(normalizeHeight('250')).toBe('250px')
  })

  it('keeps px and vh values', () => {
    expect(normalizeHeight('250px')).toBe('250px')
    expect(normalizeHeight('50vh')).toBe('50vh')
    expect(normalizeHeight('12.5vh')).toBe('12.5vh')
  })

  it('rejects other units', () => {
    expect(() => normalizeHeight('10rem')).toThrow(/invalid height/)
    expect(() => normalizeHeight('vh')).toThrow(/invalid height/)
  })

  it('prefers the pv-height attribute over the setting', () => {
    expect(parseHeight(el({ 'pv-height': '40vh' }), settings())).toBe('40vh')
    expect(parseHeight(el(), settings())).toBe('250px')
  })
})

describe('parseMute', () => {
  it('reads true, an empty value and false', () => {
    expect(parseMute(el({ 'pv-mute': 'true' }), settings())).toBe(true)
    expect(parseMute(el({ 'pv-mute': '' }), settings())).toBe(true)
    expect(parseMute(el({ 'pv-mute': 'false' }), settings({ mute: true }))).toBe(false)
    expect(parseMute(el(), settings({ mute: true }))).toBe(true)
  })
})

describe('getExtension', () => {
  it('ignores query strings, hashes and dots in directory names', () => {
    expect(getExtension('clip.MP4')).toBe('mp4')
    expect(getExtension('https://cdn.example.com/a.b/clip.webm?v=2#t=5')).toBe('webm')
    expect(getExtension('https://cdn.example.com/a.b/image')).toBe('')
  })
})

describe('parseMedia', () => {
  it('uses the mediapath setting when the block has no attribute', () => {
    expect(parseMedia(el(), settings({ mediapath: 'owl.jpg' }))).toEqual({
      mediatype: 'image',
      mediapath: 'owl.jpg',
    })
  })

  it('treats video extensions as video, including with a query string', () => {
    expect(parseMedia(el({ 'pv-mediapath': 'clip.mp4?v=2' }), settings()).mediatype).toBe('video')
    expect(parseMedia(el({ 'pv-mediapath': 'clip.webm' }), settings()).mediatype).toBe('video')
  })

  it('lets a block opt out of media', () => {
    expect(parseMedia(el({ 'pv-mediatype': 'none' }), settings()).mediatype).toBe('none')
    expect(parseMedia(el(), settings({ mediatype: 'none' })).mediatype).toBe('none')
  })

  it('throws when an image or video block has no path', () => {
    expect(() => parseMedia(el(), settings())).toThrow(/no media path/)
  })

  it('throws on an unknown media type', () => {
    expect(() =>
      parseMedia(el({ 'pv-mediatype': 'gif', 'pv-mediapath': 'a.gif' }), settings())
    ).toThrow(/invalid media type "gif"/)
  })
})
