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
import { IoIosEye } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card38 = ({ item }: any) => {
    const dispatch = useDispatch();

    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const [open, setOpen] = useState(false);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
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
            <div className="group relative overflow-hidden">
                <style>{styleCss}</style>

                <div className="relative overflow-hidden">
                    <img
                        src={productImg + item.image[0]}
                        alt=""
                        className="h-auto min-w-full object-cover"
                    />

                    <div
                        onClick={() => setOpen(!open)}
                        className="top-3 right-3 opacity-0 group-hover:opacity-100 h-10 w-10 rounded-full items-center lg:cursor-pointer bg-white searchHover flex justify-center absolute duration-500"
                    >
                        <IoIosEye className="text-lg text-center" />
                    </div>
                </div>

                <div className="flex flex-col gap-3 py-3 justify-center items-center">
                    <div className="text-gray-700 text-base font-bold card-text-color">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                {item?.name}
                            </h1>{' '}
                        </Link>
                    </div>

                    <div className="text-sm font-semibold text-black flex items-center gap-2">
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

                    <div onClick={handleAddToCart} className="">
                        <p className=" font-medium border px-3 py-1 w-max lg:cursor-pointer border-hover searchHover duration-500">
                            {'Add to Cart'}
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

export default Card38;
