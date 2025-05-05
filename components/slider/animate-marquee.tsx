import { brandImg } from '@/site-settings/siteUrl';
import { MasterImage } from '@/utils/image-controller';
import React from 'react';
import Marquee from 'react-fast-marquee';

const AnimateMarquee = ({ brands }: any) => {
    return (
        <Marquee>
            {brands?.map((brand: any, index: any) => (
                <div className="py-3" key={index}>
                    <MasterImage
                        src={brandImg + brand?.image}
                        alt={brand.name}
                        className="h-40 px-10"
                    />
                </div>
            ))}
        </Marquee>
    );
};

export default AnimateMarquee;
