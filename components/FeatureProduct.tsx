'use client';

import { DEFAULT } from '@/consts';
import { feature_products } from '@/utils/dynamic-import/_homepageSections/featureProduct/featureProduct';
import { useGetFeatureProductQuery } from '@/redux/features/products/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const FeatureProduct = ({ design, headersetting }: any) => {
    const FeatureProductComponent =
        feature_products[design?.feature_product] ?? feature_products[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const product = products?.product || [];

    const {
        data: featureProductData,
        isLoading: featureProductLoading,
        isSuccess: featureProductSuccess,
    } = useGetFeatureProductQuery({});
    const feature_product = featureProductData?.data || [];

    return (
        design?.feature_product !== 'null' &&
        FeatureProductComponent &&
        featureProductSuccess && (
            <FeatureProductComponent
                design={design}
                headersetting={headersetting}
                feature_product={feature_product}
                product={product}
            />
        )
    );
};

export default FeatureProduct;
