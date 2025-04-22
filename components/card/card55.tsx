'use client';

import shape from '@/assets/img/shape.png';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';

import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import { numberParser } from '@/helpers/numberParser';
import ProdMultiCategory from '@/utils/prod-multi-category';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card55 = ({ item }: any) => {
    const category = item?.category || [];

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const parsedNumberRating = numberParser(item?.number_rating);
    const parsedRating = numberParser(item?.rating, true);

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

    const vPrice = item?.variant
        ? item?.variant?.map((item: any) => item?.additional_price ?? 0)
        : [0];

    const smallest = Math.min(...vPrice);
    const largest = Math.max(...vPrice);

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color-thirty {
        color:  ${bgColor};
    }
    .text-hover:hover {
        color: ${bgColor};
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
      .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: 0;
      }
      .overlay-group:hover .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: .5;
      }

  `;

    return (
        <div className="group overlay-group relative">
            {/* out of stock  */}
            {!productAvailablity && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                            Sold Out
                        </p>
                    </div>
                </Link>
            )}
            <div className="">
                <style>{styleCss}</style>
                <div className="mt-5 relative overflow-hidden">
                    <div className="relative overflow-hidden w-full ">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <img
                                src={productImg + item.image[0]}
                                alt=""
                                className="h-auto min-w-full"
                            />
                        </Link>
                        {save > 0 && (
                            <div className="h-10 absolute top-2 right-2 z-[2]">
                                <img
                                    src={shape.src}
                                    alt=""
                                    className="h-full"
                                />
                                <p className="text-[11px] text-white absolute top-2 left-3 leading-[12px]">
                                    {item.discount_type === 'fixed' && <BDT />}{' '}
                                    {Math.trunc(item.discount_price)}{' '}
                                    {item.discount_type === 'percent' &&
                                        '% off'}
                                </p>
                            </div>
                        )}
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="lg:absolute card-overlay-thirty lg:z-[1] lg:group-hover:w-full w-1/2 h-full left-0 bottom-0 duration-700"></div>
                        </Link>
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="lg:absolute lg:group-hover:bottom-0 lg:-bottom-5 duration-700 lg:opacity-0 w-full z-[2] lg:group-hover:opacity-100 bg-black text-white searchHover flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer"
                            >
                                <p className="lg:scale-0 lg:group-hover:scale-100 duration-700 ">
                                    {'Add to Cart'}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 px-4 py-3">
                        <div>
                            {Array.isArray(category) &&
                                category?.length > 0 && (
                                    <p className="uppercase text-xl">
                                        <ProdMultiCategory
                                            category={category}
                                            className={'text-gray-500'}
                                            count={1}
                                        />
                                    </p>
                                )}
                        </div>
                        <div className="font-bold text-lg flex justify-between items-center flex-wrap">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                {' '}
                                <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                    {item?.name}
                                </h1>{' '}
                            </Link>
                            <div className="flex gap-x-1 items-center">
                                <div>
                                    <Rate rating={parsedRating} />
                                </div>
                                <div className="text-gray-500 sm:text-sm text-xs">
                                    ({parsedNumberRating})
                                </div>
                            </div>
                        </div>
                        <div>
                            {item?.variant?.length !== 0 && (
                                <div className="flex items-center gap-1">
                                    <p className="text-color text-sm font-bold">
                                        <BDT />
                                        {price + smallest}
                                    </p>
                                    {largest > smallest && (
                                        <p className="text-color text-sm font-bold">
                                            - <BDT />
                                            {price + largest}
                                        </p>
                                    )}
                                </div>
                            )}
                            {item?.variant?.length === 0 && (
                                <div className="flex justify-start items-center gap-x-4">
                                    <div className="text-color text-sm font-bold flex justify-start items-center gap-4">
                                        <div className="text-sm py-1 rounded-lg">
                                            <BDT />
                                            {price}
                                        </div>
                                        {save > 0 && (
                                            <p className="text-gray-500 font-thin line-through text-sm font-seven">
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
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* for modal open  */}
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card55;
