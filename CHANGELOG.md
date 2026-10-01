# Changelog

## 2.0.0

### Breaking changes

- `window.raf` is no longer defined, and the library no longer logs to the console on load.
- Bower is no longer supported; install from npm or load the script from a CDN.
- `.pv-container` now gets `position: relative` from the stylesheet, which the sound toggle needs to sit inside its container.
- The sound toggle is a `<button>` instead of an `<a href="#">`. It keeps the `audio-icon` and `mute` classes.
- `pv-mute` with no value now means muted, like a boolean HTML attribute.
- The internal state previously exposed on `window.pv` (`containerArr`, `settings`, `windowProps` and others) is gone. `window.pv` now holds `init`, `refresh` and `destroy`.
- Calling `init()` again now tears down the previous setup instead of adding a second set of videos and buttons.

### Added

- ES module and CommonJS builds with TypeScript types: `import { init, refresh, destroy } from 'parallax-vanilla'`. Importing is safe outside a browser.
- `refresh()` and `destroy()`.
- `prefers-reduced-motion` support: blocks stay still and simply cover their container.
- Layout changes are followed automatically: content that pushes a container down, container resizes, window resizes, and rotation on touch devices.
- `webm`, `ogv` and `mkv` are recognized as video.

### Fixed

- Decimal speeds were rounded down (`pv-speed="1.5"` moved at speed `1`).
- The `block.mediapath` setting was ignored, so `init()` threw for blocks without `pv-mediapath`.
- A numeric `container.height` was dropped instead of read as pixels.
- Positions were measured once at `init()`, so anything that moved a container afterwards broke the effect.
- After `init()` or a resize, blocks stayed where they were until the next scroll.
- Touch devices never handled a resize, so rotating the device broke the layout.
- Videos were asked to play on every scrolled frame, refused autoplay surfaced as uncaught errors, and iOS would not play them inline.
- The TypeScript settings type required every field.
- Video paths with a query string or hash were treated as images, and image paths containing a quote broke.
- A speed of `0` in the settings divided by zero.
- The library overwrote the page's `window.onresize`.
- The sound toggle could show the wrong state after leaving the viewport.

### Development

- Builds with tsup instead of webpack 4, which no longer ran on current Node. Tests run with Vitest, linting uses ESLint 10 with a flat config, formatting uses Prettier 3, and the package manager is npm.
- Less is replaced by plain CSS.
- The dev dependency audit goes from 904 known vulnerabilities to none.
