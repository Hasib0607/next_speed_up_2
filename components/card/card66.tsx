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

import parse from 'html-react-parser';
import Link from 'next/link';
import { useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card66 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
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
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: transparent;
        border: 1px solid ${bgColor};
    }
  `;

    return (
        <div className="bg-white relative rounded-md overflow-hidden">
            {save > 0 && (
                <div className="absolute top-3 left-0 bg-[#6E2594] text-white z-[2] px-2 py-1 rounded-r-full text-xs">
                    Save: {save} BDT
                </div>
            )}
            <div className="">
                <style>{styleCss}</style>
                {/* out of stock  */}
                {!productAvailablity && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                Out of Stock
                            </p>
                        </Link>
                    </div>
                )}
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover border-b-2"
                        />
                    </div>
                </Link>

                <div className="text-gray-700 text-base sm:px-5 px-2 py-3">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h1 className="hover:text-red-500 hover:underline text-sm sm:text-[15px] capitalize font-bold">
                            {item?.name}
                        </h1>
                    </Link>
                </div>

                <div className="apiHtml pb-24 px-2 sm:px-5 text-[13px] text-gray-500">
                    {parse(`${item?.description?.slice(0, 100)}`)}{' '}
                    {item?.description?.length > 100 && (
                        <span className="">...</span>
                    )}
                </div>

                <div className="font-semibold absolute bottom-5 sm:px-5 px-2 w-full group-hover:opacity-0 duration-500">
                    <div className="flex items-center justify-center gap-2 ">
                        <div className="text-sm text-red-500">
                            <BDT />
                            {price}
                        </div>
                        {save > 0 && (
                            <p className="line-through text-gray-500 text-xs">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                    {productAvailablity && (
                        <div
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-x-2 bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white duration-500 py-1 mt-2"
                        >
                            <HiShoppingCart className="text-xl" />
                            <button>Buy Now</button>
                        </div>
                    )}
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card66;
