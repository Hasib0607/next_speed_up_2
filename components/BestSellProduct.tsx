'use client';

import { DEFAULT } from '@/consts';
import { best_sell_products } from '@/utils/dynamic-import/_homepageSections/bestSellProduct/bestSellProduct';

import { useGetBestSellProductQuery } from '@/redux/features/products/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const BestSellProduct = ({ design, store_id }: any) => {
    const BestSellProductComponent =
        best_sell_products[design?.best_sell_product] || best_sell_products[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const home = useSelector((state: RootState) => state?.home);

    const product = products?.product || [];

    const banner = home?.banner || [];

    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});
    const best_sell_product = bestSellProductData?.data || [];
    
    return (
        <>
            {design?.best_sell_product !== "null" && BestSellProductComponent && bestSellProductSuccess && (
                <BestSellProductComponent
                    best_sell_product={best_sell_product}
                    bestSellProductLoading={bestSellProductLoading}
                    design={design}
                    store_id={store_id}
                    product={product}
                    banner={banner}
                />
            )}
        </>
    );
};

export default BestSellProduct;