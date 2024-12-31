'use client';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card35 = ({ item }: any) => {
    const dispatch = useDispatch();

    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const [open, setOpen] = useState(false);

    const styleCss = `
    .search-bg{
        background: ${design?.header_color} ;
        color : white;
    } 
  `;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const parsedNumberRating = numberParser(item?.number_rating);
    const parsedRating = numberParser(item?.rating, true);

    const handleAddToCart = () => {
        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            addToCart({
                dispatch,
                product: item,
                cartList,
                price,
                qty: 1,
                productQuantity: item?.quantity,
            });
        }
    };

    return (
        <div className="group flex flex-col justify-between ">
            <style>{styleCss}</style>
            <div className=" w-full h-full border-4 border-[#F4F4F4] overflow-hidden">
                <div className="flex justify-center relative overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item?.image[0]}
                            className="block h-auto min-w-[100%] mx-auto mt-auto group-hover:scale-125  transition-all duration-700 ease-linear group-hover:rotate-6"
                            alt=""
                        />
                    </Link>

                    {item.discount_type === 'no_discount' ||
                    item.discount_price === '0.00' ? (
                        ''
                    ) : (
                        <div
                            className="absolute text-xs px-2  py-2 top-2 right-2 rounded-md"
                            style={{
                                background: `${design?.header_color}`,
                                color: `${design?.text_color}`,
                            }}
                        >
                            <p>
                                Save{' '}
                                {item.discount_type === 'fixed' ? 'BDT' : ''}{' '}
                                {Math.trunc(item.discount_price)}{' '}
                                {item.discount_type === 'percent' ? '%' : ''}
                            </p>
                        </div>
                    )}
                    <div className="h-[80px]  absolute opacity-0 group-hover:opacity-100 bottom-0 left-[50%] translate-x-[-50%] translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 lg:cursor-pointer gap-4  ">
                        <div
                            className="rounded-full border-4 border-white h-12 w-12 flex justify-center items-center search-bg hover:bg-blue-300 duration-300"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineSearch className="text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white pb-5">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div>
                            <div className="flex justify-center bg-[#F4F4F4] py-3">
                                <h2 className="text-xl text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                    {item?.name}
                                </h2>
                            </div>

                            <div className="text-gray-600 text-lg font-semibold flex flex-wrap items-center gap-1 px-5 pt-2 justify-center">
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

                    <div className="flex justify-center pt-2 ">
                        <button
                            className="border py-2 px-4 rounded-lg search-bg hover:bg-blue-300 duration-300"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card35;
