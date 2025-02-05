'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';

import { productImg } from '@/site-settings/siteUrl';

import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import { useState } from 'react';

import Details from '../_product-details-page/components/details';
import { numberParser } from '@/helpers/numberParser';

const Card64 = ({ item }: any) => {
    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${bgColor};
    }
    .text-hover:hover {
        color: ${bgColor};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: transparent;
        border: 1px solid ${bgColor};
    }
  `;

    return (
        <div className="bg-[#F4F1F0] hover:shadow-[0px_0px_20px_1px_rgba(205,209,228)]">
            <div className=" relative overflow-hidden border rounded-md duration-500">
                <style>{styleCss}</style>
                {/* out of stock  */}
                {!productAvailablity && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            Out of Stock
                        </p>
                    </div>
                )}
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover p-2"
                        />
                    </div>
                </Link>

                <div className="flex flex-col gap-2 px-4 py-3 duration-1000">
                    <div className="text-gray-700 text-base text-center">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="text-hover capitalize truncate">
                                {item?.name}
                            </h1>{' '}
                        </Link>
                    </div>

                    <div className="text-gray-700 font-semibold flex items-center justify-center gap-2 w-full group-hover:opacity-0 duration-500">
                        <div className="text-sm">
                            <BDT />
                            {price}
                        </div>
                        {productAvailablity && save > 0 && (
                            <p className="line-through text-xs ">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card64;
