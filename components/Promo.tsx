import { numberParser } from '@/helpers/numberParser';
import { banners } from '@/utils/dynamic-import/_homepageSections/banner/banner';

const Promo = ({ design, banner }: any) => {
    const BannerComponent = banners[design?.banner];

    const bannerType =
        banner?.filter((item: any) => numberParser(item?.type) === 0) || [];

    return (
        design?.banner !== 'null' &&
        BannerComponent &&
        bannerType?.length > 0 && (
            <BannerComponent banner={bannerType} design={design} />
        )
    );
};

export default Promo;
