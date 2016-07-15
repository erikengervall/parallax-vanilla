Vanilla-Parallax.js
===========

Seamless and simple parallax scrolling library implemented in pure JavaScript utilizing Hardware acceleration for extra performance.

## Installation

Download package and include `vanilla-parallax.min.css` at the top of your page and `vanilla-parallax.min.js` at the bottom.

```html
<link href="/path/to/vanilla-parallax.min.css">
<script src="/path/to/vanilla-parallax.min.js"></script>
```

## Usage

### Simple usage

1. Wrap a `para-block` with a `para-container`.

2. Add a background-image to `para-block` (see data attributes section for alternative solution).

```html
<div class="para-container">
	<div class="para-block" style="background-image:url('path/to/image.extension');"></div>
</div>
```

3. Initialize library.
```javascript
vp.init();
```

### Adding JavaScript settings

Settings can be set for all container and block elements.

```javascript
vp.init({
	container : {
		class : String,
		height : Float || Number || String,
		heightSuffix: String
	},
	block : {
		class: String
		speed: Float,
		image: Url
	}
});
```

### Adding data attributes

Data attributes allows for fine control over each individual parallax effect. You can define settings through JavaScript and then apply data attributes to selected elements.

####Example

```html
<div class="para-container" para-height="100" para-height-suffix='vh'>
	<div class="para-block" para-speed=1 para-image='path/to/image.extension'></div>
</div>
```

### Settings

<table class="table table-bordered table-striped">
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
			<td>class, height, heightSuffix</td>
			<td>The container object's properties helps ensure that the parallax effect is triggered at the right time and goes on for the right amount of pixels scrolled.</td>
		</tr>
		<tr>
			<td><i>settings.container.class</i></td>
			<td>String</td>
			<td>'para-container'</td>
			<td>The class of the container element.</td>
		</tr>
		<tr>
			<td><i>settings.container.height</i></td>
			<td>Float || Number || String</td>
			<td>'250px'</td>
			<td>container height.</td>
		</tr>
		<tr>
			<td><i>settings.container.heightSuffix</i></td>
			<td>String</td>
			<td>'px'</td>
			<td>container height suffix. E.g. 'px' or 'vh'.</td>
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
			<td>'para-block'</td>
			<td>The class of the block element.</td>
		</tr>
		<tr>
			<td><i>settings.block.speed</i></td>
			<td>Float || Number</td>
			<td>-Math.PI</td>
			<td>The speed and direction at which the parallax moves.</td>
		</tr>
		<tr>
			<td><i>settings.container.image</i></td>
			<td>Path</td>
			<td>undefined</td>
			<td>If no path is given, it is set to undefined. It is then crucial that you include your background through data attributes, CSS or other means.</td>
		</tr>
	</tbody>
</table>

### Notes

Vanilla-Parallax will use the container's top offset relative to the document, it's height and the window's innerheight to determine whether or not the container is in viewport. Depending if the container is visible in the viewport or not, Vanilla-Parallax will perform the parallax effect, thus saving enormous performance.

This is the CSS that comes out of the box.

```css
.para-container {
  overflow: hidden;

  .para-block {
    will-change: transform;
	  background-repeat: no-repeat;
	  background-position: center center;
	  background-size: cover;
    background-color: #000;
  }
}
```

LICENSE
=======

TBA