export const removeFbclid = (url: string): string => {
    try {
        const urlObj = new URL(url);
        urlObj.searchParams.delete('fbclid'); // Remove fbclid from query params
        return urlObj.toString();
    } catch (error) {
        console.error('Invalid URL:', error);
        return url; // Return the original URL if an error occurs
    }
};

