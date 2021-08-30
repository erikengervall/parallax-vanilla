import { Block, Container, Settings } from './types';
export declare const setBlockSpeed: (blockEl: HTMLElement, settings: Settings) => number;
export declare const setBlockMediaProps: (blockEl: HTMLElement, settings: Settings) => {
    mediatype: "image" | "video" | "none";
    mediapath: string | null;
};
export declare const setBlockMute: (blockEl: HTMLElement, settings: Settings) => boolean;
export declare const setBlockVisual: (block: Block) => void;
export declare const setBlockAttributes: (container: Container, block: Block) => void;
