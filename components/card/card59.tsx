'use client';

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
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card59 = ({ item }: any) => {
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
        text-decoration: underline;
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-thirty-three {  
        background: ${bgColor};
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
        <div className="group overlay-group relative px-2 border rounded-xl">
            {/* out of stock  */}
            {!productAvailablity && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute rounded-xl top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                            Sold Out
                        </p>
                    </div>
                </Link>
            )}
            <div className="">
                <style>{styleCss}</style>
                <div className="sm:mt-5 relative overflow-hidden">
                    <div className="relative overflow-hidden w-full sm:h-[200px] sm:p-5 p-1">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <img
                                src={productImg + item.image[0]}
                                alt=""
                                className="sm:h-full h-auto w-auto mx-auto"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 py-3 px-2">
                        <div className="font-medium flex justify-between items-center flex-wrap">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <h1 className="text-gray-700 text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[120px]">
                                    {item?.name}
                                </h1>
                            </Link>
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
                        <div className=" font-semibold flex flex-wrap justify-around items-center gap-2 w-full ">
                            <div className="flex items-center flex-col gap-2">
                                {productAvailablity && save > 0 && (
                                    <p className="line-through text-xs text-color-thirty">
                                        {' '}
                                        <BDT
                                            price={numberParser(
                                                item?.regular_price
                                            )}
                                        />
                                    </p>
                                )}
                                <div className="text-sm py-1 rounded-lg">
                                    <BDT />
                                    {price}
                                </div>
                            </div>
                            {productAvailablity && (
                                <div
                                    onClick={handleAddToCart}
                                    className="relative lg:cursor-pointer"
                                >
                                    <div
                                        style={{ color: bgColor }}
                                        className="flex px-2 py-2 justify-center gap-1 items-center relative z-[1]"
                                    >
                                        <AiOutlineShoppingCart />
                                        <p className="text-sm">Add</p>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: bgColor,
                                        }}
                                        className="left-0 top-0 opacity-30 w-full h-full rounded-lg absolute "
                                    ></div>
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

export default Card59;
