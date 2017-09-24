# parallax-vanilla.js

Seamless and lightweight parallax scrolling library implemented in pure JavaScript utilising Hardware acceleration for extra performance.

## [Demo](https://erikengervall.github.io/parallax-vanilla/)

## Main features

### Super lightweight without dependencies
7KB pure JavaScript.

### Viewport-only animations
Parallax elements are only animated within the current viewport, saving a lot of resources.

### Dynamic sizing
Image-elements are dynamically sized and adjusted relative to the pv-speed.

### Performance is key
Vanilla Parallax maximises your parallax effects with hardware acceleration and no external libraries.

### Media type independence
Parallax effect not only applies on images but also work perfectly with videos.

## Browser support
Tested browsers:

| Chrome | Safari | Firefox |
| --- | --- | --- |
| 60+ | 10+ | 44+ |

## Installation

### [bower](https://github.com/erikengervall/parallax-vanilla)
```sh
bower i --save parallax-vanilla
```

### [npm](https://www.npmjs.com/package/parallax-vanilla)
```sh
npm i --save parallax-vanilla
```

### Include

Download package and include `parallax-vanilla.min.css` in the <b>head</b> tag and `parallax-vanilla.min.js` just before the closing <b>body</b> tag.

```html
<link href='/path/to/parallax-vanilla.min.css'>
<script src='/path/to/parallax-vanilla.min.js'></script>
```

## Usage

### Simple usage

**1**. Wrap a `pv-block` with a `pv-container`.

```html
<div class='pv-container'>
  <div class='pv-block'></div>
</div>
```

**2**. Attach a mediapath to `pv-block`

```html
<div class='pv-container'>
  <div class='pv-block' pv-mediapath='path/to/file.extension'></div>
</div>
```

**3**. Initialize library.
```html
<div class='pv-container'>
  <div class='pv-block' pv-mediapath='path/to/file.extension'></div>></div>
</div>
<script>
  pv.init();
</script>
```

### JavaScript initialization options

Optional global settings can be configured upon initialization.

```javascript
pv.init({
  container : {
    class : String,
    height : String || Number
  },
  block : {
    class: String,
    speed: Number || Float,
    mediapath: String,
    mediatype: String
  }
});
```

#### JavaScript Settings

<table class='table table-bordered'>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
      <th>Description</th>
			<th>Example values</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><b>settings</b></td>
			<td>Object</td>
			<td>{container, block}</td>
			<td>Settings object. These settings will be applied to each container and block. Can be individually overwritten by data attributes.</td>
      <td>{container: {...}, block: {...}</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
      <td></td>
			<td></td>
		</tr>
		<tr>
			<td><b>settings.container</b></td>
			<td>Object</td>
			<td>{class, height}</td>
			<td>The container object.</td>
      <td>{...}</td>
		</tr>
		<tr>
			<td>settings.container.class</td>
			<td>String</td>
			<td>'pv-container'</td>
			<td>The class of the container element.</td>
      <td>'pv-container'</td>
		</tr>
		<tr>
			<td>settings.container.height</td>
			<td>String || Number</td>
			<td>'250px'</td>
			<td>The container's height in either pixels or viewport heights. If the string lacks a suffix, or a number is entered, it will default to pixels.</td>
      <td>'250px', '50vh', '250'</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
      <td></td>
			<td></td>
		</tr>
		<tr>
			<td><b>settings.block</b></td>
			<td>Object</td>
			<td>{class, speed, mediatype, mediapath}</td>
			<td>The block object.</td>
      <td>{}</td>
		</tr>
		<tr>
			<td>settings.block.class</td>
			<td>String</td>
			<td>'pv-block'</td>
			<td>The class of the block element.</td>
      <td>'pv-block'</td>
		</tr>
		<tr>
			<td>settings.block.speed</td>
			<td>Number || Float</td>
			<td>-Math.PI</td>
			<td>The speed and direction at which the parallax animated. Negative values will animate the `block` upwards when scrolling downwards on the page.</td>
      <td>''</td>
		</tr>
		<tr>
			<td>settings.block.mediatype</td>
			<td>String</td>
			<td>'image'</td>
			<td>The block's media type. Blocks with mediapaths containing a video extension will automatically be considered videos.</td>
      <td>'image', 'video' or 'none'</td>
		</tr>
		<tr>
			<td>settings.block.mediapath</td>
			<td>String</td>
			<td>undefined</td>
			<td>The block's media path.</td>
      <td>'../path/to/file.ext'</td>
		</tr>
	</tbody>
</table>

### Data attributes: Customize individual elements

Data attributes allow fine control over each individual element and will overwrite the global JavaScript settings.

```html
<div class='pv-container' pv-height='100vh'>
  <div class='pv-block' pv-speed='3.14' pv-mediatype='video' pv-mediapath='path/to/epic_montage.mp4'></div>
</div>
```

This code will produce a container with class `pv-container` with height `100vh` containing a block with class `pv-block` with a parallax speed of `3.14` displaying the media `epic_montage.mp4` of type `video`.

<table class='table table-bordered'>
  <tbody>
  	<thead>
  		<tr>
  			<th>Data attributes for container</th>
  		</tr>
  	</thead>
		<tr>
		</tr>
    <tr>
      <td>pv-height</td>
    </tr>
    <thead>
  		<tr>
  			<th>Data attributes for block</th>
  		</tr>
  	</thead>
    <tr>
    </tr>
    <tr>
      <td>pv-speed</td>
    </tr>
    <tr>
      <td>pv-mediatype</td>
    </tr>
    <tr>
      <td>pv-mediapath</td>
    </tr>
	</tbody>
</table>

The descriptions and the default values are the same as the corresponding properties of the JavaScript settings object.

### CSS

```css
.pv-container {
  overflow: hidden;
}
.pv-container .pv-block {
  will-change: transform;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.pv-container .pv-block video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
```

LICENSE
=======

MIT
