'use client';

import { getPrice } from '@/helpers/getPrice';
import { useGetSingleProductQuery } from '@/redux/features/products/productApi';
import { productImg } from '@/site-settings/siteUrl';
import ProdMultiCategory from '@/utils/prod-multi-category';
import Taka from '@/utils/Taka';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProductCardThreeSecondSinglePage = ({
    item,
    productId,
    store_id,
}: any) => {
    const category = item?.category || [];
    const [camp, setCamp] = useState<any>(null);

    const productGetPrice = getPrice(
        item?.regular_price,
        item?.discount_price,
        item?.discount_type
    );
    const campPrice = getPrice(
        productGetPrice,
        parseInt(camp?.discount_amount),
        camp?.discount_type
    );

    const { data, isLoading, isSuccess } = useGetSingleProductQuery({
        store_id,
        productId,
    });

    useEffect(() => {
        if (isSuccess) {
            setCamp(data);
        }
    }, [isSuccess, data]);

    return (
        <div className="col-start-2 xl:col-span-1 lg:col-span-1 md:col-span-0 bg-gray-200 group rounded-lg">
            {item ? (
                <div className="">
                    <div className="lg:h-[800px] overflow-hidden flex justify-center items-center w-full">
                        <div className="overflow-hidden w-full h-full">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <img
                                    src={productImg + item?.image[0]}
                                    alt="Mountain"
                                    className="h-full min-w-full object-cover group-hover:scale-105 transition-all duration-300 ease-linear"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="md:flex md:justify-between px-4 py-5">
                        <div>
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <p className="text-lg font-bold">
                                    {item?.name?.slice(0, 15)}{' '}
                                    {item?.name?.length > 15 && '...'}
                                </p>
                            </Link>
                            {/* <Link href={`/category/${item?.category_id}`}>
                                <p className="text-sm">{item?.category}</p>
                            </Link> */}
                            {Array.isArray(category) &&
                                category?.length > 0 && (
                                    <ProdMultiCategory category={category} />
                                )}
                        </div>
                        <div>
                            <div className="line-through text-gray-400 text-sm">
                                {camp?.status !== 'active' &&
                                (item.discount_type === 'no_discount' ||
                                    item.discount_price === '0.00') ? (
                                    ' '
                                ) : (
                                    <p>
                                        <Taka />
                                        {Math.trunc(item?.regular_price)}
                                    </p>
                                )}
                            </div>
                            <p className="text-lg font-bold">
                                {' '}
                                <Taka />
                                {camp?.status === 'active'
                                    ? campPrice
                                    : productGetPrice}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-2xl text-black flex items-center justify-center  h-[120px] xl:h-[520px] lg:h-[520px] md:h-[220px]">
                    <h2> Product Not Available</h2>
                </div>
            )}
        </div>
    );
};

export default ProductCardThreeSecondSinglePage;
