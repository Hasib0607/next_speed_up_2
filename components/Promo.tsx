'use client';

import { DEFAULT } from '../consts';
import { banners } from '@/utils/dynamic-import/_homepageSections/banner/banner';

import { useGetBannerQuery } from '@/redux/features/home/homeApi';
import { numberParser } from '@/helpers/numberParser';
import { useMemo } from 'react';

const Promo = ({ design }: any) => {
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

    // console.log("banner log");
    // console.log("bannerData",bannerData);

    return (
        <>
            {design?.banner !== 'null' && bannerSuccess && BannerComponent && (
                <BannerComponent banner={bannerType} design={design} />
            )}
        </>
    );
};

export default Promo;
