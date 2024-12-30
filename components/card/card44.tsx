'use client';

import { productImg } from '@/site-settings/siteUrl';

import BDT from '@/utils/bdt';
import Link from 'next/link';

import { useState } from 'react';
import QuikView from '../../utils/quick-view';
import Details from '../_product-details-page/components/details';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useDispatch, useSelector } from 'react-redux';

const Card44 = ({ item }: any) => {
    const dispatch = useDispatch();

    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const [open, setOpen] = useState(false);

    const styleCss = `
    .searchHover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .card-text-color:hover {
        color:  ${design?.header_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
    }
  `;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

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
        <div>
            <div className="group relative overflow-hidden">
                <style>{styleCss}</style>
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                <div className="relative overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-cover"
                        />
                    </Link>
                    <div
                        onClick={() => setOpen(!open)}
                        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-color items-center lg:cursor-pointer bg-white flex justify-center absolute duration-500"
                    >
                        <button className="md:px-8 px-5 py-3 font-semibold hover:bg-gray-300 bg text-sm">
                            Quick View
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3 py-3 justify-center items-center">
                    <div className="text-gray-700 text-base font-bold card-text-color ">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                {item?.name}
                            </h1>{' '}
                        </Link>
                    </div>

                    <div className="text-sm font-semibold text-black flex items-center gap-2">
                        {priceLineThrough ? (
                            <p className="line-through text-gray-400">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        ) : null}
                        <p className="">
                            <BDT price={price} />{' '}
                        </p>
                    </div>

                    <div
                        onClick={handleAddToCart}
                        className="font-medium border px-3 py-2 w-max lg:cursor-pointer border-hover searchHover duration-500"
                    >
                        {'ADD TO CART'}
                    </div>
                </div>
            </div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card44;
