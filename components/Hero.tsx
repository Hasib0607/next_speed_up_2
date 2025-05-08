import { hero } from '@/utils/dynamic-import/_homepageSections/hero/hero';

const Hero = ({ design, slider, banner }: any) => {
    const SelectedHeroComponent = hero[design?.hero_slider];

    return (
        design?.hero_slider !== 'null' &&
        SelectedHeroComponent &&
        slider?.length > 0 && (
            <SelectedHeroComponent slider={slider} design={design} banner={banner} />
        )
    );
};

export default Hero;
