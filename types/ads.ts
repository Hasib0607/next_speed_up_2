import { StaticImageData } from 'next/image';

export enum AdSizes {
    MEDIUM_RECTANGLE = '300x250',
    LARGE_RECTANGLE = '336x280',
    LEADERBOARD = '728x90',
    SKYSCRAPER = '300x600',
    WIDE_SKYSCRAPER = '160x600',
    HALF_PAGE_AD = '300x600',
    LARGE_LEADERBOARD = '970x90',
    BILLBOARD = '970x250',
    SMALL_SQUARE = '200x200',
    SQUARE = '250x250',
    SMALL_BANNER = '468x60',
    VERTICAL_RECTANGLE = '240x400',
    PANORAMA = '980x120',
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
    adInfo?: boolean;
};

export type BaseAdProps = {
    adContent?: AdContent;
    width: number;
    height: number;
    showInfo?: boolean;
};

export type AdSizeType = keyof typeof AdSizes; // "MEDIUM_RECTANGLE" | "LEADERBOARD" | "SKYSCRAPER"
