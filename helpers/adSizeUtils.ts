import { AdSizes } from '@/types/ads';

export const getSizeClasses = (size: AdSizes) => {
    const [width, height] = getAdDimensions(size);
    // console.log(size,":",width, height);

    switch (size) {
        case AdSizes.WIDE_SKYSCRAPER:
            return 'w-full h-[600px]'; // Added responsive height
        case AdSizes.LEADERBOARD:
            return 'w-full h-[180px]'; // Added responsive height
        case AdSizes.LARGE_RECTANGLE:
            return 'w-full h-[280px]'; // Added responsive height
        case AdSizes.MEDIUM_RECTANGLE:
            return 'w-[300px] h-[250px]';
        case AdSizes.SKYSCRAPER:
            return 'w-[300px] h-[600px]';
        default:
            return `w-[${width}px] h-[${height}px]`;
        // For leaderboard (728x90), we want full width on mobile
        // case AdSizes.LEADERBOARD:
        //     return `w-full max-w-[${width}px] h-[${height}px] md:h-[${height * 2}px]`;
        // default:
        //     // For other sizes, use fixed width
        //     return `w-[${width}px] h-[${height}px]`;
    }
};

export const getContainerMaxWidth = (size: AdSizes) => {
    switch (size) {
        case AdSizes.LARGE_RECTANGLE:
            return "hidden md:block";
        case AdSizes.MEDIUM_RECTANGLE:
            return "block";
        case AdSizes.WIDE_SKYSCRAPER:
            return "hidden md:block";
        case AdSizes.SKYSCRAPER:
            return "hidden md:block";
        case AdSizes.LEADERBOARD:
            return "hidden md:block";
        default:
            return "hidden";
    }
};

// If you need the raw dimensions elsewhere
export const getAdDimensions = (size: AdSizes) => {
    // Split the size string into width and height
    return size.split('x').map(Number);
};
