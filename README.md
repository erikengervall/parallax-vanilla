# parallax-vanilla.js

Seamless and lightweight parallax scrolling library implemented in pure JavaScript utilizing Hardware acceleration for extra performance.

## Demo
[Feature tests](http://engervall.com/projects/parallax-vanilla)

## Main features

### Super lightweight without dependencies
5KB pure JavaScript.

### Viewport-only animations
Parallax elements are only animated within the current viewport, thus saving enormous resources.

### Dynamic sizing
Image-elements are dynamically sized and adjusted relative to the pv-speed.

### Performance is key
Vanilla Parallax maximizes your parallax effects with hardware acceleration and no external libraries.

### Media type independance
Animates not only images but also videos.

## Browser support

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

Download package and include `parallax-vanilla.min.css` inside the <b>head</b> tag and `parallax-vanilla.min.js` just before the closing <b>body</b> tag.

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
    height : String || Number || Float,
  },
  block : {
    class: String
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
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><b>settings</b></td>
			<td>Object</td>
			<td>{container, block}</td>
			<td>Settings object. These settings will be applied to each container and block. Can be individually overwritten by data attributes.</td>
		</tr>
		<tr>
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
		</tr>
		<tr>
			<td>settings.container.class</td>
			<td>String</td>
			<td>'pv-container'</td>
			<td>The class of the container element.</td>
		</tr>
		<tr>
			<td>settings.container.height</td>
			<td>String || Number || Float</td>
			<td>'250px'</td>
			<td>The container's height. String argument with Number and Suffix, e.g. '100px' or '100vh'. Float or Number input will recieve 'px' suffix.</td>
		</tr>
		<tr>
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
		</tr>
		<tr>
			<td>settings.block</b>.class</td>
			<td>String</td>
			<td>'pv-block'</td>
			<td>The class of the block element.</td>
		</tr>
		<tr>
			<td>settings.block</b>.speed</td>
			<td>Number || Float</td>
			<td>-Math.PI</td>
			<td>The speed and direction at which the parallax animated. Negative values will animate the `block` upwards when scrolling downwards on the page. The inverse apply for positive values. All values are allowed except 0. If 0 is picked, the default value will be applied.</td>
		</tr>
		<tr>
			<td>settings.block</b>.mediatype</td>
			<td>String</td>
			<td>'image'</td>
			<td>The block's media type.</td>
		</tr>
		<tr>
			<td>settings.block</b>.mediapath</td>
			<td>String</td>
			<td>undefined</td>
			<td>The block's media path.</td>
		</tr>
	</tbody>
</table>

### Data attributes: Customize individual elements

Data attributes allows for fine control over each individual block and will overwrite the optional global JavaScript settings.

```html
<div class='pv-container' pv-height='100vh'>
  <div class='pv-block' pv-speed='3.14' pv-mediatype='type' pv-mediapath='path/to/file.extension'></div>
</div>
```

This code will produce a `pv-container` with height `100vh` containing a `pv-block` with a parallax speed of `3.14` displaying the image `image.extension`.

<table class='table table-bordered'>
  <tbody>
  	<thead>
  		<tr>
  			<th>Data attributes for container</th>
  		</tr>
  	</thead>
		<tr>
			<td>class</td>
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
      <td>class</td>
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
