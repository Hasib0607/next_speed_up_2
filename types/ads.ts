
import { StaticImageData } from 'next/image';

export enum AdSizes {
    MEDIUM_RECTANGLE = '300x250',
    LARGE_RECTANGLE = '336x280',
    LEADERBOARD = '728x90',
    SKYSCRAPER = '300x600',
    WIDE_SKYSCRAPER = '160x600',
}

// ads
export type AdContent = {
    title?: string;
    description?: string;
    imageUrl: string | StaticImageData;
    cta?: string;
};

export type AdSectionProps = {
    size: AdSizes;
    className?: string;
    adContent?: AdContent;
    adInfo?:boolean;
};

export type BaseAdProps = {
    adContent?: AdContent;
    width:number;
    height:number;
    showInfo?:boolean;
};



export type AdSizeType = keyof typeof AdSizes; // "MEDIUM_RECTANGLE" | "LEADERBOARD" | "SKYSCRAPER"