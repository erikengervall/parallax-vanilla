import { describe, expect, it } from 'vitest'
import { computeBlockLayout, computeTranslateY, isInViewport } from '../../src/layout'

// Expected values are worked out by hand from the 1.x formulas, so the rewrite keeps the same motion
describe('computeBlockLayout', () => {
  const windowHeight = 800

  it('sizes a container that is visible on load', () => {
    expect(computeBlockLayout({ offset: 100, height: 300 }, windowHeight, 2)).toEqual({
      marginTop: -100,
      paddingBottom: 400,
    })
    expect(computeBlockLayout({ offset: 100, height: 300 }, windowHeight, -2)).toEqual({
      marginTop: 0,
      paddingBottom: 500,
    })
  })

  it('sizes a container further down the page', () => {
    expect(computeBlockLayout({ offset: 2000, height: 300 }, windowHeight, 2)).toEqual({
      marginTop: -550,
      paddingBottom: 700,
    })
    expect(computeBlockLayout({ offset: 2000, height: 300 }, windowHeight, -2)).toEqual({
      marginTop: 0,
      paddingBottom: 850,
    })
  })

  it('keeps the padding taller than the lift', () => {
    expect(computeBlockLayout({ offset: 2000, height: 100 }, windowHeight, 0.5)).toEqual({
      marginTop: -1800,
      paddingBottom: 1801,
    })
  })
})

describe('computeTranslateY', () => {
  it('moves a container visible on load from scrollTop 0', () => {
    expect(computeTranslateY({ offset: 100, height: 300 }, 50, 800, 2)).toBe(25)
  })

  it('moves a container further down from the moment it enters', () => {
    expect(computeTranslateY({ offset: 2000, height: 300 }, 1500, 800, -2)).toBe(-150)
  })
})

describe('isInViewport', () => {
  const container = { offset: 2000, height: 300 }

  it('is true only while part of the container is on screen', () => {
    expect(isInViewport(container, 1199, 800)).toBe(false)
    expect(isInViewport(container, 1201, 800)).toBe(true)
    expect(isInViewport(container, 2299, 800)).toBe(true)
    expect(isInViewport(container, 2300, 800)).toBe(false)
  })
})
