'use client';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';

import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuikView from '@/utils/quick-view';

import Rate from '@/utils/rate';

import Link from 'next/link';
import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import Details from '../_product-details-page/components/details';
import BDT from '@/utils/bdt';

const Card6 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};
    const store_id = store?.id || null;
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .text-hover:hover {
      color:  ${bgColor};
  }
  .search-icon:hover {
    color:${textColor};
    background:${bgColor};
  }
  .card-border-6:hover {
    border: 1px solid ${bgColor};
  }
    `;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const parsedRating = numberParser(item?.number_rating, true);

    const handleAddToCart = () => {
        if(item?.variant?.length > 0){
            setOpen(!open)
        }else{
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
        <div className="flex border border-gray-100 card-border-6 w-full relative group">
            <style>{styleCss}</style>
            <div className="p-4">
                <div className="relative">
                    <img
                        className="max-h-60 w-auto"
                        src={productImg + item?.image[0]}
                        alt=""
                    />
                    <p className="absolute top-2 left-2 bg-black py-1 px-2 rounded-md text-xs text-white sm:block hidden">
                        NEW
                    </p>
                    <div
                        onClick={() => setOpen(!open)}
                        className="bg-white hidden border border-gray-300 rounded-full h-10 w-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:flex  items-center justify-center search-icon font-thin lg:cursor-pointer"
                    >
                        <IoSearchCircleOutline className=" h-4" />
                    </div>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3 col-span-2 lg2:col-span-3">
                <p className="text-sm text-gray-400 uppercase menu-hover">
                    {item.category}
                </p>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <h1 className="text-md text-hover font-bold text-gray-700 menu-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                        {item?.name}
                    </h1>
                </Link>
                <div className="flex flex-col">
                    <div className="flex gap-x-1">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({parsedRating})
                        </div>
                    </div>
                    <div className="text-xl text-gray-500 flex items-center gap-2">
                        <div className="text-base font-semibold">
                            <BDT />
                            {price}
                        </div>
                        {priceLineThrough ? (
                            <p className="line-through text-gray-400">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        ) : null}
                    </div>
                </div>
                <div>
                    <p
                        onClick={handleAddToCart}
                        className="lg:cursor-pointer w-max text-hover text-sm font-bold text-gray-700 border-b-2 pb-1 border-black border-color menu-hover border-hover-bottom"
                    >
                        {store_id === 2669 ? 'Buy Now' : 'ADD TO CART'}
                    </p>
                </div>
            </div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card6;
