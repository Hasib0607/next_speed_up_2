'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { productImg } from '@/site-settings/siteUrl';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';
import QuikView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';

const Card8 = ({ item }: any) => {
    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    return (
        <>
            <Link
                href={'/product/' + item?.id + '/' + item?.slug}
                className="p-3 group bg-white  "
            >
                <div className="flex justify-center ">
                    <div className="flex flex-row  md:flex-row   ">
                        <div className=" w-[100px] h-[100px]  ">
                            <img
                                className=" w-full  h-full object-cover border"
                                src={productImg + item?.image[0]}
                                alt="Mountain"
                            />
                        </div>
                        <div className="px-5 flex flex-col justify-start">
                            <p className=" text-sm font-normal antialiased mb-2 text-gray-500 menu-hover card5itemCategory whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                {item.name}
                            </p>

                            <div className="px-1 pt-4 pb-2 text-gray-700 text-sm font-bold antialiased mb-2 flex items-center gap-2">
                                <div className="text-base font-semibold">
                                    <BDT />
                                    {price}
                                </div>
                                {priceLineThrough ? (
                                    <p className="line-through text-gray-400">
                                        {' '}
                                        <BDT
                                            price={numberParser(
                                                item?.regular_price
                                            )}
                                        />
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <QuikView open={open} setOpen={setOpen}>
                    <Details product={item} />
                </QuikView>
            </Link>
        </>
    );
};

export default Card8;
