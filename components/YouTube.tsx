import { DEFAULT } from '@/consts';
import { you_tube } from '@/utils/dynamic-import/_homepageSections/youtube/youtube';

const YouTube = ({ design, headersetting }: any) => {
    const store_id = design?.store_id || null;

    const YouTubeComponent = you_tube[design?.youtube] || you_tube[DEFAULT] ;

    console.log("design?.youtube", design?.youtube);

    return (
        design?.youtube !== 'null' &&
        YouTubeComponent && (
            <YouTubeComponent design={design} headersetting={headersetting} />
        )
    );
};

export default YouTube;
