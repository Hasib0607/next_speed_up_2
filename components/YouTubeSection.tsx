import { DEFAULT } from '@/consts';
import { you_tube } from '@/utils/dynamic-import/_homepageSections/youtube/youtube';

const YouTubeSection = ({ design, headersetting }: any) => {
    const YouTubeComponent = you_tube[design?.youtube] || you_tube[DEFAULT];

    return (
        design?.youtube !== 'null' &&
        YouTubeComponent && (
            <YouTubeComponent design={design} headersetting={headersetting} />
        )
    );
};

export default YouTubeSection;
