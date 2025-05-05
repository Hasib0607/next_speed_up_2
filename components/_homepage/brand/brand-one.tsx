import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import { getDataByType } from '@/helpers/getCustomDataByType';
import AnimateMarquee from '@/components/slider/animate-marquee';
import { MasterImage } from '@/utils/image-controller';
import { brandImg } from '@/site-settings/siteUrl';

const BrandOne = ({ headersetting, brands }: any) => {
    if (brands.length === 0) return null;

    const customDesignData = getDataByType(headersetting, 'brand');
    const { title = 'Top Brands', title_color = '#000' } =
        customDesignData || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
            <SectionHeadingSixteen title={title} title_color={title_color} />
            <AnimateMarquee
                speed={10}
                gradient={true}
                className="space-x-6 overflow-hidden"
            >
                <div className="flex items-center gap-x-6">
                    {brands?.map((brand: any, index: any) => (
                        <div
                            className="relative h-40 w-40 transition-all duration-400 origin-center hover:scale-90"
                            key={index}
                        >
                            <MasterImage
                                src={brandImg + brand?.image}
                                alt={brand.name}
                            />
                        </div>
                    ))}
                </div>
            </AnimateMarquee>
        </div>
    );
};

export default BrandOne;
