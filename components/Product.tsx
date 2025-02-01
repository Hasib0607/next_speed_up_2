'use client';

import { DEFAULT} from '@/consts';
import { RootState } from '@/redux/store';
import { all_products } from '@/utils/dynamic-import/_homepageSections/product/product';
import { useSelector } from 'react-redux';

const Product = ({ store_id, design }: any) => {
    const ProductComponent =
        all_products[design?.product] || all_products[DEFAULT];

    const categoryStore = useSelector((state: RootState) => state?.category);
    const products = useSelector((state: RootState) => state?.products);
    const home = useSelector((state: RootState) => state?.home);

    const category = categoryStore?.categories || [];
    const { headersetting } = home || {};

    const product = products?.product || [];
    const best_sell_product = products?.bestSellProduct || [];
    const feature_product = products?.featureProduct || [];

    return (
        <>
            {design?.product !== "null" && category?.length > 0 && ProductComponent && (
                <ProductComponent
                    design={design}
                    store_id={store_id}
                    product={product}
                    category={category}
                    categoryId={category[0]?.id}
                    best_sell_product={best_sell_product}
                    feature_product={feature_product}
                    headersetting={headersetting}
                />
            )}
        </>
    );
};

export default Product;
