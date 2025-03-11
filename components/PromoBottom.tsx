import { numberParser } from '@/helpers/numberParser';
import { banner_bottoms } from '@/utils/dynamic-import/_homepageSections/BannerBottom/BannerBottom';

const PromoBottom = ({ design, banner }: any) => {
    const BannerBottomComponent =
        banner_bottoms[design?.banner_bottom];

    const bannerType =
        banner?.filter((item: any) => numberParser(item?.type) === 1) || [];

    return (
        design?.banner_bottom !== 'null' &&
        BannerBottomComponent &&
        bannerType?.length > 0 && (
            <BannerBottomComponent design={design} banner={bannerType} />
        )
    );
};

export default PromoBottom;
