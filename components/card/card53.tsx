'use client';

import { useState } from 'react';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import Rate from '@/utils/rate';
import Link from 'next/link';
import { BsEye } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

const Card53 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

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
        <div className="group pt-5 relative">
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
            <div className="relative overflow-hidden duration-500 lg:group-hover:pb-3 pb-3 lg:pb-0 py-0 group-hover:rounded-xl group-hover:0_0_10px_rgba(0,0,0,0.6)]">
                <style>{styleCss}</style>

                <div className="border-r mt-5 relative overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="relative overflow-hidden ">
                            <img
                                src={productImg + item?.image[0]}
                                alt=""
                                className="h-auto min-w-full"
                            />
                            <div className="absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 "></div>
                        </div>
                    </Link>
                    <div
                        onClick={() => setOpen(!open)}
                        className="bg-white text-black px-2 py-1 rounded-sm lg:cursor-pointer absolute top-4 -right-20 duration-500 group-hover:right-4 z-[1]"
                    >
                        <BsEye />
                    </div>

                    <div className="flex flex-col gap-2 px-4 py-3">
                        <div className="text-gray-800 text-sm font-medium">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                {' '}
                                <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                    {item?.name}
                                </h1>{' '}
                            </Link>
                        </div>
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-600 font-semibold flex justify-between items-center gap-2 w-full ">
                            <div className="flex items-center gap-2">
                                <div className="text-sm py-1 rounded-lg">
                                    <BDT />
                                    {price}
                                </div>
                                {productAvailablity && save > 0 && (
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
                    </div>
                </div>
                {productAvailablity && (
                    <div
                        onClick={handleAddToCart}
                        className="lg:opacity-0 mx-2 lg:group-hover:opacity-100 bg-black text-white flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer"
                    >
                        <FaCartPlus />
                        <p className="">Add to Cart</p>
                    </div>
                )}
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card53;
