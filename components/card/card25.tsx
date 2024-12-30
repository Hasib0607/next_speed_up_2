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

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card25 = ({ item }: any) => {
    const [open, setOpen] = useState(false);

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const { cartList } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
    }
  
  }
  `;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

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
        <div>
            <div className="group border-hover border-[1px] rounded-lg overflow-hidden w-full relative">
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                            <p className="bg-blue-600 text-white px-2 py-1 w-max absolute right-0 rounded-bl-lg">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                <style>{styleCss}</style>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto lg:group-hover:opacity-10 min-w-full"
                        />
                    </div>
                </Link>

                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="w-full text-gray-500 text-sm sm:text-lg font-medium flex justify-center py-6 lg:group-hover:-translate-y-40 capitalize px-2">
                        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                            {item?.name}
                        </h1>
                    </div>
                </Link>

                <div className="text-gray-600 text-lg font-semibold flex items-center gap-2 w-full justify-center pb-6 lg:group-hover:-translate-y-10 duration-700 lg:absolute bottom-0 left-[50%] lg:translate-x-[-50%]">
                    {priceLineThrough ? (
                        <p className="line-through text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    ) : null}
                    <div className="text-base font-semibold">
                        <BDT />
                        {price}
                    </div>
                </div>

                <div className="relative overflow-hidden h-10 mb-2 mx-[10px] hidden lg:block">
                    <div className=" lg:cursor-pointer text-sm group-hover:translate-x-[100%] duration-1000 gap-1 bg-blue-400 text-black px-10 py-2 absolute -left-[100%] bottom-0 h-10 w-full z-[1] "></div>
                    <div className=" lg:cursor-pointer text-sm group-hover:translate-x-[100%] duration-200 gap-1 bg-red-400 text-black absolute  bottom-0 -left-[100%] h-10 w-full "></div>
                    <div className="searchHover lg:cursor-pointer text-sm group-hover:translate-x-[-100%] duration-200 gap-1 text-center w-full py-2 absolute  -right-[100%] bottom-0 h-10 z-50">
                        <p className="font-medium" onClick={handleAddToCart}>
                            ADD IN CART
                        </p>
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card25;
