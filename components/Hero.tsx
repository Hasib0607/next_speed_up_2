import { DEFAULT } from '@/consts';
import { hero } from '@/utils/dynamic-import/_homepageSections/hero/hero';

const Hero = ({ design, slider }: any) => {
    const SelectedHeroComponent = hero[design?.hero_slider] || hero[DEFAULT];

    return (
        design?.hero_slider !== 'null' &&
        SelectedHeroComponent &&
        slider?.length > 0 && (
            <SelectedHeroComponent slider={slider} design={design} />
        )
    );
};

export default Hero;
