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
    var _require = require('./constants'),
        videoExtensions = _require.videoExtensions;

    // pretty print


    var pp = function pp(source, obj) {
      var date = new Date(),
          h = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds(),
          now = h + ':' + m + ':' + s + ' <- ' + source;
      console.log('%c ' + now, 'color:blue;font-size:15px;');
      if (obj instanceof HTMLElement) {
        console.log(obj);
      } else {
        console.log(JSON.stringify(obj, null, 2));
      }
    };

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
      return attrMediatype === 'video' || videoExtensions.indexOf(getExtension(attrMediapath)) !== -1;
    };

    var updateWindowProps = function updateWindowProps() {
      pv.windowProps = {
        scrollTop: window.scrollY || document.documentElement.scrollTop,
        windowHeight: window.innerHeight,
        windowMidHeight: window.innerHeight / 2
      };
    };

    module.exports = {
      pp: pp,
      isStringOfIntegers: isStringOfIntegers,
      offsetTop: offsetTop,
      isInViewport: isInViewport,
      getExtension: getExtension,
      isVideo: isVideo,
      updateWindowProps: updateWindowProps
    };
  }, { "./constants": 1 }], 3: [function (require, module, exports) {
    var _require2 = require('./initContainer'),
        setContainerHeight = _require2.setContainerHeight;

    var _require3 = require('./initBlock'),
        setBlockSpeed = _require3.setBlockSpeed,
        setBlockMediatype = _require3.setBlockMediatype,
        setBlockMediapath = _require3.setBlockMediapath,
        setBlockVisual = _require3.setBlockVisual,
        setBlockAttributes = _require3.setBlockAttributes;

    var _require4 = require('./constants'),
        defaultSettings = _require4.defaultSettings;

    var _require5 = require('./help-functions'),
        updateWindowProps = _require5.updateWindowProps,
        offsetTop = _require5.offsetTop,
        pp = _require5.pp;

    module.exports = function (settings) {
      pv.containerArr = [];
      pv.settings = initSettings(settings, defaultSettings);

      var containers = document.getElementsByClassName(pv.settings.container.class);
      for (var i = 0; i < containers.length; i++) {
        var container = {};

        container.el = containers[i];
        container.offset = offsetTop(container.el);
        container.el.style.height = setContainerHeight(container, pv.settings);
        container.height = container.el.clientHeight;

        container.blocks = [];

        var blocks = containers[i].getElementsByClassName(pv.settings.block.class);
        for (var j = 0; j < blocks.length; j++) {
          var block = {};

          block.el = blocks[j];
          block.speed = setBlockSpeed(block, pv.settings);
          block.mediapath = setBlockMediapath(block, pv.settings);
          block.mediatype = setBlockMediatype(block, pv.settings);
          if (block.mediatype === 'video') container.hasVideoBlock = true;

          var successful = setBlockVisual(block);
          if (!successful) console.error('Did not successfully set media for block: ' + block);

          setBlockAttributes(container, block);

          container.blocks.push(block);
        } // end of for blocks

        pv.containerArr.push(container);
      } // loop container
      // pp('pv.containerArr', pv.containerArr)
    };

    var initSettings = function initSettings(settings, defaultSettings) {
      if (!settings || settings === {}) return defaultSettings;
      if (!settings.container || settings.container === {}) {
        settings.container = defaultSettings.container;
      } else {
        if (!settings.container.class) settings.container.class = defaultSettings.container.class;
        if (!settings.container.height) settings.container.height = defaultSettings.container.height;
      }
      if (!settings.block || settings.block === {}) {
        settings.block = defaultSettings.block;
      } else {
        if (!settings.block.class) settings.block.class = defaultSettings.block.class;
        if (!settings.block.speed) settings.block.speed = defaultSettings.block.speed;
        if (!settings.block.mediatype) settings.block.mediatype = defaultSettings.block.mediatype;
        if (!settings.block.mediapath) settings.block.mediapath = defaultSettings.block.mediapath;
      }
      return settings;
    };
  }, { "./constants": 1, "./help-functions": 2, "./initBlock": 4, "./initContainer": 5 }], 4: [function (require, module, exports) {
    var _require6 = require('./help-functions'),
        updateWindowProps = _require6.updateWindowProps,
        isVideo = _require6.isVideo;

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
      if (isVideo(mediatype, attrMediapath)) mediatype = 'video';

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

    var setBlockAttributes = function setBlockAttributes(container, block) {
      updateWindowProps();
      // calculates the negative top property
      // negative scroll distance
      // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
      var marginTop = 0,
          scrollDist = 0,
          paddingBottom = 0;

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
    };

    module.exports = {
      setBlockSpeed: setBlockSpeed,
      setBlockMediatype: setBlockMediatype,
      setBlockMediapath: setBlockMediapath,
      setBlockVisual: setBlockVisual,
      setBlockAttributes: setBlockAttributes
    };
  }, { "./help-functions": 2 }], 5: [function (require, module, exports) {
    var _require7 = require('./help-functions'),
        isStringOfIntegers = _require7.isStringOfIntegers;

    var setContainerHeight = function setContainerHeight(container, settings) {
      var attrHeight = container.el.getAttribute('pv-height');

      // No data attribute
      if (!attrHeight) return settings.container.height;

      // String only consists of integers, add px
      if (isStringOfIntegers(attrHeight)) return attrHeight + 'px';

      // String has more than integers, assume suffix is either px or vh
      var suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length);
      if (suffix == 'px' || suffix == 'vh') return attrHeight;

      throw new Error('Invalid height suffix, expected "px" or "vh" but got: ' + suffix);
    };

    module.exports = { setContainerHeight: setContainerHeight };
  }, { "./help-functions": 2 }], 6: [function (require, module, exports) {
    arguments[4][4][0].apply(exports, arguments);
  }, { "./help-functions": 2, "dup": 4 }], 7: [function (require, module, exports) {
    ;(function (window) {
      var defineParallaxVanilla = function defineParallaxVanilla() {
        var pv = {};
        pv.init = require('./init'); // exposes init function to user

        window.onresize = function () {
          return require('./resize')();
        };

        // Request animation frame, also binds function to window
        window.raf = function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60); // 60 FPS
          };
        }();

        //Main loop for updating variables and performing translates
        var updateLoop = function updateLoop() {
          require('./translate')();
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
  }, { "./init": 3, "./resize": 8, "./translate": 9 }], 8: [function (require, module, exports) {
    var _require8 = require('./initblock'),
        setBlockAttributes = _require8.setBlockAttributes;

    module.exports = function () {
      for (var i = 0; i < pv.containerArr.length; i++) {
        var container = pv.containerArr[i];
        container.height = container.el.clientHeight;
        for (var j = 0; j < pv.containerArr[i].blocks.length; j++) {
          var block = pv.containerArr[i].blocks[j];
          setBlockAttributes(container, block);
        }
      }
    };
  }, { "./initblock": 6 }], 9: [function (require, module, exports) {
    var _require9 = require('./help-functions'),
        isInViewport = _require9.isInViewport;

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
      for (var i = 0; i < pv.containerArr.length; i++) {
        var container = pv.containerArr[i];
        var calc = void 0;

        // check if parallax block is in viewport
        if (isInViewport(container.offset, container.height)) {
          // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
          if (container.offset < pv.windowProps.windowHeight) {
            calc = pv.windowProps.scrollTop;

            // if the parallax is further down on the page
            // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
          } else {
            calc = pv.windowProps.windowHeight - container.offset + pv.windowProps.scrollTop;
          }

          for (var j = 0; j < pv.containerArr[i].blocks.length; j++) {
            var block = pv.containerArr[i].blocks[j];
            if (block.mediatype === 'video' && block.videoEl.paused) block.videoEl.play();

            transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)');
          }
        } else {
          // check if container even has a video block
          if (container.hasVideoBlock) {
            // pause blocks with playing video
            for (var _j = 0; _j < pv.containerArr[i].blocks.length; _j++) {
              var _block = pv.containerArr[i].blocks[_j];
              if (_block.mediatype === 'video' && !_block.videoEl.paused) _block.videoEl.pause();
            }
          }
        }
      }
    };
  }, { "./help-functions": 2 }] }, {}, [1, 2, 3, 4, 5, 7, 8, 9]);
//# sourceMappingURL=parallax-vanilla.js.map
