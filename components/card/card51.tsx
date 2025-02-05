'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { TbLiveView } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card51 = ({ item }: any) => {

    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

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

    const bgColor = "var(--header-color)";
    const textColor = "var(--text-color)";

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color-price {
        color:  ${bgColor};
        border: 2px solid ${bgColor};
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

  `;

    return (
        <div className="">
            <div className="group relative">
                <style>{styleCss}</style>

                <div className="relative overflow-hidden w-full image-div rounded-2xl">
                    <img
                        src={productImg + item.image[id]}
                        alt=""
                        className="h-auto min-w-full hover:scale-110 transform transition duration-[2000ms] ease-linear"
                    />

                    <div className="flex flex-wrap justify-around text-sm w-full lg:absolute lg:group-hover:bottom-2 lg:-bottom-20 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] mt-2 lg:mt-0">
                        {productAvailablity && (
                            <div
                                onClick={handleAddToCart}
                                className="bg-black text-white px-2 py-1 rounded-full flex gap-1 items-center lg:cursor-pointer"
                            >
                                <FaCartPlus />
                                <p className="">{'Add to Cart'}</p>
                            </div>
                        )}
                        <div
                            onClick={() => setOpen(!open)}
                            className="bg-white text-black px-2 py-1 rounded-full flex gap-1 items-center lg:cursor-pointer"
                        >
                            <TbLiveView />
                            <p>Quick View</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-4 py-3">
                    <div className="flex flex-wrap gap-x-3">
                        {item?.image?.map((data: any, index: any) => (
                            <div key={index}>
                                {item.image.length > 1 ? (
                                    <button
                                        onClick={() => setId(index)}
                                        className={`${
                                            id === index
                                                ? 'bg-color h-4 w-4 '
                                                : 'bg-gray-200 h-3 w-3 '
                                        } ring-1 ring-offset-1 ring-gray-800 rounded-full `}
                                    ></button>
                                ) : (
                                    ' '
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-gray-800 text-lg font-bold">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {' '}
                            <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                {item?.name}
                            </h1>{' '}
                        </Link>
                    </div>

                    <div className="text-gray-600 font-semibold flex justify-between items-center gap-2 w-full ">
                        <div className="flex items-center gap-2">
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
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card51;
