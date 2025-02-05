import { DEFAULT } from '@/consts';
import { numberParser } from '@/helpers/numberParser';
import { banner_bottoms } from '@/utils/dynamic-import/_homepageSections/BannerBottom/BannerBottom';

const PromoBottom = ({ design, banner }: any) => {
    const BannerBottomComponent =
        banner_bottoms[design?.banner] || banner_bottoms[DEFAULT];

    const bannerType = banner || [];
    banner?.filter((item: any) => numberParser(item?.type) === 1);

    return (
        <>
            {design?.banner !== 'null' && BannerBottomComponent && (
                <BannerBottomComponent design={design} banner={bannerType} />
            )}
        </>
    );
};

export default PromoBottom;
