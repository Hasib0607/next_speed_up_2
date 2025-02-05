'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GiShoppingBag } from 'react-icons/gi';
import Details from '../_product-details-page/components/details';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Card32 = ({ item }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);

    const bgColor = "var(--header-color)";
    const textColor = "var(--text-color)";

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${bgColor};
    }
    .text-hover:hover {
        color:  ${bgColor};
    }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-color {
        color:  ${bgColor};
        border-bottom: 2px solid ${bgColor};
    }
    .border-hover:hover {
        border: 1px solid ${bgColor};
       
    }
  `;

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

    return (
        <div className="relative">
            {/* out of stock  */}
            {!productAvailablity && (
                <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                    <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                        Sold Out
                    </p>
                </div>
            )}
            <div className="group grid md:grid-cols-3 grid-cols-1 md:gap-8 pb-10 pt-6">
                <style>{styleCss}</style>

                <div className="relative overflow-hidden col-span-1">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item?.image[id]}
                            alt=""
                            className="max-h-[600px] md:h-auto min-w-full"
                        />
                    </Link>

                    {save > 0 && (
                        <div className="absolute text-xs px-2 py-1 bg-color text-white top-2 right-2 ">
                            <p>
                                - {item.discount_type === 'fixed' ? 'BDT' : ''}{' '}
                                {Math.trunc(item?.discount_price)}{' '}
                                {item?.discount_type === 'percent' ? '%' : ''}
                            </p>
                        </div>
                    )}
                </div>

                <div className="col-span-2 flex flex-col gap-4 pt-6 md:pt-0">
                    <div className="text-gray-700 text-xl font-medium">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="capitalize text-hover whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                {item?.name}
                            </h1>
                        </Link>
                    </div>

                    <div className="text-gray-600  font-semibold flex items-center gap-2 w-full ">
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

                    <div className="flex gap-3">
                        {item?.image?.map((data: any, index: any) => (
                            <div key={index}>
                                {item.image.length > 1 ? (
                                    <button
                                        onClick={() => setId(index)}
                                        className={`${
                                            id === index
                                                ? 'bg-blue-600'
                                                : 'bg-gray-200'
                                        } h-3 w-3 rounded-full `}
                                    ></button>
                                ) : (
                                    ' '
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-5 items-center">
                        <div
                            onClick={() => setOpen(!open)}
                            className="w-max lg:cursor-pointer bg-white searchHover py-3 px-3 drop-shadow-2xl"
                        >
                            <BiSearch className="text-2xl text-center" />
                        </div>
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="w-max lg:cursor-pointer bg-white searchHover py-3 px-3 drop-shadow-2xl"
                            >
                                <GiShoppingBag className="text-2xl text-center" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
            <hr />
        </div>
    );
};

export default Card32;
