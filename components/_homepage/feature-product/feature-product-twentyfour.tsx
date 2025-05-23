'use client';

import Card49 from '@/components/card/card49';
import Link from 'next/link';
import SectionHeadingTwentyFour from '@/components/section-heading/section-heading-twenty-four';

const FeatureProductTwentyFour = ({
    feature_product,
    design,
    headersetting,
}: any) => {
    const styleCss = `
        .bg-color {
            color:  ${design?.text_color};
            background: ${design?.header_color};
        }
        .btn-feature-product {
            color: ${design?.header_color};
            border: 1px solid ${design?.header_color};
        }
        .btn-feature-product:hover {
            color: ${design?.text_color};
            border: 1px solid ${design?.header_color};
        }
    `;

    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div>
                <SectionHeadingTwentyFour
                    title={title}
                    subtitle={''}
                    design={design}
                    title_color={title_color}
                />
            </div>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                {feature_product?.length > 0 &&
                    feature_product?.slice(0, 4)?.map((item: any) => (
                        <div key={item.id}>
                            <Card49 item={item} />
                        </div>
                    ))}
            </div>
            <div className="flex justify-center items-center mt-16">
                <div className="bg-transparent btn-feature-product relative group w-max">
                    <p className="absolute bg-color top-0 left-0 right-0 scale-y-0 group-hover:scale-y-100 transform origin-[100%_0%] group-hover:ease-[cubic-bezier(0.52,1.64,0.87,.70)] ease-[cubic-bezier(0.52,1.64,0.87,0.66)] slider-btn-twenty-four duration-500 bottom-0"></p>
                    <Link href="/shop">
                        <h1 className="lg:px-14 px-3 lg:py-4 py-2 relative z-[2] duration-300 lg:text-base text-xs w-max lg:cursor-pointer uppercase font-medium">
                            DISCOVER MORE
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductTwentyFour;
