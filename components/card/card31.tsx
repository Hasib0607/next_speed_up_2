'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuickView from '@/utils/quick-view';

import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { numberParser } from '@/helpers/numberParser';
import BDT from '@/utils/bdt';
import Details from '../_product-details-page/components/details';

const Card31 = ({ item }: any) => {
    const dispatch = useDispatch();

    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const [open, setOpen] = useState(false);

    const styleCss = `
    .search-bg{
        background: ${design?.header_color} ;
        color : white ;
    } 
  `;

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

    return (
        <div className="group flex flex-col justify-between bg-white relative">
            <style>{styleCss}</style>
            {/* out of stock  */}
            {!productAvailablity && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max">
                            Out of Stock
                        </p>
                    </div>
                </Link>
            )}
            <div className=" w-full h-full overflow-hidden">
                {/* image  */}
                <div className="flex justify-center relative overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item?.image[0]}
                            className="block h-auto min-w-[100%] group-hover:scale-125  transition-all duration-700 ease-linear group-hover:rotate-6"
                            alt=""
                        />
                    </Link>
                    {productAvailablity && save > 0 && (
                        <div
                            className="absolute text-xs px-2  py-2 top-2 right-2 rounded-md"
                            style={{
                                background: `${design?.header_color}`,
                                color: `${design?.text_color}`,
                            }}
                        >
                            <p>
                                Save{' '}
                                {item.discount_type === 'fixed' ? 'BDT' : ''}{' '}
                                {numberParser(item.discount_price)}{' '}
                                {item.discount_type === 'percent' ? '%' : ''}
                            </p>
                        </div>
                    )}
                    <div className="h-[80px]  absolute opacity-0 group-hover:opacity-100 bottom-0 left-[50%] translate-x-[-50%] translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 lg:cursor-pointer gap-4  ">
                        <div
                            className="rounded-full border-4 border-white h-12 w-12 flex justify-center items-center search-bg hover:bg-blue-300 duration-300"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineSearch className="text-xl" />
                        </div>
                    </div>
                </div>
                {/* details  */}
                <div className="py-5">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div>
                            <div className="flex justify-center">
                                <h2 className="md:text-xl text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                    {item?.name}
                                </h2>
                            </div>
                            <div className="text-gray-600 text-lg font-semibold flex flex-wrap gap-1 px-5 pt-2 justify-center items-center">
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
                            <div className="flex justify-center items-center gap-x-1 pt-2">
                                <div>
                                    <Rate rating={parsedRating} />
                                </div>
                                <div className="text-gray-500 sm:text-sm text-xs">
                                    ({parsedNumberRating})
                                </div>
                            </div>
                        </div>
                    </Link>
                    {productAvailablity ? (
                        <div
                            onClick={handleAddToCart}
                            className="flex justify-center pt-2 "
                        >
                            <p className="border py-2 px-4 rounded-lg search-bg hover:bg-blue-300 duration-300 lg:cursor-pointer">
                                Add to Cart
                            </p>
                        </div>
                    ) : (
                        <div className="flex justify-center pt-2 ">
                            <p className="border py-2 px-4 rounded-lg search-bg hover:bg-blue-300 duration-300 lg:cursor-pointer">
                                Out of Stock
                            </p>
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

export default Card31;
