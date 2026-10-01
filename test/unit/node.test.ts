// @vitest-environment node
import { describe, expect, it } from 'vitest'

describe('outside a browser', () => {
  it('can be imported, and init explains that it needs a window', async () => {
    const pv = await import('../../src/index')
    expect(() => pv.init()).toThrow(/needs a browser window/)
    expect(() => pv.refresh()).not.toThrow()
    expect(() => pv.destroy()).not.toThrow()
  })
})
