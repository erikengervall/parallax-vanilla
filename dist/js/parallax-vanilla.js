"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    var MEDIA_TYPES = {
      IMAGE: 'image',
      VIDEO: 'video',
      NONE: 'none'
    };

    var ELEMENT_DATA_KEYS = {
      MEDIAPATH: 'pv-mediapath',
      MEDIATYPE: 'pv-mediatype',
      MUTE: 'pv-mute',
      HEIGHT: 'pv-height',
      SPEED: 'pv-speed'
    };

    var defaultSettings = {
      container: {
        class: 'pv-container',
        height: '250px'
      },
      block: {
        class: 'pv-block',
        speed: -Math.PI,
        mediatype: MEDIA_TYPES.IMAGE,
        mediapath: null,
        mute: 'false'
      }
    };

    module.exports = { videoExtensions: videoExtensions, defaultSettings: defaultSettings, ELEMENT_DATA_KEYS: ELEMENT_DATA_KEYS, MEDIA_TYPES: MEDIA_TYPES };
  }, {}], 2: [function (require, module, exports) {
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

    module.exports = {};
  }, {}], 3: [function (require, module, exports) {
    var _require = require('./constants'),
        defaultSettings = _require.defaultSettings,
        MEDIA_TYPES = _require.MEDIA_TYPES;

    var _require2 = require('./initContainer'),
        setContainerHeight = _require2.setContainerHeight;

    var _require3 = require('./initBlock'),
        setBlockSpeed = _require3.setBlockSpeed,
        setBlockMediaProps = _require3.setBlockMediaProps,
        setBlockMute = _require3.setBlockMute,
        setBlockVisual = _require3.setBlockVisual,
        setBlockAttributes = _require3.setBlockAttributes;

    module.exports = function (settings) {
      pv.containerArr = [];
      pv.settings = initSettings(settings, defaultSettings);

      var containerElements = [].concat(_toConsumableArray(document.getElementsByClassName(pv.settings.container.class)));
      containerElements.forEach(function (containerElement) {
        var container = {};

        container.el = containerElement;
        container.offset = offsetTop(container.el);
        container.el.style.height = setContainerHeight(container, pv.settings);
        container.height = container.el.clientHeight;

        container.blocks = [];

        var blockElements = [].concat(_toConsumableArray(containerElement.getElementsByClassName(pv.settings.block.class)));
        blockElements.forEach(function (blockElement) {
          var block = {};

          block.el = blockElement;
          block.speed = setBlockSpeed(block, pv.settings);

          var _setBlockMediaProps = setBlockMediaProps(block, pv.settings),
              mediatype = _setBlockMediaProps.mediatype,
              mediapath = _setBlockMediaProps.mediapath;

          block.mediatype = mediatype;
          block.mediapath = mediapath;
          block.mute = setBlockMute(block, pv.settings);

          if (block.mediatype !== MEDIA_TYPES.NONE) {
            if (block.mediatype === MEDIA_TYPES.VIDEO) container.hasVideoBlock = true;

            var successful = setBlockVisual(block);
            if (!successful) {
              console.error('Did not successfully set media for block:', block);
              throw new Error('Did not successfully set media');
            }

            setBlockAttributes(container, block);
          }

          container.blocks.push(block);
        });

        pv.containerArr.push(container);
      });
    };

    var initSettings = function initSettings() {
      var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultSettings = arguments[1];

      Object.keys(userSettings).forEach(function (elementSettings) {
        if (!userSettings[elementSettings] instanceof Object) {
          throw new Error("Expected " + elementSettings + " to be of instance Object");
        }

        Object.keys(userSettings[elementSettings]).forEach(function (setting) {
          if (userSettings[elementSettings][setting] instanceof Object) {
            throw new Error("Expected " + elementSettings + " to be primitive value");
          }
          if (!defaultSettings[elementSettings].hasOwnProperty(setting)) {
            throw new Error("Expected " + setting + " to match available settings");
          }

          console.log('Modified defaultSettings with;', elementSettings, setting, userSettings[elementSettings][setting]);
          defaultSettings[elementSettings][setting] = userSettings[elementSettings][setting];
        });
      });

      return defaultSettings;
    };

    // Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    var offsetTop = function offsetTop(el) {
      var rectTop = el.getBoundingClientRect().top;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rectTop + scrollTop;
    };
  }, { "./constants": 1, "./initBlock": 4, "./initContainer": 5 }], 4: [function (require, module, exports) {
    var _require4 = require('./constants'),
        videoExtensions = _require4.videoExtensions,
        ELEMENT_DATA_KEYS = _require4.ELEMENT_DATA_KEYS,
        MEDIA_TYPES = _require4.MEDIA_TYPES;

    var setBlockSpeed = function setBlockSpeed(block, settings) {
      var attrSpeed = block.el.getAttribute(ELEMENT_DATA_KEYS.SPEED);

      // No data attribute defined
      if (!attrSpeed) return settings.block.speed;

      // Speed is a string
      if (typeof attrSpeed === 'string') {
        // Speed must consist solely of integers
        var attrSpeedNumber = Number(attrSpeed);
        if (isNaN(attrSpeedNumber)) {
          return console.error('Speed consist of more symbols than integers for block: ' + block.el);
        } else {
          attrSpeed = attrSpeedNumber;
        }
      }

      // Speed is set to 0 (fall back on block speed)
      if (attrSpeed == 0) return settings.block.speed;

      return attrSpeed;
    };

    var setBlockMediaProps = function setBlockMediaProps(block, settings) {
      var mediatype = block.el.getAttribute(ELEMENT_DATA_KEYS.MEDIATYPE);
      var mediapath = block.el.getAttribute(ELEMENT_DATA_KEYS.MEDIAPATH);

      if (mediatype === MEDIA_TYPES.NONE) return { mediatype: mediatype, mediapath: mediapath

        // No data attribute defined
      };if (!mediatype) mediatype = settings.block.mediatype;

      // Media type set to video
      if (mediapath && isVideo(mediatype, mediapath)) mediatype = MEDIA_TYPES.VIDEO;

      // No data attribute defined
      if (!mediapath && mediatype !== MEDIA_TYPES.NONE) {
        console.error('Media path not defined for block: ' + block.el);
        throw new Error('Media path not defined');
      }

      return { mediatype: mediatype, mediapath: mediapath };
    };

    var setBlockMute = function setBlockMute(block, settings) {
      var mute = block.el.getAttribute(ELEMENT_DATA_KEYS.MUTE);

      if (!mute) return settings.block.mute;

      return mute == 'true';
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

    var videoElClicked = function videoElClicked(videoEl, block) {
      if (pv.unmutedBlock && pv.unmutedBlock.videoEl !== videoEl) {
        pv.unmutedBlock.videoEl.muted = true;
        pv.unmutedBlock.audioButton.classList.add('mute');
      }
      pv.unmutedBlock = block;
      videoEl.muted = !videoEl.muted;
      block.muted = videoEl.muted;

      block.audioButton.classList.toggle('mute');
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
      block.muted = true;
      block.videoEl = videoEl;
      block.el.appendChild(videoEl);

      if (typeof window.orientation === 'undefined') {
        if (!block.mute) {
          videoEl.addEventListener('click', function () {
            videoElClicked(videoEl, block);
          });
          var audioButton = document.createElement('a');
          audioButton.href = '#';
          audioButton.className += 'audio-icon mute';
          audioButton.appendChild(document.createElement('span'));
          audioButton.addEventListener('click', function (e) {
            e.preventDefault();
            videoElClicked(videoEl, block);
          });
          block.audioButton = audioButton;
          block.el.insertAdjacentElement('afterend', audioButton);
        }
      }

      return true;
    };

    var setBlockVisual = function setBlockVisual(block) {
      var mediatype = block.mediatype;


      if (mediatype === MEDIA_TYPES.IMAGE) return setBlockImage(block);
      if (mediatype === MEDIA_TYPES.VIDEO) return setBlockVideo(block);

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
      setBlockMediaProps: setBlockMediaProps,
      setBlockMute: setBlockMute,
      setBlockVisual: setBlockVisual,
      setBlockAttributes: setBlockAttributes

      // Returns the extension of a media path
    };var getExtension = function getExtension(attrMediapath) {
      var extension = attrMediapath.substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length).toLowerCase();
      return extension === -1 ? console.error('Invalid extension for media with media path: ' + attrMediapath) : extension;
    };

    // returns {true} if media is a video
    var isVideo = function isVideo(attrMediatype, attrMediapath) {
      return attrMediatype === MEDIA_TYPES.VIDEO || videoExtensions.indexOf(getExtension(attrMediapath)) !== -1;
    };

    var updateWindowProps = function updateWindowProps() {
      pv.windowProps = {
        scrollTop: window.scrollY || document.documentElement.scrollTop,
        windowHeight: window.innerHeight,
        windowMidHeight: window.innerHeight / 2
      };
    };
  }, { "./constants": 1 }], 5: [function (require, module, exports) {
    var _require5 = require('./constants'),
        ELEMENT_DATA_KEYS = _require5.ELEMENT_DATA_KEYS;

    var setContainerHeight = function setContainerHeight(container, settings) {
      var attrHeight = container.el.getAttribute(ELEMENT_DATA_KEYS.HEIGHT);

      // No data attribute
      if (!attrHeight) return settings.container.height;

      // String only consists of integers, add px
      if (!isNaN(Number(attrHeight))) return attrHeight + 'px';

      // String has more than integers, assume suffix is either px or vh
      var suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length);
      if (suffix === 'px' || suffix === 'vh') return attrHeight;

      throw new Error('Invalid height suffix, expected "px" or "vh" but got: ' + suffix);
    };

    module.exports = { setContainerHeight: setContainerHeight };
  }, { "./constants": 1 }], 6: [function (require, module, exports) {
    arguments[4][4][0].apply(exports, arguments);
  }, { "./constants": 1, "dup": 4 }], 7: [function (require, module, exports) {
    ;(function (window) {
      var defineParallaxVanilla = function defineParallaxVanilla() {
        var pv = {};
        pv.init = require('./init'); // exposes init function to user

        if (typeof window.orientation === 'undefined') window.onresize = function () {
          return require('./resize')();
        };

        // Request animation frame, also binds function to window
        window.raf = function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60); // 60 FPS
          };
        }();

        // Main loop for updating variables and performing translates
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
    var _require6 = require('./constants'),
        MEDIA_TYPES = _require6.MEDIA_TYPES;

    var _require7 = require('./initblock'),
        setBlockAttributes = _require7.setBlockAttributes;

    module.exports = function () {
      pv.containerArr.forEach(function (container) {
        container.height = container.el.clientHeight;
        container.blocks.forEach(function (block) {
          if (block.mediatype !== MEDIA_TYPES.NONE) setBlockAttributes(container, block);
        });
      });
    };
  }, { "./constants": 1, "./initblock": 6 }], 9: [function (require, module, exports) {
    module.exports = function () {
      // Update selected attributes in windowProps on window raf event
      pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (pv.windowProps.scrollTop === pv.prevScrollTop) {
        return;
      } else {
        pv.prevScrollTop = pv.windowProps.scrollTop;
      }

      // translate the parallax blocks, creating the parallax effect
      for (var i = 0; i < pv.containerArr.length; i++) {
        var container = pv.containerArr[i];
        var calc = void 0;

        // check if parallax block is in viewport
        if (isInViewport(container.offset, container.height)) {
          if (i > pv.mostReContainerInViewport) pv.mostReContainerInViewport = i;
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
            if (block.videoEl) {
              block.videoEl.play();
              if (block === pv.unmutedBlock) {
                if (!block.muted) {
                  block.videoEl.muted = block.muted;
                  block.muted ? pv.unmutedBlock.audioButton.classList.add('mute') : pv.unmutedBlock.audioButton.classList.remove('mute');
                }
              }
            }

            transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)');
          }
        } else {
          // check if container even has a video block
          if (container.hasVideoBlock) {
            // pause blocks with playing video
            for (var _j = 0; _j < pv.containerArr[i].blocks.length; _j++) {
              var _block = pv.containerArr[i].blocks[_j];
              if (_block.videoEl) {
                _block.videoEl.pause();
                if (pv.unmutedBlock === _block) {
                  _block.videoEl.muted = true;
                }
              }
            }
          }
          var nextContainer = pv.containerArr[i + 1];
          // check if next container is in view - else break
          if (nextContainer && !isInViewport(nextContainer.offset, nextContainer.height) && pv.mostReContainerInViewport < i && !nextContainerIsSmaller(container, nextContainer)) {
            break;
          } else {
            if (nextContainer && isInViewport(nextContainer.offset, nextContainer.height)) {
              pv.mostReContainerInViewport = i + 1;
            }
          }
        }
      }
    };

    //Transform prefixes for CSS
    var transform = function transform(element, style) {
      element.style.webkitTransform = style;
      element.style.MozTransform = style;
      element.style.msTransform = style;
      element.style.OTransform = style;
      element.style.transform = style;
    };

    // Check if the container is in view
    var isInViewport = function isInViewport(offset, height) {
      return pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 && pv.windowProps.scrollTop < offset + height;
    };

    var nextContainerIsSmaller = function nextContainerIsSmaller(container, nextContainer) {
      return container.offset + container.height > nextContainer.offset + nextContainer.height;
    };
  }, {}] }, {}, [1, 2, 3, 4, 5, 7, 8, 9]);
//# sourceMappingURL=parallax-vanilla.js.map
