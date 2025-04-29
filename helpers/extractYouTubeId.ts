import { IFRAME_SRC_PATTERN } from '@/consts';

export const extractYouTubeVideoId = (videoUrl: string): string | null => {
    let url;

    if (videoUrl.includes('iframe')) {
        const srcMatch = videoUrl.match(IFRAME_SRC_PATTERN) || [];
        url = srcMatch?.length > 1 ? srcMatch[1] : '';
    } else {
        url = videoUrl;
    }

    try {
        const parsedUrl = new URL(url);

        const hostnameArr = parsedUrl.pathname.split('/');
        const videoUrlId = hostnameArr.pop() || '';

        if (parsedUrl.hostname.includes('youtu.be')) {
            return videoUrlId;
        }

        if (parsedUrl.hostname.includes('youtube.com')) {
            if (parsedUrl.searchParams.has('v')) {
                return parsedUrl.searchParams.get('v');
            }
            return videoUrlId;
        }
        return null;
    } catch {
        return null;
    }
};