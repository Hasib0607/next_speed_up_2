'use client';

import Card44 from '@/components/card/card44';
import SectionHeadingEighteen from '@/components/section-heading/section-heading-eighteen';

const FeatureProductTwenty = ({ feature_product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 relative">
            <SectionHeadingEighteen
                title={title}
                subtitle={''}
                titleColor={title_color}
            />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                {feature_product?.length > 0 &&
                    feature_product
                        ?.slice(0, 3)
                        ?.map((item: any) => (
                            <Card44 item={item} key={item.id} />
                        ))}
            </div>
        </div>
    );
};

export default FeatureProductTwenty;
