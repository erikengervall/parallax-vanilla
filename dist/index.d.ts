declare const MEDIA_TYPES: {
    readonly image: "image";
    readonly video: "video";
    readonly none: "none";
};
declare const defaultSettings: Settings;

type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES];
interface Settings {
    container: {
        /** Class name that marks a container element. */
        class: string;
        /** Container height: a number of pixels, or a string ending in `px` or `vh`. */
        height: string | number;
    };
    block: {
        /** Class name that marks a block element inside a container. */
        class: string;
        /** Parallax speed and direction. Negative values move the block up while scrolling down. */
        speed: number;
        /** Media type used when a block has no `pv-mediatype` attribute. */
        mediatype: MediaType;
        /** Media path used when a block has no `pv-mediapath` attribute. */
        mediapath: string | null;
        /** When true, videos stay muted and get no audio toggle. */
        mute: boolean;
    };
}
/** Settings accepted by `init`: every field is optional and falls back to the defaults. */
interface UserSettings {
    container?: Partial<Settings['container']>;
    block?: Partial<Settings['block']>;
}

/**
 * Finds every container and block on the page and starts the parallax effect.
 * Calling it again first tears down the previous setup, so it is safe after the DOM changes.
 */
declare const init: (userSettings?: UserSettings) => void;
/** Recomputes sizes and positions, for layout changes the library cannot observe itself. */
declare const refresh: () => void;
/** Stops the effect, removes the elements the library added and restores the inline styles. */
declare const destroy: () => void;

declare const pv: {
    init: (userSettings?: UserSettings) => void;
    refresh: () => void;
    destroy: () => void;
};

export { type MediaType, type Settings, type UserSettings, pv as default, defaultSettings, destroy, init, refresh };
