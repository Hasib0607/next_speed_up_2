'use client';

import { productImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import './card.css';
import ProdMultiCategory from '@/utils/prod-multi-category';

const Card24 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const [cardBorder, setCardBorder] = useState(false);
    const category = item?.category || [];

    const customStyle = `
.searchIconCard24:hover{
    background-color:${design?.header_color};
    color:${design?.text_color};
}
`;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const parsedRating = numberParser(item?.rating, true);

    return (
        <>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div
                    className="p-6 group rounded-md bg-white shadow-lg "
                    style={{
                        border: cardBorder
                            ? `1px solid ${design?.header_color}`
                            : `1px solid #ccc`,
                    }}
                    onMouseEnter={() => setCardBorder(true)}
                    onMouseLeave={() => setCardBorder(false)}
                >
                    <style>{customStyle}</style>
                    <div className="flex justify-center ">
                        <div className="flex sm:flex-row flex-col md:max-w-xl">
                            <div className=" border flex items-center relative">
                                <img
                                    className="h-48 w-48  "
                                    src={productImg + item?.image[0]}
                                    alt="Mountain"
                                />

                                <div className="bg-white hidden border-1 border-gray-300 rounded-full h-10 w-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:flex  items-center justify-center searchIconCard24 group  font-thin lg:cursor-pointer">
                                    <IoSearchCircleOutline className="h-4" />
                                </div>
                            </div>
                            <div className="sm:px-5 flex flex-col justify-start mt-6">
                                <div
                                    className="font-sans text-sm font-normal antialiased card5itemCategory"
                                    style={{
                                        height: '20px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        width: '130px',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {Array.isArray(category) &&
                                        category?.length > 0 && (
                                            <p className="text-sm font-medium">
                                                <ProdMultiCategory
                                                    category={category}
                                                    className={'text-gray-500'}
                                                    count={1}
                                                    linkOff
                                                />
                                            </p>
                                        )}
                                </div>

                                <div
                                    className=" text-base antialiased  font-semibold"
                                    style={{
                                        height: '30px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        width: '130px',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item?.name}
                                </div>

                                <Rate rating={parsedRating} />
                                <div className="flex gap-4 xl:gap-4 md:gap-4 lg:gap-4">
                                    <div className="text-base font-semibold">
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
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Card24;
