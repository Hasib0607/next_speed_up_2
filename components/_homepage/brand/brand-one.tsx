'use client';

import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import { getDataByType } from '@/helpers/getCustomDataByType';
import AnimateMarquee from '@/components/slider/animate-marquee';

const BrandOne = ({ headersetting, brands }: any) => {
    if (brands.length === 0) return null;

    const customDesignData = getDataByType(headersetting, 'brand');
    const { title = 'Top Brands', title_color = '#000' } =
        customDesignData || {};

    return ( 
        <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
            <SectionHeadingSixteen title={title} title_color={title_color} />
            <AnimateMarquee brands={brands} />
        </div>
    );
};

export default BrandOne;
