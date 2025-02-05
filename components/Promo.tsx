import { DEFAULT } from '../consts';
import { numberParser } from '@/helpers/numberParser';
import { banners } from '@/utils/dynamic-import/_homepageSections/banner/banner';

const Promo = ({ design, banner }: any) => {
    const BannerComponent = banners[design?.banner] || banners[DEFAULT];

    const bannerType = banner || [];
    banner?.filter((item: any) => numberParser(item?.type) === 0);

    return (
        <>
            {design?.banner !== 'null' && BannerComponent && (
                <BannerComponent banner={bannerType} design={design} />
            )}
        </>
    );
};

export default Promo;
