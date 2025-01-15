'use client';

import BDT from '@/utils/bdt';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuikView from '@/utils/quick-view';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { numberParser } from '@/helpers/numberParser';
import Details from '@/components/_product-details-page/components/details';
import ProdMultiCategory from '@/utils/prod-multi-category';

const Card19 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);
    const home = useSelector((state: RootState) => state.home);
    const { design } = home || {};

    const category = item?.category || [];

    const dispatch = useDispatch();

    const [open, setOpen] = useState<any>(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const parsedRating = numberParser(item?.rating, true);
    const parsedNumberRating = numberParser(item?.number_rating);

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
        <div className="group rounded-[20px] border hover:shadow-lg overflow-hidden relative">
            {/* out of stock  */}
            {!productAvailablity && (
                <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                    <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                        Sold Out
                    </p>
                </div>
            )}
            <div className="flex relative justify-center group-hover:overflow-hidden  ">
                <span className="absolute bg-gray-800 text-white z-50 p-2 text-sm rounded-tl-[20px] rounded-br-[20px] top-0 right-[380px] pl-6 bottom-50 w-[80px] left-0">
                    New
                </span>

                <img
                    src={productImg + item.image[0]}
                    alt="Mountain"
                    className="block rounded-[20px] p-2 h-auto min-w-[100%] mx-auto mt-auto group-hover:scale-105  transition-all duration-300 ease-linear"
                />
                <div
                    className="absolute top-1/2 -translate-y-1/2 rounded-xl hidden group-hover:flex h-[60px] px-3 left-1/2 -translate-x-1/2 justify-start items-center bg-white lg:cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <AiOutlineEye className="text-3xl" />
                </div>
            </div>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="mt-2">
                    <div className="p-5 bg-white ">
                        <h6
                            className="text-lg font-bold"
                            style={{
                                height: '30px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: '130px',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {item?.name}
                        </h6>
                        {Array.isArray(category) && category?.length > 0 && (
                            <p
                                className="text-sm"
                                style={{
                                    height: '30px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    width: '130px',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                <ProdMultiCategory
                                    category={category}
                                    className={'text-gray-500'}
                                    count={1}
                                    linkOff
                                />
                            </p>
                        )}
                        <Rate rating={parsedRating} />
                        <div className="flex justify-between">
                            <div className="flex gap-4 xl:gap-4 md:gap-4 lg:gap-4">
                                <div className="text-base font-semibold">
                                    <BDT />
                                    {price}
                                </div>
                                {save > 0 && (
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
                        </div>
                        {/* show unit range in card bottom */}
                        <div>
                            {item?.variant?.length > 0 &&
                                (() => {
                                    const volumes = item.variant.map(
                                        (v: any) => v.volume
                                    );
                                    const minVolume = Math.min(...volumes);
                                    const maxVolume = Math.max(...volumes);

                                    return minVolume === 0 &&
                                        maxVolume === 0 ? null : (
                                        <div className="">
                                            <p>
                                                <b>Unit:</b> {minVolume} -{' '}
                                                {maxVolume}{' '}
                                                {item.variant[0]?.unit}
                                            </p>
                                        </div>
                                    );
                                })()}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="py-6 flex justify-center">
                {productAvailablity && (
                    <div
                        className="rounded-lg py-2 px-6 lg:cursor-pointer w-[320px] font-bold flex gap-4 justify-center item-center"
                        onClick={handleAddToCart}
                        style={{
                            background: design?.header_color,
                            color: design?.text_color,
                        }}
                    >
                        {' '}
                        <AiOutlineShoppingCart className="mt-1 ml-2 xl:ml-0  text-base" />{' '}
                        Add To Cart{' '}
                    </div>
                )}
            </div>

            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card19;
