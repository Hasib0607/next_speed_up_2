import { DEFAULT } from '@/consts';

import { RootState } from '@/redux/store';
import { banner_bottoms } from '@/utils/dynamic-import/_homepageSections/BannerBottom/BannerBottom';
import { useSelector } from 'react-redux';

const PromoBottom = ({ design }: any) => {
    const BannerBottomComponent =
        banner_bottoms[design?.banner] || banner_bottoms[DEFAULT];
        
    const home = useSelector((state: RootState) => state?.home);
    const banner = home?.banner || {};
    
    return (
        <>
            {BannerBottomComponent && (
                <BannerBottomComponent
                    design={design}
                    banner={banner}
                />
            )}
        </>
    );
};

export default PromoBottom;
