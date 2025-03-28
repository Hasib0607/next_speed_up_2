'use client';

import Card65 from '@/components/card/card65';

const FeatureProductThirtyEight = ({ feature_product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="py-5 sm:py-10 bg-[#F2F4F8]">
            <div className="sm:container px-5">
                <div className="text-center pb-10">
                    <p
                        style={{ color: title_color }}
                        className="font-bold text-[20px]"
                    >
                        {title}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center">
                        {feature_product?.length > 0 &&
                            feature_product
                                ?.slice(0, 12)
                                ?.map((item: any) => (
                                    <Card65 item={item} key={item.id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductThirtyEight;
