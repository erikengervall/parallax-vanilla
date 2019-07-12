/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/parallax-vanilla.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/less/parallax-vanilla.less":
/*!****************************************!*\
  !*** ./src/less/parallax-vanilla.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/ts/constants.ts":
/*!*****************************!*\
  !*** ./src/ts/constants.ts ***!
  \*****************************/
/*! exports provided: VIDEO_EXTENSIONS, MEDIA_TYPES, ELEMENT_DATA_KEYS, defaultSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_EXTENSIONS", function() { return VIDEO_EXTENSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_TYPES", function() { return MEDIA_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_DATA_KEYS", function() { return ELEMENT_DATA_KEYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSettings", function() { return defaultSettings; });
const VIDEO_EXTENSIONS = [
    '3g2',
    '3gp',
    'asf',
    'avi',
    'flv',
    'h264',
    'm4v',
    'mov',
    'mp4',
    'mpg',
    'mpeg',
    'rm',
    'srt',
    'swf',
    'vow',
    'vob',
    'wmv',
];
const MEDIA_TYPES = {
    IMAGE: 'image',
    VIDEO: 'video',
    NONE: 'none',
};
const ELEMENT_DATA_KEYS = {
    MEDIAPATH: 'pv-mediapath',
    MEDIATYPE: 'pv-mediatype',
    MUTE: 'pv-mute',
    HEIGHT: 'pv-height',
    SPEED: 'pv-speed',
};
const defaultSettings = {
    container: {
        class: 'pv-container',
        height: '250px',
    },
    block: {
        class: 'pv-block',
        speed: -Math.PI,
        mediatype: MEDIA_TYPES.IMAGE,
        mediapath: null,
        mute: false,
    },
};


/***/ }),

/***/ "./src/ts/init.ts":
/*!************************!*\
  !*** ./src/ts/init.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/ts/constants.ts");
/* harmony import */ var _initContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initContainer */ "./src/ts/initContainer.ts");
/* harmony import */ var _initBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initBlock */ "./src/ts/initBlock.ts");



/* harmony default export */ __webpack_exports__["default"] = ((userSettings) => {
    const pv = window.pv;
    pv.containerArr = [];
    pv.settings = mergeSettings(userSettings, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultSettings"]);
    const containerElements = document.getElementsByClassName(pv.settings.container.class);
    for (let i = 0; i < containerElements.length; i++) {
        const container = {};
        container.el = containerElements[i];
        container.offset = calculateOffsetTop(container.el);
        container.el.style.height = Object(_initContainer__WEBPACK_IMPORTED_MODULE_1__["setContainerHeight"])(container, pv.settings);
        container.height = container.el.clientHeight;
        container.blocks = [];
        const blockElements = containerElements[i].getElementsByClassName(pv.settings.block.class);
        for (let j = 0; j < blockElements.length; j++) {
            const block = {};
            block.el = blockElements[j];
            block.speed = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__["setBlockSpeed"])(block, pv.settings);
            const { mediatype, mediapath } = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__["setBlockMediaProps"])(block, pv.settings);
            block.mediatype = mediatype;
            block.mediapath = mediapath;
            block.mute = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__["setBlockMute"])(block, pv.settings);
            if (block.mediatype !== _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].NONE) {
                if (block.mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].VIDEO)
                    container.hasVideoBlock = true;
                const successful = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__["setBlockVisual"])(block);
                if (!successful) {
                    console.error('Did not successfully set media for block:', block);
                    throw new Error('Did not successfully set media');
                }
                Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__["setBlockAttributes"])(container, block);
            }
            container.blocks.push(block);
        }
        pv.containerArr.push(container);
    }
});
const mergeSettings = (userSettings = {}, defaultSettings) => {
    Object.keys(userSettings).forEach(elementSettings => {
        if (!(userSettings[elementSettings] instanceof Object)) {
            throw new Error(`Expected ${elementSettings} to be of instance Object`);
        }
        Object.keys(userSettings[elementSettings]).forEach(setting => {
            if (userSettings[elementSettings][setting] instanceof Object) {
                throw new Error(`Expected ${elementSettings} to be primitive value`);
            }
            if (!defaultSettings[elementSettings].hasOwnProperty(setting)) {
                throw new Error(`Expected ${setting} to match available settings`);
            }
            defaultSettings[elementSettings][setting] = userSettings[elementSettings][setting];
        });
    });
    return defaultSettings;
};
// Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
const calculateOffsetTop = (el) => {
    const rectTop = el.getBoundingClientRect().top;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rectTop + scrollTop;
};


/***/ }),

/***/ "./src/ts/initBlock.ts":
/*!*****************************!*\
  !*** ./src/ts/initBlock.ts ***!
  \*****************************/
/*! exports provided: setBlockSpeed, setBlockMediaProps, setBlockMute, setBlockVisual, setBlockAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBlockSpeed", function() { return setBlockSpeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBlockMediaProps", function() { return setBlockMediaProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBlockMute", function() { return setBlockMute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBlockVisual", function() { return setBlockVisual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBlockAttributes", function() { return setBlockAttributes; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/ts/constants.ts");

const setBlockSpeed = (block, settings) => {
    let attrSpeed = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__["ELEMENT_DATA_KEYS"].SPEED);
    // No data attribute defined
    if (!attrSpeed)
        return settings.block.speed;
    // Speed is a string
    if (typeof attrSpeed === 'string') {
        // Speed must consist solely of integers
        const attrSpeedNumber = Number(attrSpeed);
        if (isNaN(attrSpeedNumber)) {
            console.error('Invalid type for attribute speed for block: ' + block.el);
            throw new Error('Invalid type for attribute speed');
        }
        else {
            attrSpeed = attrSpeedNumber;
        }
    }
    // Speed is set to 0 (fall back on block speed)
    if (attrSpeed == 0)
        return settings.block.speed;
    return attrSpeed;
};
const setBlockMediaProps = (block, settings) => {
    let mediatype = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__["ELEMENT_DATA_KEYS"].MEDIATYPE);
    const mediapath = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__["ELEMENT_DATA_KEYS"].MEDIAPATH);
    if (mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].NONE)
        return { mediatype, mediapath };
    // No data attribute defined
    if (!mediatype)
        mediatype = settings.block.mediatype;
    // Media type set to video
    if (mediapath && isVideo(mediatype, mediapath))
        mediatype = _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].VIDEO;
    // No data attribute defined
    if (!mediapath && mediatype !== _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].NONE) {
        console.error('Media path not defined for block: ' + block.el);
        throw new Error('Media path not defined');
    }
    return { mediatype, mediapath };
};
const setBlockMute = (block, settings) => {
    const mute = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__["ELEMENT_DATA_KEYS"].MUTE);
    if (!mute)
        return settings.block.mute;
    return mute == 'true';
};
const setBlockImage = (block) => {
    const { mediapath } = block;
    block.el.style.backgroundImage = "url('" + mediapath + "')";
    // Check if the background image wasn't set
    const backgroundImageFromDOM = window
        .getComputedStyle(block.el)
        .getPropertyValue('background-image');
    if (backgroundImageFromDOM == 'none')
        return false;
    return true;
};
const videoElClicked = (videoEl, block) => {
    const pv = window.pv;
    if (pv.unmutedBlock && pv.unmutedBlock.videoEl !== videoEl) {
        pv.unmutedBlock.videoEl.muted = true;
        pv.unmutedBlock.audioButton.classList.add('mute');
    }
    pv.unmutedBlock = block;
    videoEl.muted = !videoEl.muted;
    block.muted = videoEl.muted;
    block.audioButton.classList.toggle('mute');
};
const setBlockVideo = (block) => {
    const { mediapath } = block;
    const videoEl = document.createElement('video');
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
            const audioButton = document.createElement('a');
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
const setBlockVisual = (block) => {
    const { mediatype } = block;
    if (mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].IMAGE)
        return setBlockImage(block);
    if (mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].VIDEO)
        return setBlockVideo(block);
    return false;
};
const setBlockAttributes = (container, block) => {
    const pv = window.pv;
    updateWindowProps();
    // calculates the negative top property
    // negative scroll distance
    // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)
    let marginTop = 0;
    let scrollDist = 0;
    let paddingBottom = 0;
    // if the pv-block offset is less than the windowheight, then the scrolldist will have to be recalculated
    if (container.offset < pv.windowProps.windowHeight) {
        scrollDist = (container.height + container.offset) / Math.abs(block.speed);
        if (block.speed > 0) {
            marginTop = -Math.abs(container.offset);
            paddingBottom = container.height + container.offset;
        }
        else {
            paddingBottom = scrollDist + container.height;
        }
    }
    else {
        // the pv-block is below the initial windowheight
        scrollDist = (container.height + pv.windowProps.windowHeight) / Math.abs(block.speed);
        paddingBottom = scrollDist + container.height;
        if (block.speed > 0) {
            marginTop = -scrollDist;
            paddingBottom = container.height + pv.windowProps.windowHeight / Math.abs(block.speed);
        }
        else {
            paddingBottom = scrollDist + container.height;
        }
    }
    if (Math.abs(marginTop) >= Math.abs(paddingBottom))
        paddingBottom = Math.abs(marginTop) + 1;
    block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null);
    block.el.style.setProperty('margin-top', marginTop + 'px', null);
};
// Returns the extension of a media path
const getExtension = (attrMediapath) => {
    const extension = attrMediapath
        .substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length)
        .toLowerCase();
    if (extension === -1) {
        console.error('Invalid extension for media with media path: ' + attrMediapath);
        throw new Error('Invalid extension for media');
    }
    else {
        return extension;
    }
};
// returns {true} if media is a video
const isVideo = (attrMediatype, attrMediapath) => attrMediatype === _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].VIDEO ||
    _constants__WEBPACK_IMPORTED_MODULE_0__["VIDEO_EXTENSIONS"].indexOf(getExtension(attrMediapath)) !== -1;
const updateWindowProps = () => {
    const pv = window.pv;
    pv.windowProps = {
        scrollTop: window.scrollY || document.documentElement.scrollTop,
        windowHeight: window.innerHeight,
        windowMidHeight: window.innerHeight / 2,
    };
};


/***/ }),

/***/ "./src/ts/initContainer.ts":
/*!*********************************!*\
  !*** ./src/ts/initContainer.ts ***!
  \*********************************/
/*! exports provided: setContainerHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContainerHeight", function() { return setContainerHeight; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/ts/constants.ts");

const setContainerHeight = (container, settings) => {
    const attrHeight = container.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__["ELEMENT_DATA_KEYS"].HEIGHT);
    // No data attribute
    if (!attrHeight)
        return settings.container.height;
    // String only consists of integers, add px
    if (!isNaN(Number(attrHeight)))
        return attrHeight + 'px';
    // String has more than integers, assume suffix is either px or vh
    const suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length);
    if (suffix === 'px' || suffix === 'vh')
        return attrHeight;
    throw new Error('Invalid height suffix, expected "px" or "vh" but got: ' + suffix);
};



/***/ }),

/***/ "./src/ts/parallax-vanilla.ts":
/*!************************************!*\
  !*** ./src/ts/parallax-vanilla.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _less_parallax_vanilla_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../less/parallax-vanilla.less */ "./src/less/parallax-vanilla.less");
/* harmony import */ var _less_parallax_vanilla_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_less_parallax_vanilla_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init */ "./src/ts/init.ts");
/* harmony import */ var _translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translate */ "./src/ts/translate.ts");
/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resize */ "./src/ts/resize.ts");




;
((window) => {
    const defineParallaxVanilla = () => {
        const pv = { init: _init__WEBPACK_IMPORTED_MODULE_1__["default"] };
        window.pv = pv; // exposes init function to user
        if (typeof window.orientation === 'undefined') {
            window.onresize = () => Object(_resize__WEBPACK_IMPORTED_MODULE_3__["default"])();
        }
        // Request animation frame, also binds function to window
        window.raf = (() => {
            return (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60); // 60 FPS
                });
        })();
        // Main loop for updating variables and performing translates
        const mainLoop = () => {
            Object(_translate__WEBPACK_IMPORTED_MODULE_2__["default"])();
            window.raf(mainLoop);
        };
        // Initialize main loop
        window.raf(mainLoop);
        return pv;
    };
    // Define pv
    if (typeof window.pv === 'undefined') {
        window.pv = defineParallaxVanilla();
        console.log('%c parallax-vanilla defined.', 'color: green');
    }
    else {
        console.log('%c parallax-vanilla already defined.', 'color: red');
    }
})(window);


/***/ }),

/***/ "./src/ts/resize.ts":
/*!**************************!*\
  !*** ./src/ts/resize.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/ts/constants.ts");
/* harmony import */ var _initBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initBlock */ "./src/ts/initBlock.ts");


/* harmony default export */ __webpack_exports__["default"] = (() => {
    const pv = window.pv;
    pv.containerArr.forEach((container) => {
        container.height = container.el.clientHeight;
        container.blocks.forEach((block) => {
            if (block.mediatype !== _constants__WEBPACK_IMPORTED_MODULE_0__["MEDIA_TYPES"].NONE) {
                Object(_initBlock__WEBPACK_IMPORTED_MODULE_1__["setBlockAttributes"])(container, block);
            }
        });
    });
});


/***/ }),

/***/ "./src/ts/translate.ts":
/*!*****************************!*\
  !*** ./src/ts/translate.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => {
    const pv = window.pv;
    // Update selected attributes in windowProps on window raf event
    pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (pv.windowProps.scrollTop === pv.prevScrollTop) {
        // No scrolling has occured
        return;
    }
    else {
        pv.prevScrollTop = pv.windowProps.scrollTop;
    }
    // translate the parallax blocks, creating the parallax effect
    pv.containerArr.forEach((container, index) => {
        let calc = 0;
        // check if parallax block is in viewport
        if (isInViewport(container.offset, container.height)) {
            if (index > pv.mostReContainerInViewport)
                pv.mostReContainerInViewport = index;
            // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)
            if (container.offset < pv.windowProps.windowHeight) {
                calc = pv.windowProps.scrollTop;
                // if the parallax is further down on the page
                // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears
            }
            else {
                calc = pv.windowProps.windowHeight - container.offset + pv.windowProps.scrollTop;
            }
            container.blocks.forEach((block) => {
                if (block.videoEl) {
                    block.videoEl.play();
                    if (block === pv.unmutedBlock) {
                        if (!block.muted) {
                            block.videoEl.muted = block.muted;
                            block.muted
                                ? pv.unmutedBlock.audioButton.classList.add('mute')
                                : pv.unmutedBlock.audioButton.classList.remove('mute');
                        }
                    }
                }
                transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)');
            });
        }
        else {
            // check if container has at least one video block
            if (container.hasVideoBlock) {
                // pause blocks with playing videos
                container.blocks.forEach((block) => {
                    if (block.videoEl) {
                        block.videoEl.pause();
                        if (pv.unmutedBlock === block) {
                            block.videoEl.muted = true;
                        }
                    }
                });
            }
            const nextContainer = pv.containerArr[index + 1];
            // check if next container is in view - else break
            if (nextContainer &&
                !isInViewport(nextContainer.offset, nextContainer.height) &&
                pv.mostReContainerInViewport < index &&
                !nextContainerIsSmaller(container, nextContainer)) {
                return;
            }
            else {
                if (nextContainer && isInViewport(nextContainer.offset, nextContainer.height)) {
                    pv.mostReContainerInViewport = index + 1;
                }
            }
        }
    });
});
//Transform prefixes for CSS
const transform = (element, style) => {
    element.style.webkitTransform = style;
    element.style.MozTransform = style;
    element.style.msTransform = style;
    element.style.OTransform = style;
    element.style.transform = style;
};
// Check if the container is in view
const isInViewport = (offset, height) => {
    const pv = window.pv;
    return (pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 &&
        pv.windowProps.scrollTop < offset + height);
};
const nextContainerIsSmaller = (container, nextContainer) => container.offset + container.height > nextContainer.offset + nextContainer.height;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map