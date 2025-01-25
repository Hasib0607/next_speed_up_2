'use client';

import './product-card-two.css';
import BDT from '@/utils/bdt';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoEyeSharp } from 'react-icons/io5';
import { productImg } from '@/site-settings/siteUrl';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useMemo, useState } from 'react';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import {
    addToCart,
    handleDecrement,
    isActiveCart,
} from '@/utils/_cart-utils/cart-utils';
import { numberParser } from '@/helpers/numberParser';
import QuickView from '@/utils/quick-view';
import Details from '@/components/_product-details-page/components/details';

const ProductCardTwo = ({ item }: any) => {
    const home = useSelector((state: RootState) => state.home);
    const { design } = home || {};

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<any>(null);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const hasInCartList = useMemo(
        () => isActiveCart(item, cartList),
        [item, cartList]
    );

    const handleAddToCart = () => {
        addToCart({
            dispatch,
            product: item,
            cartList,
            price,
            qty: 1,
            productQuantity: item?.quantity,
        });
    };

    useEffect(() => {
        const result = cartList?.find((i: any) => i?.id === item?.id);
        setProduct(result);
    }, [cartList, item, product]);

    return (
        <>
            <div
                className="cardHover pb-6 rounded-xl hover:shadow-lg border border-gray-200 shadow-sm  bg-white relative"
                style={{ width: '240px' }}
            >
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                <div className="block relative rounded overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            alt="ecommerce"
                            className="w-full rounded-xl hover:rounded-sm hover:scale-105 transition-all duration-500 ease-linear object-cover p-5"
                            src={productImg + item?.image[0]}
                        />
                    </Link>
                    <div className="w-full">
                        <button
                            style={{
                                backgroundColor: design?.header_color,
                                color: design?.text_color,
                            }}
                            onClick={() => setOpen(!open)}
                            className="absolute -bottom-2 left-2 right-2 mx-auto rounded-t-md px-1 quick font-normal text-md pb-2 text-black text-md flex justify-center items-center gap-x-1 shadow-4xl"
                        >
                            <IoEyeSharp color={design?.text_color} />
                            Quick Views
                        </button>
                    </div>
                </div>
                <div className="space-y-1 mt-2">
                    <h3 className="text-gray-900 text-lg mb-1 text-center px-2 -tracking-wider">
                        {' '}
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {item?.name?.length > 25
                                ? item?.name?.slice(0, 20) + '...'
                                : item?.name}
                        </Link>
                    </h3>
                    {/* show unit range in card bottom */}
                    <div className="text-center">
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
                                            {maxVolume} {item.variant[0]?.unit}
                                        </p>
                                    </div>
                                );
                            })()}
                    </div>
                    <p className=" text-center text-lg font-semibold text-black">
                        &#2547; {price}
                    </p>
                    {save > 0 && (
                        <p className="text-center line-through text-sm text-black">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}

                    {hasInCartList ? (
                        <div
                            className="mx-auto px-3 py-1 rounded-md shadow-sm flex justify-between text-black w-40 items-center"
                            style={{ backgroundColor: design?.header_color }}
                        >
                            <AiOutlineMinus
                                color={design?.text_color}
                                onClick={() =>
                                    handleDecrement(dispatch, product)
                                }
                                className="text-2xl lg:cursor-pointer"
                            />
                            <span
                                className="text-xl"
                                style={{ color: design?.text_color }}
                            >
                                {product?.qty}
                            </span>
                            <AiOutlinePlus
                                color={design?.text_color}
                                onClick={handleAddToCart}
                                className="text-2xl lg:cursor-pointer "
                            />
                        </div>
                    ) : item?.variant?.length == 0 ? (
                        <div
                            onClick={handleAddToCart}
                            className="mx-auto px-2 py-1 rounded-md shadow-sm flex justify-between text-black w-40 items-center lg:cursor-pointer "
                            style={{
                                backgroundColor: design?.header_color,
                                color: design?.text_color,
                            }}
                        >
                            <p className="text-center w-full text-lg tracking-wider">
                                Add to cart
                            </p>
                        </div>
                    ) : (
                        <Link
                            href={'/product/' + item?.id + '/' + item?.slug}
                            className="mx-auto px-2 py-1 rounded-md shadow-sm flex justify-between text-black w-40 items-center lg:cursor-pointer "
                            style={{
                                backgroundColor: design?.header_color,
                                color: design?.text_color,
                            }}
                        >
                            <p className="text-center w-full text-lg tracking-wider">
                                Add to cart
                            </p>
                        </Link>
                    )}
                </div>
            </div>

            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </>
    );
};

export default ProductCardTwo;
