# parallax-vanilla

Lightweight, dependency-free parallax scrolling for images and videos, using hardware-accelerated transforms.

## [Demo](https://erikengervall.github.io/parallax-vanilla/)

## Features

- **Tiny and dependency-free.** About 7 KB of minified JavaScript and 1.5 KB of CSS.
- **Viewport-only work.** Only containers on screen are moved, and videos pause while they are off screen.
- **Dynamic sizing.** Blocks are sized from their container and speed, and follow layout changes, resizes and rotations.
- **Images and videos.** A path with a video extension becomes a looping, muted, inline video. Click the video or its sound toggle to hear it while it stays in view.
- **Accessible by default.** Respects `prefers-reduced-motion`, and the sound toggle is a labelled button.

## Installation

```sh
npm install parallax-vanilla
```

### With a bundler

```js
import { init } from 'parallax-vanilla'
import 'parallax-vanilla/parallax-vanilla.css'

init()
```

The package ships ES module and CommonJS builds with TypeScript types. Importing it is safe during server-side rendering; call `init()` in the browser.

### With a script tag

```html
<link rel="stylesheet" href="https://unpkg.com/parallax-vanilla@2/dist/parallax-vanilla.css" />

<!-- at the end of <body> -->
<script src="https://unpkg.com/parallax-vanilla@2/dist/parallax-vanilla.js"></script>
<script>
  pv.init()
</script>
```

The script defines a global `pv` with `init`, `refresh` and `destroy`.

## Usage

Put a `pv-block` inside a `pv-container`, give the block a media path, and call `init()` once the elements are in the page.

```html
<div class="pv-container">
  <div class="pv-block" pv-mediapath="path/to/image.jpg"></div>
</div>
```

A block without media still moves; set `pv-mediatype="none"` to use it for text or any other content:

```html
<div class="pv-container" pv-height="50vh">
  <div class="pv-block" pv-mediapath="path/to/leaves.jpg"></div>
  <div class="pv-block" pv-mediatype="none" pv-speed="3">
    <h1>Moves at its own speed</h1>
  </div>
</div>
```

### API

| Function          | Description                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init(settings?)` | Finds every container and block and starts the effect. Calling it again tears down the previous setup first, so it is safe after the page content changes. |
| `refresh()`       | Recomputes sizes and positions. Resizes, rotations and content that pushes containers around are picked up on their own; use this for anything else.       |
| `destroy()`       | Stops the effect, removes the videos and buttons it added and restores the elements' inline styles.                                                        |

### Settings

Every setting is optional. Settings apply to every container and block, and data attributes override them per element.

```js
init({
  container: {
    class: 'pv-container',
    height: '250px',
  },
  block: {
    class: 'pv-block',
    speed: -Math.PI,
    mediatype: 'image',
    mediapath: null,
    mute: false,
  },
})
```

| Setting            | Attribute      | Default        | Description                                                                                                                                       |
| ------------------ | -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container.class`  |                | `pv-container` | Class that marks a container. The stylesheet targets `pv-container`, so copy its rules if you change this.                                        |
| `container.height` | `pv-height`    | `250px`        | Container height: a number of pixels, or a string in `px` or `vh` (`250`, `'250px'`, `'50vh'`).                                                   |
| `block.class`      |                | `pv-block`     | Class that marks a block inside a container. The stylesheet targets `pv-block`, so copy its rules if you change this.                             |
| `block.speed`      | `pv-speed`     | `-Math.PI`     | Speed and direction, any non-zero number such as `1.5` or `-2`. Larger values move less. Negative values move the block up while you scroll down. |
| `block.mediatype`  | `pv-mediatype` | `image`        | `image`, `video` or `none`. A path with a video extension (`mp4`, `webm`, `mov` and others) is always a video.                                    |
| `block.mediapath`  | `pv-mediapath` | `null`         | Path or URL of the image or video.                                                                                                                |
| `block.mute`       | `pv-mute`      | `false`        | Keep videos muted and leave out the sound toggle. `pv-mute` with no value means `true`.                                                           |

```html
<div class="pv-container" pv-height="100vh">
  <div class="pv-block" pv-speed="3.14" pv-mediapath="path/to/montage.mp4" pv-mute="false"></div>
</div>
```

### CSS

`parallax-vanilla.css` is required. It positions containers, sizes videos and draws the sound toggle (`.audio-icon`, with a `.mute` class while muted).

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, and any browser released since 2020. Browsers without `ResizeObserver` still work, but call `refresh()` after layout changes.

## Development

Requires Node 24 (see `.nvmrc`).

```sh
npm install
npm run dev     # rebuilds on change and serves the demo on http://localhost:3000
npm run check   # typecheck, lint, format check, tests and build
```

The demo page (`index.html`) loads the committed `dist/` build, and GitHub Pages serves it from `master`, so rebuild and commit `dist/` with each release.

## Upgrading from 1.x

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT
