parallax-vanilla.js
===========

Seamless and lightweight parallax scrolling library implemented in pure JavaScript utilizing Hardware acceleration for extra performance.

### Demo
[Feature tests](http://engervall.com/projects/parallax-vanilla)

### Main features

#### Super lightweight without dependencies
5KB pure JavaScript.

#### Viewport-only animations
Parallax elements are only animated within the current viewport, thus saving enormous resources.

#### Dynamic sizing
Image-elements are dynamically sized and adjusted relative to the pv-speed.

#### Performance is key
Vanilla Parallax maximizes your parallax effects with hardware acceleration and no external libraries.

#### Media type independance
Animates not only images but also videos.

### Browser support

| Chrome | Safari | Firefox |
| --- | --- | --- |
| 60+ | 10+ | 44+ |

## Installation

### bower
```sh
bower i --save parallax-vanilla
```

### npm
```sh
npm i --save parallax-vanilla
```

### Manual

Download package and include `parallax-vanilla.min.css` inside the <b>head</b> tag and `parallax-vanilla.min.js` just before closing the <b>body</b> tag.

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
		speed: Float,
		mediapath: String,
		mediatype: String
	}
});
```

#### Settings

<table class='table table-bordered table-striped'>
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
			<td>container, block</td>
			<td>Settings object. These settings will be applied to each container and block. Can be individually overwritten by data attributes.</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td><b><i>settings.container</i></b></td>
			<td>Object</td>
			<td>class, height</td>
			<td>The container object's properties helps ensure that the parallax effect is triggered at the right time and goes on for the right amount of pixels scrolled.</td>
		</tr>
		<tr>
			<td><i>settings.container.class</i></td>
			<td>String</td>
			<td>'pv-container'</td>
			<td>The class of the container element.</td>
		</tr>
		<tr>
			<td><i>settings.container.height</i></td>
			<td>String || Float || Number</td>
			<td>'250px'</td>
			<td>container height. String argument with Number and Suffix, e.g. '100px' or '100vh'. Float or Number input will recieve 'px' suffix.</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td><b><i>settings.block</i></b></td>
			<td>Object</td>
			<td>class, speed, image</td>
			<td>The block object.</td>
		</tr>
		<tr>
			<td><i>settings.block.class</i></td>
			<td>String</td>
			<td>'pv-block'</td>
			<td>The class of the block element.</td>
		</tr>
		<tr>
			<td><i>settings.block.speed</i></td>
			<td>Float || Number</td>
			<td>-Math.PI</td>
			<td>The speed and direction at which the parallax animated. Negative values will animate the `block` upwards when scrolling downwards on the page. The inverse apply for positive values. All values are allowed except 0. If 0 is picked, the default value will be applied.</td>
		</tr>
		<tr>
			<td><i>settings.container.image</i></td>
			<td>Path</td>
			<td>undefined</td>
			<td>If no path is given, it is set to undefined. It is then crucial that you include your background through data attributes, CSS or other means.</td>
		</tr>
	</tbody>
</table>

### Data attributes: Customize individual elements

Data attributes allows for fine control over each individual block. Data attributes will overwrite the global JavaScript settings.

```html
<div class='pv-container' pv-height='100vh'>
	<div class='pv-block' pv-speed='3.14' pv-mediapath='path/to/file.extension' pv-mediatype='type'></div>
</div>
```

This code will produce a `pv-container` with height `100vh` containing a `pv-block` with a parallax speed of `3.14` displaying the image `image.extension`.



### Notes

The following is the CSS included.

```css
.pv-container {
  overflow: hidden;

  .pv-block {
    will-change: transform;
	  background-repeat: no-repeat;
	  background-position: center center;
	  background-size: cover;
  }
}
```

LICENSE
=======

MIT
