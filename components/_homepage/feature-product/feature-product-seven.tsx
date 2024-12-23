'use client';

import dynamic from 'next/dynamic';

const ProductCardThreeMultipleCard = dynamic(
    () => import('@/components/card/product-card/product-card-three-multiple'),
    { ssr: false }
);
const ProductCardThreeSecondSinglePage = dynamic(
    () =>
        import(
            '@/components/card/product-card/product-card-three-second-single'
        ),
    { ssr: false }
);
const ProductCardThreeSingleCard = dynamic(
    () => import('@/components/card/product-card/product-card-three-single'),
    { ssr: false }
);
const SectionHeadingSeven = dynamic(
    () => import('@/components/section-heading/section-heading-seven')
);

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FeatureProductSeven = ({ feature_product, store_id }: any) => {
    const headerdata = useSelector((state: RootState) => state.home.header); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        featuredProduct || {};

    return (
        <>
            <div className="container px-5 bg-white py-8">
                <SectionHeadingSeven titleColor={title_color} title={title} />
                <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-3 md:gap-3">
                    {feature_product?.length > 0 && (
                        <>
                            {feature_product?.[0] && (
                                <ProductCardThreeSingleCard
                                    item={feature_product?.[0]}
                                    productId={feature_product?.[0]?.id}
                                    store_id={store_id}
                                />
                            )}
                            {feature_product?.[1] && feature_product?.[2] && (
                                <ProductCardThreeMultipleCard
                                    item1={feature_product?.[1]}
                                    productOneId={feature_product?.[1]?.id}
                                    item3={feature_product?.[2]}
                                    productThreeId={feature_product?.[2]?.id}
                                    store_id={store_id}
                                />
                            )}
                            {feature_product?.[3] && (
                                <ProductCardThreeSecondSinglePage
                                    item={feature_product?.[3]}
                                    productId={feature_product?.[3]?.id}
                                    store_id={store_id}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default FeatureProductSeven;
