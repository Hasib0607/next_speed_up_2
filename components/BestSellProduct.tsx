'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useGetBestSellProductQuery } from '@/redux/features/products/productApi';
import { best_sell_products } from '@/utils/dynamic-import/_homepageSections/bestSellProduct/bestSellProduct';

const BestSellProduct = ({ design, headersetting }: any) => {
    const store_id = design?.store_id || null;

    const BestSellProductComponent =
        best_sell_products[design?.best_sell_product] ||
        best_sell_products[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const product = products?.product || [];

    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});
    const best_sell_product = bestSellProductData?.data || [];

    return (
        <>
            {design?.best_sell_product !== 'null' &&
                BestSellProductComponent &&
                bestSellProductSuccess && (
                    <BestSellProductComponent
                        best_sell_product={best_sell_product}
                        bestSellProductLoading={bestSellProductLoading}
                        design={design}
                        headersetting={headersetting}
                        store_id={store_id}
                        product={product}
                    />
                )}
        </>
    );
};

export default BestSellProduct;
