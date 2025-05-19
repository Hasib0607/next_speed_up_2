import { Suspense } from 'react';
import Skeleton from '@/components/loaders/TextSkeleton';
import { hero } from '@/utils/dynamic-import/_homepageSections/hero/hero';

const Hero = ({ design, slider, banner }: any) => {
    const SelectedHeroComponent = hero[design?.hero_slider];

    return (
        <Suspense
            fallback={
                <div className="relative xl:px-20 lg:px-10 md:px-10 px-5 bg-gray-400 pb-5">
                    <Skeleton
                        className={
                            'rounded-lg h-[200px] w-full xl:h-[700px] lg:h-[480px] md:h-[310px]'
                        }
                    />
                </div>
            }
        >
            {design?.hero_slider !== 'null' &&
                SelectedHeroComponent &&
                slider?.length > 0 && (
                    <SelectedHeroComponent
                        slider={slider}
                        design={design}
                        banner={banner}
                    />
                )}
        </Suspense>
    );
};

export default Hero;
