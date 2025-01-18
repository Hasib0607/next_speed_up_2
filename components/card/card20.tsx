'use client';

import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import Rate from '@/utils/rate';
import Link from 'next/link';

const Card20 = ({ item }: any) => {
    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
    const productAvailablity = isAvailable(item);

    const parsedNumberRating = numberParser(item?.number_rating);
    const parsedRating = numberParser(item?.rating, true);

    return (
        <Link
            href={'/product/' + item?.id + '/' + item?.slug}
            className="h-[100px] w-[270px] flex relative"
        >
            {/* out of stock  */}
            {!productAvailablity && (
                <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                    <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                        Sold Out
                    </p>
                </div>
            )}
            <div className="w-[100px] h-[100px] ">
                <img
                    src={productImg + item?.image[0]}
                    className={'w-full h-full object-cover'}
                    alt=""
                />
            </div>
            <div className="flex flex-col justify-center items-start bg-[#f1f1f1] pl-4 grow">
                <h3 className="text-[#333] text-base whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[150px] max-w-[150px]">
                    {item?.name}
                </h3>
                <p className="text-[#40af64] text-lg font-semibold">
                    <BDT price={price} />
                </p>
                {priceLineThrough && (
                    <p className="line-through text-gray-400 text-sm">
                        {' '}
                        <BDT price={numberParser(item?.regular_price)} />
                    </p>
                )}
                <div className="flex gap-x-1">
                    <div>
                        <Rate rating={parsedRating} />
                    </div>
                    <div className="text-gray-500 sm:text-sm text-xs">
                        ({parsedNumberRating})
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card20;
