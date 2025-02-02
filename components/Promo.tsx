import { DEFAULT } from '../consts';

import { banners } from '@/utils/dynamic-import/_homepageSections/banner/banner';

import { useGetBannerQuery } from '@/redux/features/home/homeApi';
import { numberParser } from '@/helpers/numberParser';
import { useMemo } from 'react';

const Promo = ({ design, store_id }: any) => {
    const BannerComponent = banners[design?.banner] || banners[DEFAULT];

    const {
        data: bannerData,
        isLoading: bannerLoading,
        isSuccess: bannerSuccess,
    } = useGetBannerQuery({});

    const bannerType = useMemo(() => {
        const banner = bannerData?.data || [];
        banner?.filter((item: any) => numberParser(item?.type) === 0);
    }, [bannerData]);

    return (
        <>
            {design?.banner !== 'null' && BannerComponent && bannerSuccess && (
                <BannerComponent
                    banner={bannerType}
                    design={design}
                    store_id={store_id}
                />
            )}
        </>
    );
};

export default Promo;
