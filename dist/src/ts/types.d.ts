import { MEDIA_TYPES } from './constants';
export interface Settings {
    container: {
        class: string;
        height: string;
    };
    block: {
        class: string;
        speed: number;
        mediatype: keyof typeof MEDIA_TYPES;
        mediapath: null;
        mute: boolean;
    };
}
export interface Block {
    blockEl: HTMLElement;
    speed: number;
    mediatype: string;
    mediapath: string;
    mute: boolean;
}
export interface Container {
    containerEl: HTMLElement;
    offset: number;
    height: number;
    blocks: Block[];
    hasVideoBlock?: boolean;
}
