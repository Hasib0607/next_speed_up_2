'use client';

import { useGetSingleProductQuery } from '@/redux/features/products/productApi';

import { getPrice } from '@/helpers/getPrice';
import { productImg } from '@/site-settings/siteUrl';
import ProdMultiCategory from '@/utils/prod-multi-category';
import Taka from '@/utils/Taka';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProductCardThreeMultipleCard = ({
    item1,
    productOneId,
    item3,
    productThreeId,
    store_id,
}: any) => {
    const category1 = item1?.category || [];
    const category3 = item3?.category || [];
    const [camp, setCamp] = useState<any>(null);
    const [campThree, setCampThree] = useState<any>(null);

    const {
        data: productOneData,
        isLoading: isLoadingOne,
        isSuccess: isSuccessOne,
    } = useGetSingleProductQuery({
        store_id,
        productId: productOneId,
    });

    const {
        data: productThreeData,
        isLoading: isLoadingThree,
        isSuccess: isSuccessThree,
    } = useGetSingleProductQuery({
        store_id,
        productId: productThreeId,
    });

    const productGetPrice1 = getPrice(
        item1?.regular_price,
        item1?.discount_price,
        item1?.discount_type
    );
    const productGetPrice3 = getPrice(
        item3?.regular_price,
        item3?.discount_price,
        item3?.discount_type
    );

    const campPrice1 = getPrice(
        productGetPrice1,
        parseInt(camp?.discount_amount),
        camp?.discount_type
    );
    const campPrice3 = getPrice(
        productGetPrice3,
        parseInt(campThree?.discount_amount),
        campThree?.discount_type
    );

    // product one
    useEffect(() => {
        if (isSuccessOne) {
            setCamp(productOneData);
        }
    }, [isSuccessOne, productOneData]);

    // product three
    useEffect(() => {
        if (isSuccessThree) {
            setCampThree(productThreeData);
        }
    }, [isSuccessThree, productThreeData]);

    return (
        <>
            <div className="order-last xl:order-none lg:order-none md:order-last grid grid-cols-2 gap-3 gap-y-3 md:grid-cols-2 col-span-2 xl:col-span-1 lg:col-span-1 md:col-span-2">
                <div className="col-span-0 xl:col-span-2 lg:col-span-2 md:col-span-0 rounded-lg bg-gray-200 overflow-hidden">
                    {item1 ? (
                        <>
                            <div className="col-span-1 md:col-span-2 rounded-lg group bg-gray-200">
                                <div className="lg:h-[335px] flex justify-center w-full">
                                    <div className="overflow-hidden w-full h-full">
                                        <Link
                                            href={
                                                '/product/' +
                                                item1?.id +
                                                '/' +
                                                item1?.slug
                                            }
                                        >
                                            <img
                                                src={
                                                    productImg + item1.image[0]
                                                }
                                                alt="Mountain"
                                                className="h-full min-w-full object-cover  group-hover:scale-105 transition-all duration-300 ease-linear"
                                            />
                                        </Link>
                                    </div>
                                </div>

                                <div className="md:flex xl:justify-between md:justify-between lg:justify-between px-4 py-5">
                                    <div>
                                        <Link
                                            href={
                                                '/product/' +
                                                item1?.id +
                                                '/' +
                                                item1?.slug
                                            }
                                        >
                                            <p className="text-lg font-bold">
                                                {item1?.name?.slice(0, 15)}{' '}
                                                {item1?.name?.length > 15 &&
                                                    '...'}
                                            </p>
                                        </Link>
                                        {/* <Link
                                            href={`/category/${item1?.category_id}`}
                                        >
                                            <p className="text-sm ">
                                                {item1?.category}
                                            </p>
                                        </Link> */}
                                        {Array.isArray(category1) &&
                                            category1?.length > 0 && (
                                                <ProdMultiCategory
                                                    category={category1}
                                                />
                                            )}
                                    </div>
                                    <div>
                                        <div className="line-through text-gray-400 text-sm">
                                            <h1 className="">
                                                {camp?.status !== 'active' &&
                                                (item1.discount_type ===
                                                    'no_discount' ||
                                                    item1.discount_price ===
                                                        '0.00') ? (
                                                    ' '
                                                ) : (
                                                    <p>
                                                        <Taka />
                                                        {Math.trunc(
                                                            item1?.regular_price
                                                        )}
                                                    </p>
                                                )}
                                            </h1>
                                        </div>
                                        <p className="text-lg font-bold">
                                            {' '}
                                            <Taka />
                                            {camp?.status === 'active'
                                                ? campPrice1
                                                : productGetPrice1}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-2xl text-black flex items-center justify-center h-96">
                                <h2> Product Not Available</h2>
                            </div>
                        </>
                    )}
                </div>

                <div className="xl:col-span-2 lg:col-span-2 rounded-lg bg-gray-200 overflow-hidden">
                    {item3 ? (
                        <>
                            <div className="col-span-1 md:col-span-2 rounded-lg group bg-gray-200">
                                <div className="lg:h-[335px] flex justify-center w-full">
                                    <div className="overflow-hidden  w-full h-full">
                                        <Link
                                            href={
                                                '/product/' +
                                                item3?.id +
                                                '/' +
                                                item3?.slug
                                            }
                                        >
                                            <img
                                                src={
                                                    productImg + item3.image[0]
                                                }
                                                alt="Mountain"
                                                className="h-full min-w-full object-cover group-hover:scale-105 transition-all duration-300 ease-linear"
                                            />
                                        </Link>
                                    </div>
                                </div>

                                <div className="xl:flex lg:flex md:flex xl:justify-between md:justify-between lg:justify-between px-4 py-5">
                                    <div>
                                        <Link
                                            href={
                                                '/product/' +
                                                item3?.id +
                                                '/' +
                                                item3?.slug
                                            }
                                        >
                                            {' '}
                                            <p className="text-base font-bold">
                                                {item3?.name?.slice(0, 15)}{' '}
                                                {item3?.name?.length > 15 &&
                                                    '...'}
                                            </p>
                                        </Link>
                                        {/* <Link
                                            href={`/category/${item3?.category_id}`}
                                        >
                                            <p className="text-sm">
                                                {item3?.category}
                                            </p>
                                        </Link> */}
                                        {Array.isArray(category3) &&
                                            category3?.length > 0 && (
                                                <ProdMultiCategory
                                                    category={category3}
                                                />
                                            )}
                                    </div>
                                    <div>
                                        <div className="line-through text-gray-400 text-sm">
                                            <h1 className="">
                                                {campThree?.status !==
                                                    'active' &&
                                                (item3.discount_type ===
                                                    'no_discount' ||
                                                    item3.discount_price ===
                                                        '0.00') ? (
                                                    ' '
                                                ) : (
                                                    <p>
                                                        <Taka />
                                                        {Math.trunc(
                                                            item3.regular_price
                                                        )}
                                                    </p>
                                                )}
                                            </h1>
                                        </div>
                                        <p className="text-lg font-bold">
                                            {' '}
                                            <Taka />
                                            {campThree?.status === 'active'
                                                ? campPrice3
                                                : productGetPrice3}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-2xl text-black flex items-center justify-center  h-96">
                                <h2> Product Not Available</h2>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductCardThreeMultipleCard;
