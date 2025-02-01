'use client';

import Skeleton from '@/components/loaders/TextSkeleton';
import { DEFAULT } from '@/consts';
import { useGetSliderQuery } from '@/redux/features/home/homeApi';
import { hero } from '@/utils/dynamic-import/_homepageSections/hero/hero';

const Hero = ({ design }: any) => {
    const SelectedHeroComponent = hero[design?.hero_slider] || hero[DEFAULT];

    const {
        data: sliderData,
        isLoading: sliderLoading,
        isError: sliderError,
        isSuccess: sliderSuccess,
    } = useGetSliderQuery({});
    
    const slider = sliderData?.data || [];

    return (
        <>
            {design?.hero_slider && sliderLoading && !sliderError && (
                <div className="relative xl:px-20 lg:px-10 md:px-10 px-5 bg-white pb-5">
                    <Skeleton
                        className={
                            'rounded-lg h-[200px] w-full xl:h-[700px] lg:h-[480px] md:h-[310px]'
                        }
                    />
                </div>
            )}


            {design?.hero_slider !== "null" && SelectedHeroComponent && sliderSuccess && (

                <SelectedHeroComponent slider={slider} design={design} />
            )}
        </>
    );
};
export default Hero;
