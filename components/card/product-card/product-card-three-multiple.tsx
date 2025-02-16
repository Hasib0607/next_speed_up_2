'use client';

import { productImg } from '@/site-settings/siteUrl';
import ProdMultiCategory from '@/utils/prod-multi-category';
import Link from 'next/link';
import { numberParser } from '@/helpers/numberParser';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import BDT from '@/utils/bdt';

const ProductCardThreeMultipleCard = ({ item1, item3 }: any) => {
    const category1 = item1?.category || [];
    const category3 = item3?.category || [];

    const price1 = productCurrentPrice(item1);
    const save1 = howMuchSave(item1);

    const price3 = productCurrentPrice(item3);
    const save3 = howMuchSave(item3);

    return (
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
                                            src={productImg + item1.image[0]}
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
                                            {item1?.name?.length > 15 && '...'}
                                        </p>
                                    </Link>
                                    {Array.isArray(category1) &&
                                        category1?.length > 0 && (
                                            <p className="text-sm">
                                                <ProdMultiCategory
                                                    category={category1}
                                                    className={'text-gray-500'}
                                                    count={1}
                                                />
                                            </p>
                                        )}
                                </div>
                                <div>
                                    {save1 > 0 && (
                                        <p className="line-through text-gray-400 text-sm">
                                            {' '}
                                            <BDT
                                                price={numberParser(
                                                    item1?.regular_price
                                                )}
                                            />
                                        </p>
                                    )}
                                    <div className="text-lg font-bold">
                                        <BDT />
                                        {price1}
                                    </div>
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
                                            src={productImg + item3.image[0]}
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
                                            {item3?.name?.length > 15 && '...'}
                                        </p>
                                    </Link>
                                    {Array.isArray(category3) &&
                                        category3?.length > 0 && (
                                            <p className="text-sm">
                                                <ProdMultiCategory
                                                    category={category3}
                                                    className={'text-gray-500'}
                                                    count={1}
                                                />
                                            </p>
                                        )}
                                </div>
                                <div>
                                    {save3 > 0 && (
                                        <p className="line-through text-gray-400 text-sm">
                                            {' '}
                                            <BDT
                                                price={numberParser(
                                                    item3?.regular_price
                                                )}
                                            />
                                        </p>
                                    )}
                                    <div className="text-lg font-bold">
                                        <BDT />
                                        {price3}
                                    </div>
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
    );
};

export default ProductCardThreeMultipleCard;
