import { DEFAULT } from '../consts';

import { banners } from '@/utils/dynamic-import/_homepageSections/banner/banner';

import { useGetBannerQuery } from '@/redux/features/home/homeApi';

const Promo = ({ design, store_id }: any) => {
    const BannerComponent = banners[design?.banner] || banners[DEFAULT];

    const {
        data: bannerData,
        isLoading: bannerLoading,
        isSuccess: bannerSuccess,
    } = useGetBannerQuery({});

    const banner = bannerData?.data || [];

    return (
        <>
            {BannerComponent && bannerSuccess && (
                <BannerComponent
                    banner={banner}
                    design={design}
                    store_id={store_id}
                />
            )}
        </>
    );
};

export default Promo;
