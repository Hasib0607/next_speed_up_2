'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { all_products } from '@/utils/dynamic-import/_homepageSections/product/product';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import {
    useGetBestSellProductQuery,
    useGetFeatureProductQuery,
} from '@/redux/features/products/productApi';

const Product = ({ design, headersetting }: any) => {
    const ProductComponent =
        all_products[design?.product] || all_products[DEFAULT];

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const products = useSelector((state: RootState) => state?.products);
    const product = products?.product || [];

    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});
    const best_sell_product = bestSellProductData?.data || [];

    const {
        data: featureProductData,
        isLoading: featureProductLoading,
        isSuccess: featureProductSuccess,
    } = useGetFeatureProductQuery({});
    const feature_product = featureProductData?.data || [];

    // console.log("lgo p d",design,);
    // console.log("lgo p h",headersetting);
    // console.log("best_sell_product",best_sell_product);
    // console.log("feature_product",feature_product);

    return (
        <>
            {design?.product !== 'null' &&
                category?.length > 0 &&
                ProductComponent && (
                    <ProductComponent
                        design={design}
                        headersetting={headersetting}
                        product={product}
                        category={category}
                        categoryId={category[0]?.id}
                        best_sell_product={best_sell_product}
                        feature_product={feature_product}
                    />
                )}
        </>
    );
};

export default Product;
