'use client';

import { useGetBestSellProductQuery } from '@/redux/features/products/productApi';
import Link from 'next/link';

const CustomMenu = () => {
    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});
    const best_sell_product = bestSellProductData?.data || [];

    return (
        <div className="py-2 bg-white">
            <div className="container">
                {best_sell_product?.length > 0 &&
                    best_sell_product?.slice(1, 6)?.map((item: any) => (
                        <Link
                            key={item?.id}
                            href={'/product/' + item?.id + '/' + item?.slug}
                        >
                            <p className="hover:text-[var(--header-color)]">
                                {item?.name?.slice(0, 40)}{' '}
                                {item?.name?.length > 40 ? '...' : null}
                            </p>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default CustomMenu;
