var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/constants.ts
var VIDEO_EXTENSIONS = [
  "3g2",
  "3gp",
  "asf",
  "avi",
  "flv",
  "h264",
  "m4v",
  "mkv",
  "mov",
  "mp4",
  "mpeg",
  "mpg",
  "ogv",
  "rm",
  "vob",
  "webm",
  "wmv"
];
var MEDIA_TYPES = {
  image: "image",
  video: "video",
  none: "none"
};
var ATTRIBUTES = {
  MEDIAPATH: "pv-mediapath",
  MEDIATYPE: "pv-mediatype",
  MUTE: "pv-mute",
  HEIGHT: "pv-height",
  SPEED: "pv-speed"
};
var AUDIO_BUTTON_CLASS = "audio-icon";
var MUTED_CLASS = "mute";
var defaultSettings = {
  container: {
    class: "pv-container",
    height: "250px"
  },
  block: {
    class: "pv-block",
    speed: -Math.PI,
    mediatype: MEDIA_TYPES.image,
    mediapath: null,
    mute: false
  }
};

// src/layout.ts
var computeBlockLayout = ({ offset, height }, windowHeight, speed) => {
  const factor = Math.abs(speed);
  let marginTop = 0;
  let paddingBottom;
  if (offset < windowHeight) {
    if (speed > 0) {
      marginTop = -Math.abs(offset);
      paddingBottom = height + offset;
    } else {
      paddingBottom = (height + offset) / factor + height;
    }
  } else if (speed > 0) {
    marginTop = -(height + windowHeight) / factor;
    paddingBottom = height + windowHeight / factor;
  } else {
    paddingBottom = (height + windowHeight) / factor + height;
  }
  if (Math.abs(marginTop) >= Math.abs(paddingBottom)) paddingBottom = Math.abs(marginTop) + 1;
  return { marginTop, paddingBottom };
};
var computeTranslateY = ({ offset }, scrollTop, windowHeight, speed) => {
  const travelled = offset < windowHeight ? scrollTop : windowHeight - offset + scrollTop;
  return Math.round(travelled / speed);
};
var isInViewport = ({ offset, height }, scrollTop, windowHeight) => scrollTop + windowHeight - offset > 0 && scrollTop < offset + height;

// src/media.ts
var cssUrl = (path) => 'url("' + path.replace(/["\\\n]/g, "\\$&") + '")';
var createVideo = (block) => {
  const videoEl = document.createElement("video");
  videoEl.src = block.mediapath;
  videoEl.autoplay = true;
  videoEl.loop = true;
  videoEl.defaultMuted = true;
  videoEl.muted = true;
  videoEl.playsInline = true;
  videoEl.setAttribute("playsinline", "");
  block.videoEl = videoEl;
  block.blockEl.appendChild(videoEl);
};
var createAudioButton = (block, onToggle) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = AUDIO_BUTTON_CLASS;
  button.setAttribute("aria-label", "Video sound");
  button.appendChild(document.createElement("span"));
  button.addEventListener("click", onToggle);
  block.audioButton = button;
  block.blockEl.insertAdjacentElement("afterend", button);
  syncAudioButton(block);
};
var syncAudioButton = (block) => {
  const { audioButton, videoEl } = block;
  if (!audioButton || !videoEl) return;
  audioButton.classList.toggle(MUTED_CLASS, videoEl.muted);
  audioButton.setAttribute("aria-pressed", String(!videoEl.muted));
};
var playVideo = (videoEl) => {
  if (!videoEl.paused) return;
  const playing = videoEl.play();
  if (playing) playing.catch(() => void 0);
};
var pauseVideo = (videoEl) => {
  if (!videoEl.paused) videoEl.pause();
};

// src/parse.ts
var describe = (el) => el.outerHTML.length > 120 ? el.outerHTML.slice(0, 120) + "\u2026" : el.outerHTML;
var normalizeHeight = (height) => {
  if (typeof height === "number") {
    if (!Number.isFinite(height)) throw new Error(`parallax-vanilla: invalid height ${height}`);
    return height + "px";
  }
  const value = height.trim();
  if (value !== "" && !isNaN(Number(value))) return value + "px";
  if (/^\d*\.?\d+(px|vh)$/.test(value)) return value;
  throw new Error(`parallax-vanilla: invalid height "${height}", expected a number, px or vh`);
};
var parseHeight = (containerEl, settings) => normalizeHeight(containerEl.getAttribute(ATTRIBUTES.HEIGHT) || settings.container.height);
var validateSpeed = (speed) => {
  if (!Number.isFinite(speed) || speed === 0) {
    throw new Error(`parallax-vanilla: invalid speed ${speed}, expected a non-zero number`);
  }
  return speed;
};
var parseSpeed = (blockEl, settings) => {
  const attr = blockEl.getAttribute(ATTRIBUTES.SPEED);
  if (attr === null || attr.trim() === "") return settings.block.speed;
  const speed = Number(attr);
  if (!Number.isFinite(speed)) {
    throw new Error(`parallax-vanilla: invalid pv-speed "${attr}" on ${describe(blockEl)}`);
  }
  return speed === 0 ? settings.block.speed : speed;
};
var parseMute = (blockEl, settings) => {
  const attr = blockEl.getAttribute(ATTRIBUTES.MUTE);
  if (attr === null) return settings.block.mute;
  return attr === "" || attr === "true";
};
var getExtension = (mediapath) => {
  const path = mediapath.split(/[?#]/)[0];
  const segment = path.slice(path.lastIndexOf("/") + 1);
  const dot = segment.lastIndexOf(".");
  return dot === -1 ? "" : segment.slice(dot + 1).toLowerCase();
};
var isVideoPath = (mediapath) => VIDEO_EXTENSIONS.indexOf(getExtension(mediapath)) !== -1;
var isMediaType = (value) => value === MEDIA_TYPES.image || value === MEDIA_TYPES.video || value === MEDIA_TYPES.none;
var parseMedia = (blockEl, settings) => {
  const typeAttr = blockEl.getAttribute(ATTRIBUTES.MEDIATYPE);
  const mediapath = blockEl.getAttribute(ATTRIBUTES.MEDIAPATH) || settings.block.mediapath;
  const type = typeAttr || settings.block.mediatype;
  if (!isMediaType(type)) {
    throw new Error(
      `parallax-vanilla: invalid media type "${type}" on ${describe(blockEl)}, expected image, video or none`
    );
  }
  if (type === MEDIA_TYPES.none) return { mediatype: type, mediapath };
  if (!mediapath) {
    throw new Error(
      `parallax-vanilla: no media path for ${describe(blockEl)}; set pv-mediapath, or pv-mediatype="none" to move the block without media`
    );
  }
  return { mediatype: isVideoPath(mediapath) ? MEDIA_TYPES.video : type, mediapath };
};

// src/parallax.ts
var state = null;
var mergeSettings = (user = {}) => ({
  container: __spreadValues(__spreadValues({}, defaultSettings.container), user.container),
  block: __spreadValues(__spreadValues({}, defaultSettings.block), user.block)
});
var setStyle = (s, el, prop, value) => {
  let saved = s.originalStyles.get(el);
  if (!saved) {
    saved = /* @__PURE__ */ new Map();
    s.originalStyles.set(el, saved);
  }
  if (!saved.has(prop)) saved.set(prop, el.style.getPropertyValue(prop));
  el.style.setProperty(prop, value);
};
var matches = (query) => query ? query.matches : false;
var isCoarsePointer = () => typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
var toggleSound = (block) => {
  const { videoEl } = block;
  if (!state || !videoEl) return;
  const previous = state.soundBlock;
  if (previous && previous !== block && previous.videoEl) {
    previous.videoEl.muted = true;
    syncAudioButton(previous);
  }
  videoEl.muted = !videoEl.muted;
  state.soundBlock = videoEl.muted ? null : block;
  syncAudioButton(block);
};
var buildBlock = (s, blockEl) => {
  var _a;
  const { mediatype, mediapath } = parseMedia(blockEl, s.settings);
  const block = {
    blockEl,
    speed: parseSpeed(blockEl, s.settings),
    mediatype,
    mediapath,
    mute: parseMute(blockEl, s.settings)
  };
  if (mediatype === MEDIA_TYPES.image) {
    setStyle(s, blockEl, "background-image", cssUrl(mediapath));
  } else if (mediatype === MEDIA_TYPES.video) {
    createVideo(block);
    if (!block.mute) {
      const toggle = () => toggleSound(block);
      (_a = block.videoEl) == null ? void 0 : _a.addEventListener("click", toggle);
      createAudioButton(block, toggle);
    }
  }
  return block;
};
var layoutBlocks = (s, container, metrics, windowHeight, still) => {
  container.blocks.forEach((block) => {
    if (block.mediatype === MEDIA_TYPES.none) return;
    const { marginTop, paddingBottom } = still ? { marginTop: 0, paddingBottom: metrics.height } : computeBlockLayout(metrics, windowHeight, block.speed);
    setStyle(s, block.blockEl, "padding-bottom", paddingBottom + "px");
    setStyle(s, block.blockEl, "margin-top", marginTop + "px");
  });
  container.layoutOffset = metrics.offset;
  container.layoutHeight = metrics.height;
  container.layoutWindowHeight = windowHeight;
};
var update = () => {
  const s = state;
  if (!s) return;
  s.frame = null;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = s.viewportHeight;
  const still = matches(s.motionQuery);
  const force = s.forceLayout;
  s.forceLayout = false;
  const allMetrics = s.containers.map((container) => {
    const rect = container.containerEl.getBoundingClientRect();
    return { offset: rect.top + scrollTop, height: rect.height };
  });
  s.containers.forEach((container, i) => {
    const metrics = allMetrics[i];
    if (force || Math.abs(metrics.offset - container.layoutOffset) > 0.5 || Math.abs(metrics.height - container.layoutHeight) > 0.5 || windowHeight !== container.layoutWindowHeight) {
      layoutBlocks(s, container, metrics, windowHeight, still);
    }
    const visible = isInViewport(metrics, scrollTop, windowHeight);
    container.blocks.forEach((block) => {
      if (block.videoEl) {
        if (visible) playVideo(block.videoEl);
        else pauseVideo(block.videoEl);
      }
      if (!visible) return;
      const y = still ? 0 : computeTranslateY(metrics, scrollTop, windowHeight, block.speed);
      setStyle(s, block.blockEl, "transform", "translate3d(0, " + y + "px, 0)");
    });
  });
};
var scheduleUpdate = (forceLayout = false) => {
  if (!state) return;
  if (forceLayout) state.forceLayout = true;
  if (state.frame === null) state.frame = window.requestAnimationFrame(update);
};
var onScroll = () => scheduleUpdate();
var onLayoutChange = () => scheduleUpdate(true);
var onResize = () => {
  if (!state) return;
  const widthChanged = window.innerWidth !== state.viewportWidth;
  if (widthChanged || !isCoarsePointer()) {
    state.viewportWidth = window.innerWidth;
    state.viewportHeight = window.innerHeight;
    scheduleUpdate(true);
  }
};
var init = (userSettings) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("parallax-vanilla: init() needs a browser window");
  }
  destroy();
  const settings = mergeSettings(userSettings);
  validateSpeed(settings.block.speed);
  normalizeHeight(settings.container.height);
  const s = {
    settings,
    containers: [],
    soundBlock: null,
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    frame: null,
    forceLayout: true,
    resizeObserver: null,
    motionQuery: typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null,
    originalStyles: /* @__PURE__ */ new Map()
  };
  state = s;
  try {
    const containerEls = Array.from(document.getElementsByClassName(settings.container.class));
    containerEls.forEach((el) => {
      const containerEl = el;
      setStyle(s, containerEl, "height", parseHeight(containerEl, settings));
      const blockEls = Array.from(containerEl.getElementsByClassName(settings.block.class));
      s.containers.push({
        containerEl,
        blocks: blockEls.map((blockEl) => buildBlock(s, blockEl)),
        layoutOffset: NaN,
        layoutHeight: NaN,
        layoutWindowHeight: NaN
      });
    });
  } catch (error) {
    destroy();
    throw error;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  if (s.motionQuery) s.motionQuery.addEventListener("change", onLayoutChange);
  if (typeof ResizeObserver !== "undefined") {
    s.resizeObserver = new ResizeObserver(onLayoutChange);
    s.resizeObserver.observe(document.documentElement);
    s.containers.forEach((container) => {
      var _a;
      return (_a = s.resizeObserver) == null ? void 0 : _a.observe(container.containerEl);
    });
  }
  update();
};
var refresh = () => {
  if (!state) return;
  state.viewportWidth = window.innerWidth;
  state.viewportHeight = window.innerHeight;
  state.forceLayout = true;
  update();
};
var destroy = () => {
  const s = state;
  if (!s) return;
  state = null;
  if (s.frame !== null) window.cancelAnimationFrame(s.frame);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  if (s.motionQuery) s.motionQuery.removeEventListener("change", onLayoutChange);
  if (s.resizeObserver) s.resizeObserver.disconnect();
  s.containers.forEach(
    (container) => container.blocks.forEach((block) => {
      if (block.videoEl) {
        block.videoEl.pause();
        block.videoEl.remove();
      }
      if (block.audioButton) block.audioButton.remove();
    })
  );
  s.originalStyles.forEach(
    (props, el) => props.forEach((value, prop) => {
      if (value) el.style.setProperty(prop, value);
      else el.style.removeProperty(prop);
    })
  );
};

// src/index.ts
var pv = { init, refresh, destroy };
var src_default = pv;
export {
  src_default as default,
  defaultSettings,
  destroy,
  init,
  refresh
};
//# sourceMappingURL=index.js.map