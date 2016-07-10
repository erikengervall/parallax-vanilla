(function(window) {
  'use strict';

  function define_ParaLib() {
  	// awesome library variable
  	var ParaLib = {};

		// transform prefixes
		ParaLib.transform = function(element, style) {
		  element.style.webkitTransform = style;
		  element.style.MozTransform = style;
		  element.style.msTransform = style;
		  element.style.OTransform = style;
		  element.style.transform = style;
		}

		// main data arr
		ParaLib.paraArr = [];

  	// window properties
  	ParaLib.windowProps = {
			scrollTop    		: window.scrollY,
			windowHeight 		: window.innerHeight,
			windowMidHeight : window.innerHeight / 2,
  	}

		// updates ParaLib.windowProps variables
		ParaLib.updateWindowProps_OnRaf = function() {
			ParaLib.windowProps.scrollTop = window.scrollY;
		}

		// update windowprops on resize
		ParaLib.updateWindowProps_OnResize = function() {
			ParaLib.windowProps.scrollTop 			= window.scrollY;
			ParaLib.windowProps.windowHeight 		= window.innerHeight;
			ParaLib.windowProps.windowMidHeight = window.innerHeight / 2;
		}

		// calculte child padding
		ParaLib.calcChildPadding = function(containerObj, child) {
			var el 					= child.el;
			var paraFactor 	= child.paraFactor;
			var calc = ParaLib.windowProps.windowHeight - containerObj.offset + ParaLib.windowProps.scrollTop;
	    var y = calc / paraFactor;
			console.log(el, paraFactor, calc, y);

			return 1;
		}

		// init paraArr
		ParaLib.init = function(settings) {
			/*
				paraArr = [
					obj1 : {
						container: {
							el : element,
							offset : offsetTop,
							height : clientHeight
						},
						children : [
							child1 : {
								el 												: element,
								paraFactor : getAttr("paraFactor"),
							},
							child2 : {
								...
							}
						]
					},

					obj2 : {
						...
					}
				]
			*/

			if (settings === 'undefined') {
				var container_class = "para-container";
				var child_class 		= "para-block";
			} else {
				var container_class = settings.container;
				var child_class 		= settings.child;

				if (settings.container === 'undefined') {
					var container_class = "para-container";
				}
				if (settings.child === 'undefined') {
					var child_class = "para-block";
				}
			}

			var containers = document.getElementsByClassName(container_class);

			for (var i = 0; containers[i]; i++) {
				var obj = {};
				
				var containerId = containers[i].id;

				var container = {};
				container.el = containers[i];
				container.offset = containers[i].offsetTop;
				container.height = containers[i].clientHeight;
				obj.container = container;

				obj.children = [];
				var children = containers[i].getElementsByClassName(child_class);

				for (var j = 0; children[j]; j++) {

					var child = {};
					child.el = children[j];
					child.paraFactor = children[j].getAttribute("paraFactor");
					child.paddingBottom = ParaLib.calcChildPadding(container, child);

					obj.children.push(child);

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

  //define globally if it doesn't already exist
  if (typeof(ParaLib) === 'undefined') {
  	console.log("%c ParaLib defined.", "color: green");
    window.ParaLib = define_ParaLib();
  } else {
    console.log("%c ParaLib already defined.", "color: red");
  }

})(window);


ParaLib.init({
	container : "para-container",
	child 		: "para-block"
});

