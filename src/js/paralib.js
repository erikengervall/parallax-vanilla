(function(window) {
  'use strict';

  /**
   * Defines ParaLib
   * @return {Object} ParaLib object
   */
  function define_ParaLib() {
  	/**
  	 * Controls environment settings
  	 * @type {Boolean}
  	 */
  	var dev = true;


  	/**
  	 * [Library object]
  	 * @type {Object}
  	 */
  	var ParaLib = {};


		/**
		 * Transform prefixes for CSS
		 * @param  {HTML-element} element A para-block element
		 * @param  {CSS-style} style   E.g. 'transform3d(x, y, z)'
		 */
		ParaLib.transform = function(element, style) {
		  element.style.webkitTransform = style;
		  element.style.MozTransform = style;
		  element.style.msTransform = style;
		  element.style.OTransform = style;
		  element.style.transform = style;
		}


		/**
		 * Primary data handler for containers and blocks.
		 * @type {Array}
		 * @structure
		 * paraArr = [
		 * 	obj : {
		 * 		container : {
		 * 			el : HTML-element,
		 * 			offset : offsetTop,
		 * 			height : clientHeight
		 * 		},
		 * 		children : [
		 * 			child : {
		 * 				el : HTML-element,
		 * 				paraFactor : getAttr('paraFactor')
		 * 			}
		 * 		]
		 * 	}
		 * ]
		 */
		ParaLib.paraArr = [];


  	/**
  	 * Window properties
  	 * @type {Object}
  	 */
  	ParaLib.windowProps = {
			scrollTop    		: window.scrollY,
			windowHeight 		: window.innerHeight,
			windowMidHeight : window.innerHeight / 2,
  	}


		/**
		 * Update selected attributes in windowProps on window raf event
		 */
		ParaLib.updateWindowProps_OnRaf = function() {
			ParaLib.windowProps.scrollTop = window.scrollY;
		}


		/**
		 * Update selected attributes in ParaLib.windowProps on window resize event
		 */
		ParaLib.updateWindowProps_OnResize = function() {
			ParaLib.windowProps.scrollTop 			= window.scrollY;
			ParaLib.windowProps.windowHeight 		= window.innerHeight;
			ParaLib.windowProps.windowMidHeight = window.innerHeight / 2;
		}


		/**
		 * Calculates the top offset from an element to the window's || document's top
		 * @param  {HTML-element} el A para-block element
		 * @return {Int}    The element's top offset to document.
		 * Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
		 */
		ParaLib.offsetTop = function(el) {
	    var rectTop = el.getBoundingClientRect().top,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return (rectTop + scrollTop);
		}


		/**
		 * Initialize ParaLib.paraArr
		 * @param  {Object} settings User settings
		 */
		ParaLib.init = function(settings) {
			var settingsDefault = {
				container : {
					class : 'para-container',
					height : 500
				},
				child : {
					class : 'para-container'
				}
			};

			if (settings === undefined) {
				settings = settingsDefault;
			} else {
				// check container & container properties
				if (settings.container === undefined) 			settings.container 				= settingsDefault.container;
				if (settings.container.class == undefined) 	settings.container.class 	= settingsDefault.container.class;
				if (settings.container.height == undefined) settings.container.height = settingsDefault.container.height;

				// check child & child properties
				if (settings.child == undefined) 				settings.child 				= settingsDefault.child;
				if (settings.child.class == undefined) 	settings.child.class 	= settingsDefault.child.class;
			}

			var containers = document.getElementsByClassName(settings.container.class);

			// loop containers
			for (var i = 0; i < containers.length; i++) {
				var obj = {};
				var container = {};

				container.el = containers[i];
				container.offset = ParaLib.offsetTop(container.el);
				container.height = container.el.clientHeight;
				obj.container = container;

				obj.children = [];
				var children = containers[i].getElementsByClassName(settings.child.class);

					for (var j = 0; children[j]; j++) {

						var child = {};
						child.el = children[j];
						if (child.el.innerHTML == "") child.el.innerHTML = "&nbsp;"; // resolve bootstrap issue with empty content..
						child.paraFactor = child.el.getAttribute("paraFactor");
						window.getComputedStyle(child.el).getPropertyValue("background-image") == 'none' ? child.hasImage = false : child.hasImage = true;
						pp("child", child);

						if (child.paraFactor !== null) {
							var bgImg = window.getComputedStyle(child.el).getPropertyValue("background-image");

							// if the para-block has a background image
							if (bgImg != "" && bgImg != "none") {

								// calculates the negative top property
								// negative scroll distance
								// plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
								var top = 0;
								var scrollDist = 0;
								var paddingBottom = 0;

								// if the para-block offset is less than the windowheight, then the scrolldist will have to be recalculated
								if (container.offset < ParaLib.windowProps.windowHeight) {
									scrollDist = (container.height + container.offset) / Math.abs(child.paraFactor);

									if (child.paraFactor > 0) {
										top = - Math.abs(container.offset);
										paddingBottom = container.height + container.offset;
									} else {
										paddingBottom = scrollDist + (container.height);
									}
									

									// the para-block is below the initial windowheight
								} else {
									scrollDist = (container.height + ParaLib.windowProps.windowHeight) / Math.abs(child.paraFactor);
									paddingBottom = scrollDist + container.height;

									if (child.paraFactor > 0) {
										top = - scrollDist;
										paddingBottom = container.height + (ParaLib.windowProps.windowHeight / Math.abs(child.paraFactor));
									} else {
										paddingBottom = scrollDist + container.height;
									}
								}

								child.el.style.setProperty("padding-bottom", paddingBottom + "px", null);
								// child.el.style.setProperty("top", top + "px", null);
								child.el.style.setProperty("margin-top", top + "px", null);
							}
						}

						obj.children.push(child);
						// pp("child", child);

				} // end of for children

				ParaLib.paraArr.push(obj);
			} // loop container

		}


		// checks if the parallax image is in viewport.
		// @PARAM typeVar , the type, e.g. "paraVar" or "meetVar"
		// @PARAM i 			, index of the element that will match against variable arrays
		// @RETURN bool 	, true/false
		ParaLib.isInViewport = function(offset, height) {
			// console.log("scrollTop: ", ParaLib.windowProps.scrollTop, " wHeight: ", ParaLib.windowProps.windowHeight);
			// console.log("offset: ", offset, " height: ", height);
			return (
						ParaLib.windowProps.scrollTop + ParaLib.windowProps.windowHeight - offset > 0
							&&
						ParaLib.windowProps.scrollTop < offset + height
						);
		}


		// translates the parallax blocks, creating the effect
		ParaLib.translate = function() {

			// loop parallax blocks
			for (var i = 0; i < ParaLib.paraArr.length; i++) {
				var containerObj = ParaLib.paraArr[i].container;

				// check if parallax block is in viewport
				if (ParaLib.isInViewport(containerObj.offset, containerObj.height)) {

					// if any parallax is within the first windowheight, transform from 0 (ParaLib.scrollTop)
					if (containerObj.offset < ParaLib.windowProps.windowHeight) {
						var calc = ParaLib.windowProps.scrollTop;

						// if the parallax is further down on the page
						// calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
					} else {
						var calc = ParaLib.windowProps.windowHeight - containerObj.offset + ParaLib.windowProps.scrollTop;
					}

					for (var j = 0; j < ParaLib.paraArr[i].children.length; j++) {
						var childObj = ParaLib.paraArr[i].children[j];

						// perform the transform
						ParaLib.transform(
				    	childObj.el,
				    	"translate3d(0," + (calc / childObj.paraFactor) + "px, 0)"
				    );

					} // end of for children

				} // end of if

			} // end of for container
	  } // translate


	  // window resize event
	  window.onresize = function(e) {
	  	ParaLib.updateWindowProps_OnResize();
	  }


		// binds a function "raf" to window
		window.raf = (function() {
		  return window.requestAnimationFrame  ||
		    window.webkitRequestAnimationFrame ||
		    window.mozRequestAnimationFrame    ||
		    function (callback) {
					window.setTimeout(callback, 1000 / 60); // 60 FPS
		    };
		})();


		function updateLoop() {
			ParaLib.updateWindowProps_OnRaf();
			ParaLib.translate();
			raf(updateLoop);
		}


		raf(updateLoop);


    return ParaLib;

  } // end of define_ParaLib()


  /**
   * Define ParaLib to window if not already done
   */
  if (typeof(ParaLib) === 'undefined') {
    window.ParaLib = define_ParaLib();
  	console.log("%c ParaLib defined.", "color: green");
  } else {
    console.log("%c ParaLib already defined.", "color: red");
  }

})(window);



/**
 * Settings for customizing the parallax
 * @type {Object}
 * @structure
 * settings = {
 * 	container : {
 * 		class : String,
 * 		height : Int
 * 	},
 * 	child : {
 * 		class : String
 * 	}
 * }
 */
var settings = {
	container : {
		class : 'para-container',
		height : 500
	},
	child : {
		class : 'para-block'
	}
};

ParaLib.init(settings);










