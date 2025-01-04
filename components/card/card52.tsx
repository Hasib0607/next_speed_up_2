'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import Details from '../_product-details-page/components/details';

const Card52 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const parsedRating = numberParser(item?.rating, true);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color-price {
        color:  ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
  `;

    return (
        <div className="">
            <div className="group relative">
                <style>{styleCss}</style>
                {item?.image && (
                    <div className="grid grid-cols-3 gap-5 w-full h-[420px] relative rounded-2xl">
                        {item?.image[0] && (
                            <div className={`col-span-3 w-full`}>
                                <img
                                    src={productImg + item?.image[0]}
                                    alt=""
                                    className={`h-full w-full rounded-xl ${
                                        item?.image.length === 1
                                            ? 'sm:h-[420px] h-[300px] object-cover object-center'
                                            : 'h-[300px] object-cover object-center'
                                    }`}
                                />
                            </div>
                        )}
                        {item?.image[1] && (
                            <div className="w-full h-[100px]">
                                <img
                                    src={productImg + item?.image[1]}
                                    alt=""
                                    className="h-full w-full rounded-xl object-cover object-center"
                                />
                            </div>
                        )}
                        {item?.image[2] && (
                            <div className="w-full h-[100px]">
                                <img
                                    src={productImg + item?.image[2]}
                                    alt=""
                                    className="h-full w-full rounded-xl object-cover object-center"
                                />
                            </div>
                        )}
                        {item?.image[3] && (
                            <div className="w-full h-[100px]">
                                <img
                                    src={productImg + item?.image[2]}
                                    alt=""
                                    className="h-full w-full rounded-xl object-cover object-center "
                                />
                            </div>
                        )}
                    </div>
                )}
                <div className="flex flex-wrap justify-between gap-2 px-4 py-3">
                    <div className="text-gray-800 text-lg font-bold ">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                {item?.name}
                            </h1>{' '}
                        </Link>
                    </div>

                    <div className="text-gray-600 font-semibold ">
                        <div className="flex items-center gap-2">
                            <div className="text-color-price text-sm px-2 py-1 rounded-lg">
                                <BDT />
                                {price}
                            </div>
                            {priceLineThrough && (
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
                    </div>
                </div>
                <div className="px-4">
                    <Rate rating={parsedRating} />
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card52;
