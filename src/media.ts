import { AUDIO_BUTTON_CLASS, MUTED_CLASS } from './constants'
import type { Block } from './types'

/** A CSS `url()` value that survives quotes and backslashes in the path. */
export const cssUrl = (path: string) => 'url("' + path.replace(/["\\\n]/g, '\\$&') + '")'

export const createVideo = (block: Block) => {
  const videoEl = document.createElement('video')
  videoEl.src = block.mediapath as string
  videoEl.autoplay = true
  videoEl.loop = true
  videoEl.defaultMuted = true
  videoEl.muted = true
  // Without playsInline iOS refuses to autoplay, or plays the video fullscreen
  videoEl.playsInline = true
  videoEl.setAttribute('playsinline', '')
  block.videoEl = videoEl
  block.blockEl.appendChild(videoEl)
}

export const createAudioButton = (block: Block, onToggle: () => void) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = AUDIO_BUTTON_CLASS
  button.setAttribute('aria-label', 'Video sound')
  button.appendChild(document.createElement('span'))
  button.addEventListener('click', onToggle)
  block.audioButton = button
  block.blockEl.insertAdjacentElement('afterend', button)
  syncAudioButton(block)
}

/** Reflects the video's current muted state on its audio toggle. */
export const syncAudioButton = (block: Block) => {
  const { audioButton, videoEl } = block
  if (!audioButton || !videoEl) return

  audioButton.classList.toggle(MUTED_CLASS, videoEl.muted)
  audioButton.setAttribute('aria-pressed', String(!videoEl.muted))
}

export const playVideo = (videoEl: HTMLVideoElement) => {
  if (!videoEl.paused) return
  const playing = videoEl.play()
  // Autoplay can be refused (power saving, browser policy); the video then just stays paused
  if (playing) playing.catch(() => undefined)
}

export const pauseVideo = (videoEl: HTMLVideoElement) => {
  if (!videoEl.paused) videoEl.pause()
}
