export const getEmbedYoutubeUrl = (url: string) => {
    // If it's already an embed URL, return directly
    if (url.includes('embed')) return url;
    
    // Extract video ID from various YouTube URL formats
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };