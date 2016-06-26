// http://codepen.io/engervall/pen/ZOWyBe

jQuery(document).ready(function($) {

	var shared = {
		scrollTop    		: window.scrollY,
		windowHeight 		: window.innerHeight,
		windowMidHeight : window.innerHeight / 2,

		// transform
		transform : function(element, style) {
		  element.style.webkitTransform = style;
		  element.style.MozTransform = style;
		  element.style.msTransform = style;
		  element.style.OTransform = style;
		  element.style.transform = style;
		},

		// updates shared variables
		updateVars : function() {
			shared.scrollTop = window.scrollY;
		},

		updateVarsOnResize : function() {
			this.scrollTop 				= window.scrollY;
			this.windowHeight 		= window.innerHeight;
			this.windowMidHeight 	= window.innerHeight / 2;
		},


		// setup type arrays.
		setupTypeArr : function(container_class, child_class, typeArr) {
			/*
				typeArr = [

					obj1 : {
						container: {
							el : element,
							offset : offsetTop,
							height : clientHeight
						},
						children : [
							child1 : {
								el 												: element,
								parallaxdenominatorfactor : getAttr("parallaxdenominatorfactor"),
								meetinittransformy 				: getAttr("meetinittransformy")
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
					child.parallaxdenominatorfactor = children[j].getAttribute("parallaxdenominatorfactor");
					child.meetinittransformy = children[j].getAttribute("meetinittransformy");
					obj.children.push(child);

				} // end of for children

				typeArr.push(obj);
			} // loop container
		},

		// checks if the parallax image is in viewport.
		// @PARAM typeVar , the type, e.g. "paraVar" or "meetVar"
		// @PARAM i 			, index of the element that will match against variable arrays
		// @RETURN bool 	, true/false
		isInViewport : function(offset, height) {
			// console.log("scrollTop: ", shared.scrollTop, " wHeight: ", shared.windowHeight);
			// console.log("offset: ", offset, " height: ", height);
			return (
						shared.scrollTop + shared.windowHeight - offset > 0
							&&
						shared.scrollTop < offset + height
						);
		}
	}
	pp("shared", shared);


	/****************************************
	*****************************************
		PARALLAX
	*****************************************/
	var para = {
		paraArr : [],

		// translates the parallax blocks, creating the effect
		translate : function() {

			// loop parallax blocks
			for (var i = 0; i < this.paraArr.length; i++) {
				var containerObj = this.paraArr[i].container;

				// check if parallax block is in viewport
				if (shared.isInViewport(containerObj.offset, containerObj.height)) {

					// if any parallax is within the first windowheight, transform from 0 (this.scrollTop)
					if (containerObj.offset < shared.windowHeight) {
						var calc = shared.scrollTop;

						// if the parallax is further down on the page
						// calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
					} else {
						var calc = shared.windowHeight - containerObj.offset + shared.scrollTop;
					}

					for (var j = 0; j < this.paraArr[i].children.length; j++) {
						var childObj = this.paraArr[i].children[j];

						// perform the transform
						shared.transform(
				    	childObj.el,
				    	"translate3d(0," + (calc / childObj.parallaxdenominatorfactor) + "px, 0)"
				    );

					} // end of for children

				} // end of if

			} // end of for container
	  },

	  // initializes the class, calculating variables etc
	  init : function() {
	  	shared.setupTypeArr("para-container", "para-block", this.paraArr);
			pp("paraArr", this.paraArr); // pp for pretty print
	  }
	}; // end of paraFunc


	// instantiate variables
	para.init();





	/****************************************
	*****************************************
		MEET BLOCKS
	*****************************************/
	var meet = {
		meetArr : [],

		translate : function() {
			// loop meet blocks
			for (var i = 0; i < this.meetArr.length; i++) {
				var containerObj = this.meetArr[i].container;

				// check if meet block is in viewport
				if (shared.isInViewport(containerObj.offset, containerObj.height)) {

					var start 		= containerObj.offset - shared.windowHeight;
					var end 			= containerObj.offset + (containerObj.height / 3) - shared.windowMidHeight;
					var interval 	= end - start;
					var progress 	= 1 - ((shared.scrollTop - start) / interval);

					// console.log("start: ", start, " end: ", end, " interval: ", interval);
					// console.log("scrollTop: ", shared.scrollTop, " prog: ", progress);

					// perform the transform
					for (var j = 0; j < this.meetArr[i].children.length; j++) {
						var childObj = this.meetArr[i].children[j];

						var calc = childObj.meetinittransformy * progress;

						if (shared.scrollTop > end) {
							var calc = 0;
						}

						shared.transform(
				    	childObj.el,
				    	"translate3d(0," + calc + "%, 0)"
				    );

					} // end of for meet_blocks

				} // end of if isInViewport

			} // end of for meet_containers

		},

		init : function() {
	  	shared.setupTypeArr("meet-container", "meet-block", this.meetArr);
			pp("meetArr", this.meetArr);
		}

	}; // end of meetFunc


	// instantiate variables
	meet.init();



	/****************************************
	*****************************************
		LOADING NEW CONTENT ON SCROLL
	*****************************************/
	var lazyLoad = {

		lazyArr : [
		],

		setupLazyArr : function() {
			var lazyBlocks = document.getElementsByClassName("lazy-block");

			for (var i = 0; lazyBlocks[i]; i++) {
				var lazyBlock = {};
				lazyBlocks[i].style.transitionDuration = lazyBlocks[i].getAttribute("translate-speed");
				lazyBlock.el = lazyBlocks[i];
				lazyBlock.offset = lazyBlocks[i].offsetTop;
				lazyBlock.height = lazyBlocks[i].clientHeight;

				this.lazyArr.push(lazyBlock);
			}
		},

		// decides how far into the viewport the actual offset point of the element is before the animation begins.
		startPointPadding :
			150
		,

		translate : function() {
			// perform the transform
			for (var i = 0; i < this.lazyArr.length; i++) {

				// check if block is in viewport
				if (shared.isInViewport(this.lazyArr[i].offset + this.startPointPadding, this.lazyArr[i].height)) {

					if (!$(this.lazyArr[i].el).hasClass('lazy-block-show')) {
						this.lazyArr[i].el.className += " lazy-block-show";
					}

				} // end of if isInViewport

			} // end of for meet_containers
		},

		init : function() {
			this.setupLazyArr();
			pp("lazyArr", this.lazyArr);
		}
	}

	lazyLoad.init();



	/****************************************
	*****************************************
		RAF & MAIN LOOPS
	*****************************************/
	// binds a function "raf" to window
	window.raf = (function() {
	  return window.requestAnimationFrame  ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame    ||
	    function (callback) {
				window.setTimeout(callback, 1000 / 60); // 60 FPS
	    };
	})();

	// updateLoop loop for each requested animation frame
	function updateLoop() {
		shared.updateVars();
		para.translate();
		meet.translate();
		lazyLoad.translate();
	  raf(updateLoop);
	}

	// call raf with function "updateLoop", starts the infinite loop
	raf(updateLoop);




	/****************************************
	*****************************************
		EVENTS
	*****************************************/
	// triggers on resize
	window.onresize = function(e) {
		shared.updateVarsOnResize();
	}


	/****************************************
	*****************************************
		DEV
	*****************************************/
	if (dev.debugger) {
	  $(window).keydown(function(e) { if (e.keyCode == 219) debugger; });
	}

}); // doc ready $



