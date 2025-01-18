'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Rate from '@/utils/rate';
import Link from 'next/link';

import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card34 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);

    const { design } = home || {};

    const [open, setOpen] = useState(false);

    const styleCss = `
    .search-bg{
        background: ${design?.header_color} ;
        color : white ;
    } 
  `;

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const parsedNumberRating = numberParser(item?.number_rating);
    const parsedRating = numberParser(item?.rating, true);

    return (
        <div className="group flex flex-col justify-between relative">
            <style>{styleCss}</style>
            {productAvailablity && (
                <div
                    className="absolute text-xs px-2  py-2 top-2 right-2 rounded-md"
                    style={{
                        background: `${design?.header_color}`,
                        color: `${design?.text_color}`,
                    }}
                >
                    <p>
                        Save {item.discount_type === 'fixed' ? 'BDT' : ''}{' '}
                        {Math.trunc(item.discount_price)}{' '}
                        {item.discount_type === 'percent' ? '%' : ''}
                    </p>
                </div>
            )}

            <div className=" w-full h-full overflow-hidden py-10">
                <div className="flex justify-center overflow-hidden relative">
                    <Link
                        href={'/product/' + item?.id + '/' + item?.slug}
                        className="h-[150px] w-[150px] mx-auto border-2 rounded-full overflow-hidden bg-white"
                    >
                        <img
                            src={productImg + item?.image[0]}
                            className="block p-2 h-auto mx-auto mt-auto scale-125  transition-all duration-300 ease-linear"
                            alt=""
                        />
                    </Link>
                    <div className="h-[80px]  absolute opacity-0 group-hover:opacity-100 bottom-0 left-[50%] translate-x-[-50%] translate-y-10 group-hover:translate-y-5 transition-all duration-500 ease-linear flex divide-x-2 lg:cursor-pointer gap-4  ">
                        <div
                            className="rounded-full border-4 border-white h-12 w-12 flex justify-center items-center search-bg hover:bg-blue-300 duration-300"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineSearch className="text-xl " />
                        </div>
                    </div>
                </div>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="py-5">
                        <div className="flex justify-center">
                            <h2 className="text-xl text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                {item?.name}
                            </h2>
                        </div>
                        <div className="text-gray-600 text-lg font-semibold flex flex-wrap gap-1 px-5 pt-2 justify-center items-center">
                            <div className="text-base font-semibold">
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
                        <div className="flex justify-center items-center gap-x-1 pt-2">
                            <div>
                                <Rate rating={parsedRating} />
                            </div>
                            <div className="text-gray-500 sm:text-sm text-xs">
                                ({parsedNumberRating})
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card34;
