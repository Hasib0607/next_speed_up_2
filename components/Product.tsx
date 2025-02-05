'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { all_products } from '@/utils/dynamic-import/_homepageSections/product/product';
import { useSelector } from 'react-redux';

const Product = ({ design, headersetting }: any) => {
    const ProductComponent =
        all_products[design?.product] || all_products[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const categoryStore = useSelector((state: RootState) => state?.category);
    const category = categoryStore?.categories || [];

    const product = products?.product || [];
    const best_sell_product = products?.bestSellProduct || [];
    const feature_product = products?.featureProduct || [];

    // console.log("product log");
    // console.log("product",product);
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
