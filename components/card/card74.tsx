'use client';

import { productImg } from '@/site-settings/siteUrl';
import QuickView from '@/utils/quick-view';
import Link from 'next/link';
import { useState } from 'react';
import Details from '../_product-details-page/components/details';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';

const Card74 = ({ item }: any) => {
    const [open, setOpen] = useState(false);
    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    return (
        <div className="bg-white relative shadow-md overflow-hidden">
            <div className="">
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            Out of Stock
                        </p>
                    </div>
                )}
                <div className="text-gray-700 bg-white text-base z-[2] absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center px-3 rounded-t-lg shadow-md">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="text-gray-600 text-sm sm:text-[15px] flex items-center gap-2 w-full group-hover:opacity-0 duration-500">
                            <div className="text-[var(--header-color)]">
                                <BDT />
                                {price}
                            </div>
                            {save > 0 && (
                                <p className="line-through text-gray-400">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                        </div>
                    </Link>
                </div>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover"
                        />
                    </div>
                </Link>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card74;
