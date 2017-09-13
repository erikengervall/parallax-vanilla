"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var videoExtensions = ['3g2', '3gp', 'asf', 'avi', 'flv', 'h264', 'm4v', 'mov', 'mp4', 'mpg', 'mpeg', 'rm', 'srt', 'swf', 'vow', 'vob', 'wmv'];

    var defaultSettings = {
      container: {
        class: 'pv-container',
        height: '250px'
      },
      block: {
        class: 'pv-block',
        speed: -Math.PI,
        mediatype: 'image',
        mediapath: undefined
      }
    };

    module.exports = { videoExtensions: videoExtensions, defaultSettings: defaultSettings };
  }, {}], 2: [function (require, module, exports) {
    // pretty print
    // function pp(source, obj) {
    //   var date  = new Date(),
    //       h     = date.getHours(),
    //       m     = date.getMinutes(),
    //       s     = date.getSeconds(),
    //       now   = h+":"+m+":"+s+" <- "+source
    //   console.log("%c " + now, "color:blue;font-size:15px;");
    //   if (obj instanceof HTMLElement) {
    //   	console.log(obj);
    //   } else {
    // 	  console.log(JSON.stringify(obj, null, 2));
    //   }
    // }

    // Checks if String argument consists exclusively of numbers
    var isStringOfIntegers = function isStringOfIntegers(arg) {
      return (/^[0-9]+$/.test(arg)
      );
    };

    // Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    var offsetTop = function offsetTop(el) {
      var rectTop = el.getBoundingClientRect().top,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rectTop + scrollTop;
    };

    // checks if the parallax image is in viewport.
    var isInViewport = function isInViewport(offset, height) {
      return pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 && pv.windowProps.scrollTop < offset + height;
    };

    // Returns the extension of a media path
    var getExtension = function getExtension(attrMediapath) {
      var extension = attrMediapath.substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length).toLowerCase();
      return extension === -1 ? console.error('Invalid extension for media with media path: ' + attrMediapath) : extension;
    };

    // returns {true} if media is a video
    var isVideo = function isVideo(attrMediatype, attrMediapath) {
      return attrMediatype === 'video' || pv.videoExtensions.indexOf(pv.getExtension(attrMediapath)) !== -1;
    };

    module.exports = { isStringOfIntegers: isStringOfIntegers, offsetTop: offsetTop, isInViewport: isInViewport, getExtension: getExtension, isVideo: isVideo };
  }, {}], 3: [function (require, module, exports) {
    var _require = require('./initContainer'),
        setContainerHeight = _require.setContainerHeight;

    var _require2 = require('./initBlock'),
        setBlockSpeed = _require2.setBlockSpeed,
        setBlockMediatype = _require2.setBlockMediatype,
        setBlockMediapath = _require2.setBlockMediapath,
        setBlockVisual = _require2.setBlockVisual;

    module.exports = function (settings) {
      pv.windowProps = {
        scrollTop: window.scrollY,
        windowHeight: window.innerHeight,
        windowMidHeight: window.innerHeight / 2
      };

      var _require3 = require('./constants'),
          defaultSettings = _require3.defaultSettings;

      settings ? settings = Object.assign(settings, defaultSettings) : settings = Object.assign({}, defaultSettings);
      settings.container.class.toLowerCase();
      settings.block.class.toLowerCase();
      settings.block.mediatype.toLowerCase();

      var containers = document.getElementsByClassName(settings.container.class);
      for (var i = 0; i < containers.length; i++) {
        var pvObj = {};
        var container = {};

        container.el = containers[i];
        container.offset = pv.offsetTop(container.el);
        container.el.style.height = setContainerHeight(container, settings);
        container.height = container.el.clientHeight;

        pvObj.container = container;
        pvObj.blocks = [];

        var blocks = containers[i].getElementsByClassName(settings.block.class);
        for (var j = 0; j < blocks.length; j++) {
          var block = {};

          block.el = blocks[j];
          block.speed = setBlockSpeed(block, settings);
          block.mediapath = setBlockMediapath(block, settings);
          block.mediatype = setBlockMediatype(block, settings);
          if (block.mediatype === 'video') pvObj.container.hasVideoBlock = true;

          var successful = setBlockVisual(block);
          if (!successful) console.error('Did not successfully set media for block: ' + block);

          // calculates the negative top property
          // negative scroll distance
          // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
          var marginTop = 0;
          var scrollDist = 0;
          var paddingBottom = 0;

          // if the pv-block offset is less than the windowheight, then the scrolldist will have to be recalculated
          if (container.offset < pv.windowProps.windowHeight) {
            scrollDist = (container.height + container.offset) / Math.abs(block.speed);

            if (block.speed > 0) {
              marginTop = -Math.abs(container.offset);
              paddingBottom = container.height + container.offset;
            } else {
              paddingBottom = scrollDist + container.height;
            }
          } else {
            // the pv-block is below the initial windowheight
            scrollDist = (container.height + pv.windowProps.windowHeight) / Math.abs(block.speed);
            paddingBottom = scrollDist + container.height;

            if (block.speed > 0) {
              marginTop = -scrollDist;
              paddingBottom = container.height + pv.windowProps.windowHeight / Math.abs(block.speed);
            } else {
              paddingBottom = scrollDist + container.height;
            }
          }

          if (Math.abs(marginTop) >= Math.abs(paddingBottom)) paddingBottom = Math.abs(marginTop) + 1;

          block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null);
          block.el.style.setProperty('margin-top', marginTop + 'px', null);

          pvObj.blocks.push(block);
        } // end of for blocks

        pv.pvArr.push(pvObj);
      } // loop container
      // pp("pv.pvArr", pv.pvArr)
    };
  }, { "./constants": 1, "./initBlock": 4, "./initContainer": 5 }], 4: [function (require, module, exports) {
    var setBlockSpeed = function setBlockSpeed(block, settings) {
      var attrSpeed = block.el.getAttribute('pv-speed');

      // No data attribute defined
      if (!attrSpeed) return settings.block.speed;

      // Speed is set to 0 (fall back on block speed)
      if (attrSpeed == 0) return settings.block.speed;

      return attrSpeed;
    };

    var setBlockMediapath = function setBlockMediapath(block, settings) {
      var attrMediapath = block.el.getAttribute('pv-mediapath');

      // No data attribute defined
      if (!attrMediapath) return console.error('Media path not defined for block: ' + block.el);

      return attrMediapath;
    };

    var setBlockMediatype = function setBlockMediatype(block, settings) {
      var mediatype = block.el.getAttribute('pv-mediatype');
      var attrMediapath = block.el.getAttribute('pv-mediapath');

      // Data attribute defined
      if (!mediatype) mediatype = settings.block.mediatype;

      // Media type set to video
      if (pv.isVideo(mediatype, attrMediapath)) mediatype = 'video';

      // Default
      return mediatype;
    };

    var setBlockImage = function setBlockImage(block) {
      var mediatype = block.mediatype,
          mediapath = block.mediapath;


      block.el.style.backgroundImage = "url('" + mediapath + "')";

      // Check if the background image did not get set
      var backgroundImageFromDOM = window.getComputedStyle(block.el).getPropertyValue('background-image');
      if (backgroundImageFromDOM == 'none') return false;

      return true;
    };

    var setBlockVideo = function setBlockVideo(block) {
      var mediatype = block.mediatype,
          mediapath = block.mediapath;


      var videoEl = document.createElement('video');
      videoEl.src = mediapath;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.defaultMuted = true;
      videoEl.muted = true;
      block.isPlaying = true;
      block.videoEl = videoEl;
      block.el.appendChild(videoEl);

      return true;
    };

    var setBlockVisual = function setBlockVisual(block) {
      var mediatype = block.mediatype;


      if (mediatype === 'image') return setBlockImage(block);
      if (mediatype === 'video') return setBlockVideo(block);

      return false;
    };

    module.exports = { setBlockSpeed: setBlockSpeed, setBlockMediatype: setBlockMediatype, setBlockMediapath: setBlockMediapath, setBlockVisual: setBlockVisual };
  }, {}], 5: [function (require, module, exports) {
    var setContainerHeight = function setContainerHeight(container, settings) {
      var attrHeight = container.el.getAttribute('pv-height');

      // No data attribute
      if (!attrHeight) return settings.container.height;

      // String only consists of integers, add px
      if (pv.isStringOfIntegers(attrHeight)) return attrHeight + 'px';

      // String has more than integers, assume suffix is either px or vh
      var suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length);
      if (suffix == 'px' || suffix == 'vh') return attrHeight;

      throw new Error('Invalid height suffix, expected "px" or "vh" but got: ' + suffix);
    };

    module.exports = { setContainerHeight: setContainerHeight };
  }, {}], 6: [function (require, module, exports) {
    ;(function (window) {
      var defineParallaxVanilla = function defineParallaxVanilla() {
        var pv = {};

        Object.assign(pv, require('./help-functions'));
        Object.assign(pv, require('./constants'));

        /**
        * Primary data handler for containers and blocks.
        * @type {Array}
        * @structure
        * pvArr = [
        * 	obj : {
        * 		container : {
        * 			el : HTML-element,
        * 			offset : offsetTop,
        * 			height : clientHeight
        * 		},
        * 		blocks : [
        * 			block : {
        * 				el : HTML-element,
        * 				speed : getAttr('pv-speed')
         *        mediatype: getAttr('pv-mediatype'),
         *        mediapath: getAttr('pv-mediapath'),
        * 			}
        * 		]
        * 	}
        * ]
        */
        pv.pvArr = [];
        pv.windowProps = {};
        pv.init = require('./init');
        pv.translate = require('./translate');
        pv.resize = require('./resize');

        window.onresize = function () {
          return pv.resize();
        };

        // Request animation frame, also binds function to window
        window.raf = function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60); // 60 FPS
          };
        }();

        //Main loop for updating variables and performing translates
        var updateLoop = function updateLoop() {
          pv.translate();
          raf(updateLoop);
        };

        // Initialize main loop
        raf(updateLoop);

        return pv;
      };

      // Define pv
      if (typeof pv === 'undefined') {
        window.pv = defineParallaxVanilla();
        console.log('%c parallax-vanilla defined.', 'color: green');
      } else {
        console.log('%c parallax-vanilla already defined.', 'color: red');
      }
    })(window);
  }, { "./constants": 1, "./help-functions": 2, "./init": 3, "./resize": 7, "./translate": 8 }], 7: [function (require, module, exports) {
    module.exports = function () {
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;
      pv.windowProps.windowHeight = window.innerHeight;
      pv.windowProps.windowMidHeight = window.innerHeight / 2;
      pv.init();
    };
  }, {}], 8: [function (require, module, exports) {
    //Transform prefixes for CSS
    var transform = function transform(element, style) {
      element.style.webkitTransform = style;
      element.style.MozTransform = style;
      element.style.msTransform = style;
      element.style.OTransform = style;
      element.style.transform = style;
    };

    module.exports = function () {
      // Update selected attributes in windowProps on window raf event
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;

      // translate the parallax blocks, creating the parallax effect
      for (var i = 0; i < pv.pvArr.length; i++) {
        var containerObj = pv.pvArr[i].container;
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

          for (var j = 0; j < pv.pvArr[i].blocks.length; j++) {
            var block = pv.pvArr[i].blocks[j];
            if (block.mediatype === 'video' && !block.isPlaying) {
              block.videoEl.play();
              block.isPlaying = true;
            }
            transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)');
          }
        } else {
          // check if container even has a video block
          if (containerObj.hasVideoBlock) {
            // pause blocks with playing video
            for (var _j = 0; _j < pv.pvArr[i].blocks.length; _j++) {
              var _block = pv.pvArr[i].blocks[_j];
              if (_block.mediatype === 'video' && _block.isPlaying) {
                _block.videoEl.pause();
                _block.isPlaying = false;
              }
            }
          }
        }
      }
    };
  }, {}] }, {}, [1, 2, 3, 4, 5, 6, 7, 8]);
//# sourceMappingURL=parallax-vanilla.js.map
