'use client';

import { DEFAULT } from '@/consts';
import { numberParser } from '@/helpers/numberParser';
import { useGetBannerQuery } from '@/redux/features/home/homeApi';
import { banner_bottoms } from '@/utils/dynamic-import/_homepageSections/BannerBottom/BannerBottom';
import { useMemo } from 'react';


const PromoBottom = ({ design }: any) => {
    const BannerBottomComponent =
        banner_bottoms[design?.banner] || banner_bottoms[DEFAULT];

    const {
        data: bannerData,
        isLoading: bannerLoading,
        isSuccess: bannerSuccess,
    } = useGetBannerQuery({});

    const bannerType = useMemo(() => {
        const banner = bannerData?.data || [];
        banner?.filter((item: any) => numberParser(item?.type) === 1);
    }, [bannerData]);

    // console.log("bannerbottoms log");
    // console.log("bannerbottomsData",bannerData);

    return (
        <>
            {design?.banner !== 'null' && bannerSuccess && BannerBottomComponent && (
                <BannerBottomComponent design={design} banner={bannerType} />
            )}
        </>
    );
};

export default PromoBottom;
