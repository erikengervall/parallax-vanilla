'use strict';

;(function (window) {
  /**
   * Defines pv
   * @return {Object} pv object
   */
  var defineParallaxVanilla = function defineParallaxVanilla() {
    /**
    * [Library object]
    * @type {Object}
    */
    var pv = {};

    /**
    * Checks if String argument consists exclusively of numbers
    * @param  {String}  arg String to check
    * @return {Boolean}     True if String consists exclusively of numbers
    */
    pv.stringOfIntegers = function (arg) {
      return (/^[0-9]+$/.test(arg)
      );
    };

    /**
    * Transform prefixes for CSS
    * @param  {HTML-element} element A para-block element
    * @param  {CSS-style} style   E.g. 'transform3d(x, y, z)'
    */
    pv.transform = function (element, style) {
      element.style.webkitTransform = style;
      element.style.MozTransform = style;
      element.style.msTransform = style;
      element.style.OTransform = style;
      element.style.transform = style;
    };

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
    * 		blocks : [
    * 			block : {
    * 				el : HTML-element,
    * 				speed : getAttr('speed')
    * 			}
    * 		]
    * 	}
    * ]
    */
    pv.paraArr = [];

    /**
    * Window properties
    * @type {Object}
    */
    pv.windowProps = {
      scrollTop: window.scrollY,
      windowHeight: window.innerHeight,
      windowMidHeight: window.innerHeight / 2

      /**
      * Update selected attributes in windowProps on window raf event
      */
    };pv.updateWindowProps_OnRaf = function () {
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;
    };

    /**
    * Update selected attributes in pv.windowProps on window resize event
    */
    pv.updateWindowProps_OnResize = function () {
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;
      pv.windowProps.windowHeight = window.innerHeight;
      pv.windowProps.windowMidHeight = window.innerHeight / 2;
    };

    /**
    * Calculates the top offset from an element to the window's || document's top
    * @param  {HTML-element} el A pv-block element
    * @return {Int}    The element's top offset to document.
    * Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    */
    pv.offsetTop = function (el) {
      var rectTop = el.getBoundingClientRect().top,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rectTop + scrollTop;
    };

    /**
    * Initialize pv.paraArr
    * @param  {Object} settings User settings
    */
    pv.init = function (settings) {
      var settingsDefault = {
        container: {
          class: 'pv-container',
          height: '250px'
        },
        block: {
          class: 'pv-block',
          speed: -Math.PI,
          image: undefined
        }
      };

      settings = settings || settingsDefault;
      settings.container = settings.container || settingsDefault.container;
      settings.container.class = settings.container.class || settingsDefault.container.class;
      settings.container.height = settings.container.height || settingsDefault.container.height;
      settings.block = settings.block || settingsDefault.block;
      settings.block.class = settings.block.class || settingsDefault.block.class;
      settings.block.speed = settings.block.speed || settingsDefault.block.speed;
      settings.block.image = settings.block.image || settingsDefault.block.image;

      var containers = document.getElementsByClassName(settings.container.class);

      // loop containers
      for (var i = 0; i < containers.length; i++) {
        var obj = {};
        var container = {};

        container.el = containers[i];
        container.offset = pv.offsetTop(container.el);

        var pvHeight = container.el.getAttribute('pv-height');
        if (pvHeight == null) {
          container.el.style.height = settings.container.height;
        } else {
          if (pv.stringOfIntegers(pvHeight)) {
            // string only consists of integers, add px
            container.el.style.height = pvHeight + 'px';
          } else {
            // string has more than integers, assume suffix is either px or vh
            var suffix = pvHeight.substr(pvHeight.length - 2, pvHeight.length);
            if (suffix == 'px' || suffix == 'vh') {
              container.el.style.height = pvHeight;
            } else {
              throw new Error('Invalid height');
            }
          }
        }

        container.height = container.el.clientHeight;

        obj.container = container;

        obj.blocks = [];
        var blocks = containers[i].getElementsByClassName(settings.block.class);

        for (var j = 0; j < blocks.length; j++) {
          var block = {};
          block.el = blocks[j];

          var userDefinedSpeed = block.el.getAttribute('pv-speed');
          if (userDefinedSpeed == null) {
            block.speed = settings.block.speed;
          } else {
            if (userDefinedSpeed == 0 || userDefinedSpeed == 0.0) {
              block.speed = settings.block.speed;
            } else {
              block.speed = userDefinedSpeed;
            }
          }

          var userDefinedImage = block.el.getAttribute('pv-image');
          if (userDefinedImage == null) {
            if (settings.block.image !== undefined) {
              block.el.style.backgroundImage = "url('" + settings.block.image + "')";
            }
          } else {
            block.el.style.backgroundImage = "url('" + userDefinedImage + "')";
          }

          var image = window.getComputedStyle(block.el).getPropertyValue('background-image');

          // if the pv-block has a background image
          if (image != 'none') {
            // calculates the negative top property
            // negative scroll distance
            // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
            var top = 0;
            var scrollDist = 0;
            var paddingBottom = 0;

            // if the pv-block offset is less than the windowheight, then the scrolldist will have to be recalculated
            if (container.offset < pv.windowProps.windowHeight) {
              scrollDist = (container.height + container.offset) / Math.abs(block.speed);

              if (block.speed > 0) {
                top = -Math.abs(container.offset);
                paddingBottom = container.height + container.offset;
              } else {
                paddingBottom = scrollDist + container.height;
              }

              // the pv-block is below the initial windowheight
            } else {
              scrollDist = (container.height + pv.windowProps.windowHeight) / Math.abs(block.speed);
              paddingBottom = scrollDist + container.height;

              if (block.speed > 0) {
                top = -scrollDist;
                paddingBottom = container.height + pv.windowProps.windowHeight / Math.abs(block.speed);
              } else {
                paddingBottom = scrollDist + container.height;
              }
            }

            if (Math.abs(top) >= Math.abs(paddingBottom)) paddingBottom = Math.abs(top) + 1;

            block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null);
            block.el.style.setProperty('margin-top', top + 'px', null);
          }

          obj.blocks.push(block);
        } // end of for blocks

        pv.paraArr.push(obj);
      } // loop container
      // pp("pv.paraArr", pv.paraArr)
    };

    // checks if the parallax image is in viewport.
    pv.isInViewport = function (offset, height) {
      return pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 && pv.windowProps.scrollTop < offset + height;
    };

    // translates the parallax blocks, creating the effect
    pv.translate = function () {
      // loop parallax blocks
      for (var i = 0; i < pv.paraArr.length; i++) {
        var containerObj = pv.paraArr[i].container;
        var calc = void 0;

        // check if parallax block is in viewport
        if (pv.isInViewport(containerObj.offset, containerObj.height)) {
          // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
          if (containerObj.offset < pv.windowProps.windowHeight) {
            calc = pv.windowProps.scrollTop;

            // if the parallax is further down on the page
            // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
          } else {
            calc = pv.windowProps.windowHeight - containerObj.offset + pv.windowProps.scrollTop;
          }

          for (var j = 0; j < pv.paraArr[i].blocks.length; j++) {
            var block = pv.paraArr[i].blocks[j];

            // perform the transform
            pv.transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)');
          } // end of for blocks
        } // end of if
      } // end of for container
    }; // translate

    // window resize event
    /**
    * Window on resize event, updates pv.windowProps
    */
    window.onresize = function () {
      pv.updateWindowProps_OnResize();
      pv.init();
    };

    /**
    * Request animation frame
    * Binds function to window
    */
    window.raf = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60); // 60 FPS
      };
    }();

    /**
    * Main loop for updating variables and performing translates
    */
    var updateLoop = function updateLoop() {
      pv.updateWindowProps_OnRaf();
      pv.translate();
      raf(updateLoop);
    };

    /**
    * Initialize main loop
    */
    raf(updateLoop);

    /**
    * Returns the library
    */
    return pv;
  }; // end of define_pv()

  /**
   * Define pv to window if not already done
   */
  if (typeof pv === 'undefined') {
    window.pv = defineParallaxVanilla();
    console.log('%c parallax-vanilla defined.', 'color: green');
  } else {
    console.log('%c parallax-vanilla already defined.', 'color: red');
  }
})(window);
//# sourceMappingURL=parallax-vanilla.js.map
