'use client';

import ProductCardTen from '@/components/card/product-card/product-card-ten';
import { useGetBestSellProductQuery } from '@/redux/features/products/productApi';

const BestSellerFortyThreeForShop = () => {
    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});
    const best_sell_product = bestSellProductData?.data || [];

    return (
        <div className="py-5 bg-white">
            <div className="container">
                {best_sell_product?.length > 0 &&
                    best_sell_product
                        ?.slice(0, 1)
                        ?.map((item: any) => (
                            <ProductCardTen item={item} key={item?.id} />
                        ))}
            </div>
        </div>
    );
};

export default BestSellerFortyThreeForShop;
