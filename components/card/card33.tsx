'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Rate from '@/utils/rate';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card33 = ({ item }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [open, setOpen] = useState(false);

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const styleCss = `
    .search-bg{
        background: ${bgColor} ;
        color : white ;
    } 
  `;

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

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
        <div className="group flex flex-col justify-between bg-white px-2 pt-3 pb-16 lg:pb-0">
            <style>{styleCss}</style>
            <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 w-full h-full  overflow-hidden ">
                <div className=" bg-white  ml-3 ">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <div className="flex justify-start">
                            <h2 className="text-3xl text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[250px] max-w-[250px]">
                                {item?.name}
                            </h2>
                        </div>
                    </Link>
                    <div className="flex justify-start items-center gap-x-1 pt-4">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({parsedNumberRating})
                        </div>
                    </div>
                    <div className="text-gray-600 text-lg font-semibold flex flex-wrap items-center gap-2 pt-4 justify-start ">
                        <div className="text-base font-semibold">
                            <BDT />
                            {price}
                        </div>
                        {save > 0 && (
                            <p className="line-through text-gray-400">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                    {productAvailablity && (
                        <div className="flex justify-start lg:mt-44 mt-3">
                            <button
                                className="border py-2 px-8 rounded-lg flex items-center gap-2 search-bg hover:bg-blue-300 duration-300"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCartIcon height={15} width={15} /> Add
                                to Cart
                            </button>
                        </div>
                    )}
                </div>

                <div className="md:flex md:justify-center relative overflow-hidden order-first lg:order-last">
                    {/* out of stock  */}
                    {!productAvailablity && (
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                                <p className="bg-red-600 text-white px-2 py-1 w-max">
                                    Out of Stock
                                </p>
                            </div>
                        </Link>
                    )}

                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <img
                            src={productImg + item?.image[0]}
                            className="block h-auto min-w-full group-hover:scale-105  transition-all duration-300 ease-linear"
                            alt=""
                        />
                    </Link>
                    {save > 0 && (
                        <div
                            className="absolute text-xs px-2  py-2 top-3 right-2 rounded-md"
                            style={{
                                background: `${bgColor}`,
                                color: `${textColor}`,
                            }}
                        >
                            <p>
                                Save {item.discount_type === 'fixed' && <BDT />}{' '}
                                {numberParser(item.discount_price)}{' '}
                                {item.discount_type === 'percent' && '%'}
                            </p>
                        </div>
                    )}
                    <div className="h-[80px]  absolute opacity-0 group-hover:opacity-100 bottom-0 left-[50%] translate-x-[-50%] translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 lg:cursor-pointer gap-4  ">
                        <div
                            className="border-4 border-white h-12 w-12 flex justify-center items-center rounded-full search-bg hover:bg-blue-300 duration-300"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineSearch className="text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card33;
