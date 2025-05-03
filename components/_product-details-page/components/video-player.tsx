import { extractYouTubeVideoId } from '@/helpers/extractYouTubeId';
import { YouTubeEmbedProps } from '@/types/youtube';
import { FC } from 'react';

const VideoPlayer: FC<YouTubeEmbedProps> = (props: YouTubeEmbedProps) => {
    // Extract video ID from the URL
    const videoId = extractYouTubeVideoId(props.videoUrl);

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    let content;

    if (videoId) {
        content = (
            <iframe
                width={props.width ?? '100%'}
                height={props.height ?? '600'}
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video"
            />
        );
    } else {
        content = <div>Invalid YouTube URL!</div>;
    }

    return <div className={props.className}>{content}</div>;
};

export default VideoPlayer;
