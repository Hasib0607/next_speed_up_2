'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import {
    addToCart,
    handleDecrement,
    handleIncrement,
    isActiveCart,
} from '@/utils/_cart-utils/cart-utils';
import QuickView from '@/utils/quick-view';
import {
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Details from '../_product-details-page/components/details';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';

const Card50 = ({ item }: any) => {
    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const bgColor = "var(--header-color)";
    const textColor = "var(--text-color)";

    const cardShadow = `
   .cardShadow{
    -moz-box-shadow: 0 0 5px #888;
    -webkit-box-shadow: 0 0 5px#888;
    box-shadow: 0 0 5px #888;
    }
    .card-fifty:hover{
        background: ${bgColor};
        color: ${textColor};
    }
    .quick-fifty{
        background: ${bgColor};
        color: ${textColor};
        opacity: 0.7;
    }
    .quick-fifty:hover{
        background: ${textColor};
        color: ${bgColor};
        opacity: 1;
    }
   `;

    return (
        <>
            <div className="bg-white relative rounded-lg overflow-hidden card-fifty hover:bg-opacity-100 border shadow-xl group transition-all duration-300 ease-linear h-full flex flex-col">
                <style>{cardShadow}</style>
                {!productAvailablity && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-80 z-[2]"></div>
                )}
                <div className="w-full relative overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            className="min-w-full h-auto bg-white"
                            src={productImg + item?.image[0]}
                            alt=""
                        />
                    </Link>
                    {save > 0 && (
                        <div className="absolute z-[3] top-2 right-2 bg-[#ff576d] px-[5px] py-[2px] h-[22px] rounded-md text-white flex justify-center items-center text-xs font-semibold">
                            Save{' '}
                            {item?.discount_type === 'fixed' && (
                                <BDT price={save} />
                            )}
                            {item?.discount_type === 'percent' &&
                                `${item?.discount_price}%`}
                        </div>
                    )}
                    {numberParser(item?.quantity) == 0 && (
                        <div className="absolute top-2 z-[3] right-2 bg-[#ff576d] px-[7px] py-[2px] h-[22px] rounded-md text-white flex justify-center items-center text-xs font-semibold">
                            Out Of Stock
                        </div>
                    )}
                    <button
                        onClick={() => setOpen(true)}
                        className="absolute -bottom-3 translate-y-6 group-hover:translate-y-0 transition-all duration-300 ease-linear left-0 right-0 mx-auto rounded-t-md px-1 font-semibold text-md pb-3 hover:bg-opacity-90 text-md flex justify-center items-center gap-x-1 shadow-4xl quick-fifty"
                    >
                        Quick View
                    </button>
                </div>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="py-2 px-2">
                        <h4 className="font-semibold text-[14px] xl:text-[15px] lg:text-[15px] md:text-[14px] whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h4>
                    </div>
                </Link>
                {/* show unit range in card bottom */}
                {item?.variant?.length > 0 &&
                    (() => {
                        const volumes = item.variant.map((v: any) => v.volume);
                        const minVolume = Math.min(...volumes);
                        const maxVolume = Math.max(...volumes);

                        return minVolume === 0 && maxVolume === 0 ? null : (
                            <div className="px-2">
                                <p>
                                    <b>Unit:</b> {minVolume} - {maxVolume}{' '}
                                    {item.variant[0]?.unit}
                                </p>
                            </div>
                        );
                    })()}

                <div className="text-[13px] px-2 flex items-center gap-2">
                    <div className="text-sm sm:text-base font-semibold">
                        <BDT />
                        {price}
                    </div>
                    {save > 0 && (
                        <p className="line-through text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                </div>

                <div className="flex flex-col justify-end py-3 px-2">
                    <div className="">
                        <AddToCart
                            item={item}
                            open={open}
                            setOpen={setOpen}
                            price={price}
                        />
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </>
    );
};

export default Card50;

const AddToCart = ({ item, open, setOpen, price }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [product, setProduct] = useState<any>(null);

    const productAvailablity = isAvailable(item);

    useEffect(() => {
        const result = cartList.find((i: any) => i?.id === item?.id);

        setProduct(result);
    }, [cartList, item.id]);

    const hasInCartList = useMemo(
        () => isActiveCart(item, cartList),
        [item, cartList]
    );

    // only without variant product added to cart
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
        <div className="flex justify-between items-center">
            <div
                className={`${
                    item?.quantity == '0'
                        ? 'rounded-full border relative z-[3] border-red-500 text-red-500 font-semibold test-base hover:border-red-500  hover:bg-red-500 hover:text-white hover:stroke-white transition-all ease-linear'
                        : 'rounded-full border card-fifty '
                }`}
            >
                {hasInCartList ? (
                    <div className="flex items-center lg:cursor-pointer h-[22px] w-[94px] justify-between">
                        <div
                            onClick={() => handleDecrement(dispatch, product)}
                            className="max-w-[18px] w-full border-r h-full flex justify-center items-center"
                        >
                            <MinusIcon className="h-2 w-2  stroke-1 " />
                        </div>
                        <div className="flex flex-1  h-full justify-center items-center">
                            <p className="font-semibold text-xs">
                                {product?.qty}
                                {'  '} in cart
                            </p>
                        </div>
                        <div
                            onClick={() => handleIncrement(dispatch, product)}
                            className="max-w-[18px] w-full h-full border-l flex justify-center items-center"
                        >
                            <PlusIcon className="h-2 w-2  stroke-1 " />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 lg:cursor-pointer px-2">
                        {!productAvailablity ? (
                            <button
                                type="button"
                                disabled
                                className="cursor-not-allowed text-sm"
                            >
                                Out Of Stock
                            </button>
                        ) : (
                            <button
                                className="flex gap-2"
                                onClick={() => handleAddToCart()}
                            >
                                <ShoppingBagIcon className="h-4 w-4 font-bold" />
                                <p className=" font-bold text-sm">Cart</p>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
