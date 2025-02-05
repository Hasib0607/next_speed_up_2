'use client';

import { numberParser } from '@/helpers/numberParser';
import dynamic from 'next/dynamic';
const ProductCardThreeMultipleCard = dynamic(
    () => import('@/components/card/product-card/product-card-three-multiple')
);
const ProductCardThreeSecondSinglePage = dynamic(
    () =>
        import(
            '@/components/card/product-card/product-card-three-second-single'
        )
);
const ProductCardThreeSingleCard = dynamic(
    () => import('@/components/card/product-card/product-card-three-single')
);
const SectionHeadingSeven = dynamic(
    () => import('@/components/section-heading/section-heading-seven')
);

const FeatureProductSeven = ({
    feature_product,
    design,
    headersetting,
}: any) => {
    const store_id = numberParser(design?.store_id) || null;
    const { custom_design } = headersetting || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        featuredProduct || {};
        
    return (
        <>
            <div className="container px-5 bg-white py-8">
                <SectionHeadingSeven titleColor={title_color} title={title} />
                <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-3 md:gap-3">
                    {feature_product?.length > 0 && feature_product?.[0] && (
                        <ProductCardThreeSingleCard
                            item={feature_product?.[0]}
                            productId={feature_product?.[0]?.id}
                            store_id={store_id}
                        />
                    )}
                    {feature_product?.length > 1 &&
                        feature_product?.[1] &&
                        feature_product?.[2] && (
                            <ProductCardThreeMultipleCard
                                item1={feature_product?.[1]}
                                productOneId={feature_product?.[1]?.id}
                                item3={feature_product?.[2]}
                                productThreeId={feature_product?.[2]?.id}
                                store_id={store_id}
                            />
                        )}
                    {feature_product?.length > 3 && feature_product?.[3] && (
                        <ProductCardThreeSecondSinglePage
                            item={feature_product?.[3]}
                            productId={feature_product?.[3]?.id}
                            store_id={store_id}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default FeatureProductSeven;
