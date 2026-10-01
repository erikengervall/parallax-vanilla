import type { MEDIA_TYPES } from './constants'

export type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

export interface Settings {
  container: {
    /** Class name that marks a container element. */
    class: string
    /** Container height: a number of pixels, or a string ending in `px` or `vh`. */
    height: string | number
  }
  block: {
    /** Class name that marks a block element inside a container. */
    class: string
    /** Parallax speed and direction. Negative values move the block up while scrolling down. */
    speed: number
    /** Media type used when a block has no `pv-mediatype` attribute. */
    mediatype: MediaType
    /** Media path used when a block has no `pv-mediapath` attribute. */
    mediapath: string | null
    /** When true, videos stay muted and get no audio toggle. */
    mute: boolean
  }
}

/** Settings accepted by `init`: every field is optional and falls back to the defaults. */
export interface UserSettings {
  container?: Partial<Settings['container']>
  block?: Partial<Settings['block']>
}

export interface Block {
  blockEl: HTMLElement
  speed: number
  mediatype: MediaType
  mediapath: string | null
  mute: boolean
  videoEl?: HTMLVideoElement
  audioButton?: HTMLButtonElement
}

export interface Container {
  containerEl: HTMLElement
  blocks: Block[]
  /** Offset and height the block layout was last computed for. */
  layoutOffset: number
  layoutHeight: number
  layoutWindowHeight: number
}
