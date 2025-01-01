'use client';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import { useState } from 'react';

import { BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import Details from '../_product-details-page/components/details';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { numberParser } from '@/helpers/numberParser';

const Card47 = ({ item, stopAutoplay }: any) => {
    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

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
        background: white;
        border: 1px solid ${bgColor};
    }
   
    .view-eye:hover .quick-view {
        display: block;
        background: white;
      }
    .image-div:hover .image-hover {
        display: none;
       
      }
    .image-div:hover .image-hover-two {
        display: block;
      }

  `;

    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);
    const category = item?.category || [];

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);

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
        <div className="">
            <div className="group relative">
                <style>{styleCss}</style>
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max">
                                Out of Stock
                            </p>
                        </div>
                    </Link>
                )}

                <div className="relative overflow-hidden w-full image-div">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item.image[id]}
                            alt=""
                            className="h-auto min-w-full image-hover block  lg:hover:scale-110 transform transition duration-[2000ms] ease-linear"
                        />
                    </Link>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <img
                            src={productImg + secondImg}
                            alt=""
                            className="h-auto min-w-full image-hover-two hidden lg:hover:scale-110 transform transition duration-[2000ms] ease-linear"
                        />
                    </Link>
                    <div onClick={() => setOpen(!open)} className="view-eye">
                        <div className="w-10 h-10 rounded-full lg:cursor-pointer bg-white text-black searchHover flex justify-center items-center absolute  duration-500 group-hover:right-2 -right-16 top-4 z-[1]">
                            <BsEye className="text-xl text-center" />
                        </div>
                        <p className="quick-view lg:cursor-pointer hidden text-sm bg-white pl-4 pr-10 py-2.5 rounded-full absolute right-4 top-4 ">
                            Quick View
                        </p>
                    </div>
                    <div
                        onClick={handleAddToCart}
                        className="w-full lg:absolute lg:group-hover:bottom-0 lg:-bottom-20 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1]"
                    >
                        <p className="w-full text-center cart-btn duration-500 border border-transparent lg:cursor-pointer text-base font-bold py-2">
                            ADD TO CART
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 px-4 py-3">
                    <Link href={'/category/' + item?.category_id}>
                        {' '}
                        {Array.isArray(category) && category?.length > 0 && (
                            <p className="text-xs uppercase font-bold text-center">
                                <ProdMultiCategory
                                    category={category}
                                    className={'text-gray-500'}
                                    count={1}
                                />
                            </p>
                        )}
                    </Link>
                    <div className="text-gray-700 text-sm font-extralight">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                {item?.name}
                            </h1>
                        </Link>
                    </div>

                    <div className="text-gray-600 font-semibold flex flex-wrap justify-center items-center gap-2 w-full ">
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

                    <div className="flex flex-wrap gap-x-3 gap-y-3">
                        {item?.image?.map((data: any, index: number) => (
                            <div key={index}>
                                {item.image.length > 1 ? (
                                    <div
                                        onClick={() => {
                                            setId(index);
                                            stopAutoplay();
                                        }}
                                        className={`${
                                            id === index
                                                ? 'bg-color'
                                                : 'bg-gray-200'
                                        } h-2 w-2 sm:h-4 sm:w-4 ring-1 ring-offset-2 ring-gray-800 rounded-full lg:cursor-pointer`}
                                    ></div>
                                ) : (
                                    ' '
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card47;
