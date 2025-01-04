'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';
import Link from 'next/link';

import Details from '../_product-details-page/components/details';
import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { numberParser } from '@/helpers/numberParser';

const Card39 = ({ item }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
    const productAvailablity = isAvailable(item);

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
        <div className="group">
            <div className="relative border-1  ">
                <div className="w-full relative">
                    <span
                        className="absolute  text-white z-[1] p-1 text-sm top-3 left-3 pl-6 bottom-50 w-[80px]"
                        style={{ background: '#b1a554' }}
                    >
                        SALE
                    </span>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            className=" transition duration-150 ease-out group-hover:ease-in h-auto min-w-full"
                            src={productImg + item?.image[0]}
                            alt=""
                        />
                    </Link>

                    <div className="lg:absolute top-[50%] left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%]">
                        <div
                            className="lg:cursor-pointer -translate-y-14 group-hover:-translate-y-3 group-hover:opacity-100 opacity-0 duration-700 px-3 py-2 tracking-wider hover:bg-[#f7f3e3] bg-[#F1EBD1] text-[#2c291d] border border-black text-sm lg:block hidden"
                            onClick={() => setOpen(!open)}
                        >
                            QUICK VIEW
                        </div>
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="lg:cursor-pointer lg:translate-y-14 lg:group-hover:translate-y-3 duration-700 lg:group-hover:opacity-100 lg:opacity-0 py-2 px-3 tracking-wider hover:bg-[#f7f3e3] bg-[#F1EBD1] text-[#312e21] border border-black text-sm text-center"
                            >
                                ADD TO CART
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-2 justify-between">
                <div>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h6 className="text-xl  themeTextColor truncate">
                            {item?.name}
                        </h6>
                    </Link>
                </div>
                <div>
                    <div className="flex flex-wrap gap-y-2 ">
                        <div className="text-base font-semibold">
                            <BDT />
                            {price}
                        </div>
                        {priceLineThrough && (
                            <p className="line-through text-gray-400">
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

export default Card39;
