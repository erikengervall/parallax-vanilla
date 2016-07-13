ParaLib.js
===========

Seamless and simple parallax scrolling library implemented in pure JavaScript utilizing Hardware acceleration for extra performance.

## Installation

Download package and include `paralib.min.css` at the top of your page and `paralib.min.js` at the bottom.

```html
<link href="/path/to/paralib.min.css">
<script src="/path/to/paralib.min.js"></script>
```

## Usage

### Via HTML

Simply wrap a `para-block` with a `para-container` and add a `para-speed`.

```html
<div class="para-container">
	<div class="para-block" para-speed=1></div>
</div>
```

### Via JavaScript

In order to call the library manually, simply call `ParaLib.init()` with desired settings.

```javascript
ParaLib.init({
	container : {
		class : String,
		height : Int
	},
	block : {
		class : String
	}
});
```

### Notes

ParaLib will use the container's top offset relative to the document, it's height and the window's innerheight to determine whether or not the container is in viewport. Depending if the container is visible in the viewport or not, ParaLib will perform the parallax effect, thus saving enormous performance.

This is the CSS that comes out of the box.

```css
.para-container {
  overflow: hidden;

  .para-block {
    will-change: transform;
    background-image: url('https://pixabay.com/static/uploads/photo/2015/06/03/14/24/ladybug-796481_960_720.jpg');
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