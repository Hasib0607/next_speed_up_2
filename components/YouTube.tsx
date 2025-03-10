import { you_tube } from '@/utils/dynamic-import/_homepageSections/youtube/youtube';

const YouTube = ({ design, headersetting }: any) => {
    const store_id = design?.store_id || null;

    const YouTubeComponent = you_tube[design?.youtube];

    return (
        design?.youtube !== 'null' &&
        YouTubeComponent && (
            <YouTubeComponent design={design} headersetting={headersetting} />
        )
    );
};

export default YouTube;
