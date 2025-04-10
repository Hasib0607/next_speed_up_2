export const removeFbclid = (url: string, domain: string): string => {
    if (!url || typeof url !== 'string') {
        return '';
    }

    try {
        // Use dummy base if input is a relative URL
        const base = `https://${domain}`;
        const urlObj = new URL(url, base);

        urlObj.searchParams.delete('fbclid');

        // Return only pathname + search if original URL was relative
        const cleanUrl = url.startsWith('http')
            ? urlObj.toString()
            : urlObj.pathname + urlObj.search;
        return cleanUrl;
    } catch (error) {
        console.warn('Invalid URL:', error);
        return url;
    }
};