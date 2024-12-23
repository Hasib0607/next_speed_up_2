import { DEFAULT } from '@/consts';
import { useGetSliderQuery } from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';
import { banner_bottoms } from '@/utils/dynamic-import/_homepageSections/BannerBottom/BannerBottom';
import { useSelector } from 'react-redux';

const PromoBottom = ({ design }: any) => {
    const BannerBottomComponent =
        banner_bottoms[design?.banner] || banner_bottoms[DEFAULT];

    const home = useSelector((state: RootState) => state?.home);
    const banner = home?.banner || {};

    const {
        data: brandData,
        isLoading: brandLoading,
        isSuccess: brandSuccess,
    } = useGetSliderQuery({});
    const brand = brandData?.data || [];

    return (
        <>
            {BannerBottomComponent && brandSuccess && (
                <BannerBottomComponent
                    design={design}
                    banner={banner}
                    brand={brand}
                />
            )}
        </>
    );
};

export default PromoBottom;
