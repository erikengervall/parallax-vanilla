let pv = require('../src/js/parallax-vanilla')

const mockInit = jest.fn()
jest.mock('../src/js/init', () => mockInit)

describe('Test cases for parallax-vanilla.js', () => {
  it('should initialize variables', () => {
    expect(mockInit).not.toHaveBeenCalled() // should not fire without user input
    expect(window.raf).toEqual(expect.any(Function))
  })
})
