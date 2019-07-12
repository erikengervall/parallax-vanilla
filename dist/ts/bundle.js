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

/***/ "./src/ts/constants.ts":
/*!*****************************!*\
  !*** ./src/ts/constants.ts ***!
  \*****************************/
/*! exports provided: VIDEO_EXTENSIONS, MEDIA_TYPES, ELEMENT_DATA_KEYS, defaultSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VIDEO_EXTENSIONS\", function() { return VIDEO_EXTENSIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MEDIA_TYPES\", function() { return MEDIA_TYPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ELEMENT_DATA_KEYS\", function() { return ELEMENT_DATA_KEYS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultSettings\", function() { return defaultSettings; });\nconst VIDEO_EXTENSIONS = [\n    '3g2',\n    '3gp',\n    'asf',\n    'avi',\n    'flv',\n    'h264',\n    'm4v',\n    'mov',\n    'mp4',\n    'mpg',\n    'mpeg',\n    'rm',\n    'srt',\n    'swf',\n    'vow',\n    'vob',\n    'wmv',\n];\nconst MEDIA_TYPES = {\n    IMAGE: 'image',\n    VIDEO: 'video',\n    NONE: 'none',\n};\nconst ELEMENT_DATA_KEYS = {\n    MEDIAPATH: 'pv-mediapath',\n    MEDIATYPE: 'pv-mediatype',\n    MUTE: 'pv-mute',\n    HEIGHT: 'pv-height',\n    SPEED: 'pv-speed',\n};\nconst defaultSettings = {\n    container: {\n        class: 'pv-container',\n        height: '250px',\n    },\n    block: {\n        class: 'pv-block',\n        speed: -Math.PI,\n        mediatype: MEDIA_TYPES.IMAGE,\n        mediapath: null,\n        mute: false,\n    },\n};\n\n\n//# sourceURL=webpack:///./src/ts/constants.ts?");

/***/ }),

/***/ "./src/ts/init.ts":
/*!************************!*\
  !*** ./src/ts/init.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/ts/constants.ts\");\n/* harmony import */ var _initContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initContainer */ \"./src/ts/initContainer.ts\");\n/* harmony import */ var _initBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initBlock */ \"./src/ts/initBlock.ts\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((userSettings) => {\n    const pv = window.pv;\n    pv.containerArr = [];\n    pv.settings = mergeSettings(userSettings, _constants__WEBPACK_IMPORTED_MODULE_0__[\"defaultSettings\"]);\n    const containerElements = document.getElementsByClassName(pv.settings.container.class);\n    for (let i = 0; i < containerElements.length; i++) {\n        const container = {};\n        container.el = containerElements[i];\n        container.offset = calculateOffsetTop(container.el);\n        container.el.style.height = Object(_initContainer__WEBPACK_IMPORTED_MODULE_1__[\"setContainerHeight\"])(container, pv.settings);\n        container.height = container.el.clientHeight;\n        container.blocks = [];\n        const blockElements = containerElements[i].getElementsByClassName(pv.settings.block.class);\n        for (let j = 0; j < blockElements.length; j++) {\n            const block = {};\n            block.el = blockElements[j];\n            block.speed = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__[\"setBlockSpeed\"])(block, pv.settings);\n            const { mediatype, mediapath } = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__[\"setBlockMediaProps\"])(block, pv.settings);\n            block.mediatype = mediatype;\n            block.mediapath = mediapath;\n            block.mute = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__[\"setBlockMute\"])(block, pv.settings);\n            if (block.mediatype !== _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].NONE) {\n                if (block.mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].VIDEO)\n                    container.hasVideoBlock = true;\n                const successful = Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__[\"setBlockVisual\"])(block);\n                if (!successful) {\n                    console.error('Did not successfully set media for block:', block);\n                    throw new Error('Did not successfully set media');\n                }\n                Object(_initBlock__WEBPACK_IMPORTED_MODULE_2__[\"setBlockAttributes\"])(container, block);\n            }\n            container.blocks.push(block);\n        }\n        pv.containerArr.push(container);\n    }\n});\nconst mergeSettings = (userSettings = {}, defaultSettings) => {\n    Object.keys(userSettings).forEach(elementSettings => {\n        if (!(userSettings[elementSettings] instanceof Object)) {\n            throw new Error(`Expected ${elementSettings} to be of instance Object`);\n        }\n        Object.keys(userSettings[elementSettings]).forEach(setting => {\n            if (userSettings[elementSettings][setting] instanceof Object) {\n                throw new Error(`Expected ${elementSettings} to be primitive value`);\n            }\n            if (!defaultSettings[elementSettings].hasOwnProperty(setting)) {\n                throw new Error(`Expected ${setting} to match available settings`);\n            }\n            defaultSettings[elementSettings][setting] = userSettings[elementSettings][setting];\n        });\n    });\n    return defaultSettings;\n};\n// Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/\nconst calculateOffsetTop = (el) => {\n    const rectTop = el.getBoundingClientRect().top;\n    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    return rectTop + scrollTop;\n};\n\n\n//# sourceURL=webpack:///./src/ts/init.ts?");

/***/ }),

/***/ "./src/ts/initBlock.ts":
/*!*****************************!*\
  !*** ./src/ts/initBlock.ts ***!
  \*****************************/
/*! exports provided: setBlockSpeed, setBlockMediaProps, setBlockMute, setBlockVisual, setBlockAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBlockSpeed\", function() { return setBlockSpeed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBlockMediaProps\", function() { return setBlockMediaProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBlockMute\", function() { return setBlockMute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBlockVisual\", function() { return setBlockVisual; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBlockAttributes\", function() { return setBlockAttributes; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/ts/constants.ts\");\n\nconst setBlockSpeed = (block, settings) => {\n    let attrSpeed = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_DATA_KEYS\"].SPEED);\n    // No data attribute defined\n    if (!attrSpeed)\n        return settings.block.speed;\n    // Speed is a string\n    if (typeof attrSpeed === 'string') {\n        // Speed must consist solely of integers\n        const attrSpeedNumber = Number(attrSpeed);\n        if (isNaN(attrSpeedNumber)) {\n            console.error('Invalid type for attribute speed for block: ' + block.el);\n            throw new Error('Invalid type for attribute speed');\n        }\n        else {\n            attrSpeed = attrSpeedNumber;\n        }\n    }\n    // Speed is set to 0 (fall back on block speed)\n    if (attrSpeed == 0)\n        return settings.block.speed;\n    return attrSpeed;\n};\nconst setBlockMediaProps = (block, settings) => {\n    let mediatype = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_DATA_KEYS\"].MEDIATYPE);\n    const mediapath = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_DATA_KEYS\"].MEDIAPATH);\n    if (mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].NONE)\n        return { mediatype, mediapath };\n    // No data attribute defined\n    if (!mediatype)\n        mediatype = settings.block.mediatype;\n    // Media type set to video\n    if (mediapath && isVideo(mediatype, mediapath))\n        mediatype = _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].VIDEO;\n    // No data attribute defined\n    if (!mediapath && mediatype !== _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].NONE) {\n        console.error('Media path not defined for block: ' + block.el);\n        throw new Error('Media path not defined');\n    }\n    return { mediatype, mediapath };\n};\nconst setBlockMute = (block, settings) => {\n    const mute = block.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_DATA_KEYS\"].MUTE);\n    if (!mute)\n        return settings.block.mute;\n    return mute == 'true';\n};\nconst setBlockImage = (block) => {\n    const { mediapath } = block;\n    block.el.style.backgroundImage = \"url('\" + mediapath + \"')\";\n    // Check if the background image wasn't set\n    const backgroundImageFromDOM = window\n        .getComputedStyle(block.el)\n        .getPropertyValue('background-image');\n    if (backgroundImageFromDOM == 'none')\n        return false;\n    return true;\n};\nconst videoElClicked = (videoEl, block) => {\n    const pv = window.pv;\n    if (pv.unmutedBlock && pv.unmutedBlock.videoEl !== videoEl) {\n        pv.unmutedBlock.videoEl.muted = true;\n        pv.unmutedBlock.audioButton.classList.add('mute');\n    }\n    pv.unmutedBlock = block;\n    videoEl.muted = !videoEl.muted;\n    block.muted = videoEl.muted;\n    block.audioButton.classList.toggle('mute');\n};\nconst setBlockVideo = (block) => {\n    const { mediapath } = block;\n    const videoEl = document.createElement('video');\n    videoEl.src = mediapath;\n    videoEl.autoplay = true;\n    videoEl.loop = true;\n    videoEl.defaultMuted = true;\n    videoEl.muted = true;\n    block.muted = true;\n    block.videoEl = videoEl;\n    block.el.appendChild(videoEl);\n    if (typeof window.orientation === 'undefined') {\n        if (!block.mute) {\n            videoEl.addEventListener('click', function () {\n                videoElClicked(videoEl, block);\n            });\n            const audioButton = document.createElement('a');\n            audioButton.href = '#';\n            audioButton.className += 'audio-icon mute';\n            audioButton.appendChild(document.createElement('span'));\n            audioButton.addEventListener('click', function (e) {\n                e.preventDefault();\n                videoElClicked(videoEl, block);\n            });\n            block.audioButton = audioButton;\n            block.el.insertAdjacentElement('afterend', audioButton);\n        }\n    }\n    return true;\n};\nconst setBlockVisual = (block) => {\n    const { mediatype } = block;\n    if (mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].IMAGE)\n        return setBlockImage(block);\n    if (mediatype === _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].VIDEO)\n        return setBlockVideo(block);\n    return false;\n};\nconst setBlockAttributes = (container, block) => {\n    const pv = window.pv;\n    updateWindowProps();\n    // calculates the negative top property\n    // negative scroll distance\n    // plus container height / factor, because whenever we pass the element we'll always scroll the window faster then the animation (if factor < 1 it'll be increased to all is good)\n    let marginTop = 0;\n    let scrollDist = 0;\n    let paddingBottom = 0;\n    // if the pv-block offset is less than the windowheight, then the scrolldist will have to be recalculated\n    if (container.offset < pv.windowProps.windowHeight) {\n        scrollDist = (container.height + container.offset) / Math.abs(block.speed);\n        if (block.speed > 0) {\n            marginTop = -Math.abs(container.offset);\n            paddingBottom = container.height + container.offset;\n        }\n        else {\n            paddingBottom = scrollDist + container.height;\n        }\n    }\n    else {\n        // the pv-block is below the initial windowheight\n        scrollDist = (container.height + pv.windowProps.windowHeight) / Math.abs(block.speed);\n        paddingBottom = scrollDist + container.height;\n        if (block.speed > 0) {\n            marginTop = -scrollDist;\n            paddingBottom = container.height + pv.windowProps.windowHeight / Math.abs(block.speed);\n        }\n        else {\n            paddingBottom = scrollDist + container.height;\n        }\n    }\n    if (Math.abs(marginTop) >= Math.abs(paddingBottom))\n        paddingBottom = Math.abs(marginTop) + 1;\n    block.el.style.setProperty('padding-bottom', paddingBottom + 'px', null);\n    block.el.style.setProperty('margin-top', marginTop + 'px', null);\n};\n// Returns the extension of a media path\nconst getExtension = (attrMediapath) => {\n    const extension = attrMediapath\n        .substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length)\n        .toLowerCase();\n    if (extension === -1) {\n        console.error('Invalid extension for media with media path: ' + attrMediapath);\n        throw new Error('Invalid extension for media');\n    }\n    else {\n        return extension;\n    }\n};\n// returns {true} if media is a video\nconst isVideo = (attrMediatype, attrMediapath) => attrMediatype === _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].VIDEO ||\n    _constants__WEBPACK_IMPORTED_MODULE_0__[\"VIDEO_EXTENSIONS\"].indexOf(getExtension(attrMediapath)) !== -1;\nconst updateWindowProps = () => {\n    const pv = window.pv;\n    pv.windowProps = {\n        scrollTop: window.scrollY || document.documentElement.scrollTop,\n        windowHeight: window.innerHeight,\n        windowMidHeight: window.innerHeight / 2,\n    };\n};\n\n\n//# sourceURL=webpack:///./src/ts/initBlock.ts?");

/***/ }),

/***/ "./src/ts/initContainer.ts":
/*!*********************************!*\
  !*** ./src/ts/initContainer.ts ***!
  \*********************************/
/*! exports provided: setContainerHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setContainerHeight\", function() { return setContainerHeight; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/ts/constants.ts\");\n\nconst setContainerHeight = (container, settings) => {\n    const attrHeight = container.el.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_DATA_KEYS\"].HEIGHT);\n    // No data attribute\n    if (!attrHeight)\n        return settings.container.height;\n    // String only consists of integers, add px\n    if (!isNaN(Number(attrHeight)))\n        return attrHeight + 'px';\n    // String has more than integers, assume suffix is either px or vh\n    const suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length);\n    if (suffix === 'px' || suffix === 'vh')\n        return attrHeight;\n    throw new Error('Invalid height suffix, expected \"px\" or \"vh\" but got: ' + suffix);\n};\n\n\n\n//# sourceURL=webpack:///./src/ts/initContainer.ts?");

/***/ }),

/***/ "./src/ts/parallax-vanilla.ts":
/*!************************************!*\
  !*** ./src/ts/parallax-vanilla.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ \"./src/ts/init.ts\");\n/* harmony import */ var _translate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translate */ \"./src/ts/translate.ts\");\n/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resize */ \"./src/ts/resize.ts\");\n\n\n\n;\n((window) => {\n    const defineParallaxVanilla = () => {\n        const pv = { init: _init__WEBPACK_IMPORTED_MODULE_0__[\"default\"] };\n        window.pv = pv; // exposes init function to user\n        if (typeof window.orientation === 'undefined') {\n            window.onresize = () => Object(_resize__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        }\n        // Request animation frame, also binds function to window\n        window.raf = (() => {\n            return (window.requestAnimationFrame ||\n                window.webkitRequestAnimationFrame ||\n                window.mozRequestAnimationFrame ||\n                function (callback) {\n                    window.setTimeout(callback, 1000 / 60); // 60 FPS\n                });\n        })();\n        // Main loop for updating variables and performing translates\n        const mainLoop = () => {\n            Object(_translate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n            window.raf(mainLoop);\n        };\n        // Initialize main loop\n        window.raf(mainLoop);\n        return pv;\n    };\n    // Define pv\n    if (typeof window.pv === 'undefined') {\n        window.pv = defineParallaxVanilla();\n        console.log('%c parallax-vanilla defined.', 'color: green');\n    }\n    else {\n        console.log('%c parallax-vanilla already defined.', 'color: red');\n    }\n})(window);\n\n\n//# sourceURL=webpack:///./src/ts/parallax-vanilla.ts?");

/***/ }),

/***/ "./src/ts/resize.ts":
/*!**************************!*\
  !*** ./src/ts/resize.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/ts/constants.ts\");\n/* harmony import */ var _initBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initBlock */ \"./src/ts/initBlock.ts\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const pv = window.pv;\n    pv.containerArr.forEach((container) => {\n        container.height = container.el.clientHeight;\n        container.blocks.forEach((block) => {\n            if (block.mediatype !== _constants__WEBPACK_IMPORTED_MODULE_0__[\"MEDIA_TYPES\"].NONE) {\n                Object(_initBlock__WEBPACK_IMPORTED_MODULE_1__[\"setBlockAttributes\"])(container, block);\n            }\n        });\n    });\n});\n\n\n//# sourceURL=webpack:///./src/ts/resize.ts?");

/***/ }),

/***/ "./src/ts/translate.ts":
/*!*****************************!*\
  !*** ./src/ts/translate.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n    const pv = window.pv;\n    // Update selected attributes in windowProps on window raf event\n    pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop;\n    if (pv.windowProps.scrollTop === pv.prevScrollTop) {\n        // No scrolling has occured\n        return;\n    }\n    else {\n        pv.prevScrollTop = pv.windowProps.scrollTop;\n    }\n    // translate the parallax blocks, creating the parallax effect\n    pv.containerArr.forEach((container, index) => {\n        let calc = 0;\n        // check if parallax block is in viewport\n        if (isInViewport(container.offset, container.height)) {\n            if (index > pv.mostReContainerInViewport)\n                pv.mostReContainerInViewport = index;\n            // if any parallax is within the first windowheight, transform from 0 (pv.scrollTop)\n            if (container.offset < pv.windowProps.windowHeight) {\n                calc = pv.windowProps.scrollTop;\n                // if the parallax is further down on the page\n                // calculate windowheight - parallax offset + scrollTop to start from 0 whereever it appears\n            }\n            else {\n                calc = pv.windowProps.windowHeight - container.offset + pv.windowProps.scrollTop;\n            }\n            container.blocks.forEach((block) => {\n                if (block.videoEl) {\n                    block.videoEl.play();\n                    if (block === pv.unmutedBlock) {\n                        if (!block.muted) {\n                            block.videoEl.muted = block.muted;\n                            block.muted\n                                ? pv.unmutedBlock.audioButton.classList.add('mute')\n                                : pv.unmutedBlock.audioButton.classList.remove('mute');\n                        }\n                    }\n                }\n                transform(block.el, 'translate3d(0,' + Math.round(calc / block.speed) + 'px, 0)');\n            });\n        }\n        else {\n            // check if container has at least one video block\n            if (container.hasVideoBlock) {\n                // pause blocks with playing videos\n                container.blocks.forEach((block) => {\n                    if (block.videoEl) {\n                        block.videoEl.pause();\n                        if (pv.unmutedBlock === block) {\n                            block.videoEl.muted = true;\n                        }\n                    }\n                });\n            }\n            const nextContainer = pv.containerArr[index + 1];\n            // check if next container is in view - else break\n            if (nextContainer &&\n                !isInViewport(nextContainer.offset, nextContainer.height) &&\n                pv.mostReContainerInViewport < index &&\n                !nextContainerIsSmaller(container, nextContainer)) {\n                return;\n            }\n            else {\n                if (nextContainer && isInViewport(nextContainer.offset, nextContainer.height)) {\n                    pv.mostReContainerInViewport = index + 1;\n                }\n            }\n        }\n    });\n});\n//Transform prefixes for CSS\nconst transform = (element, style) => {\n    element.style.webkitTransform = style;\n    element.style.MozTransform = style;\n    element.style.msTransform = style;\n    element.style.OTransform = style;\n    element.style.transform = style;\n};\n// Check if the container is in view\nconst isInViewport = (offset, height) => {\n    const pv = window.pv;\n    return (pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 &&\n        pv.windowProps.scrollTop < offset + height);\n};\nconst nextContainerIsSmaller = (container, nextContainer) => container.offset + container.height > nextContainer.offset + nextContainer.height;\n\n\n//# sourceURL=webpack:///./src/ts/translate.ts?");

/***/ })

/******/ });