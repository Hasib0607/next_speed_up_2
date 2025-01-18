'use client';

import { productImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import ProdMultiCategory from '@/utils/prod-multi-category';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';

const Card42 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);
    const category = item?.category || [];

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
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

    const styleCss = `
  .text-hover:hover {
    color:  ${design?.header_color};
  }
  .search:hover {
    color:${design?.text_color};
    background:${design?.header_color};
  }
  .border-hover:hover {
    border: 1px solid  ${design?.header_color};
  }

  `;

    return (
        <>
            <div className="rounded overflow-hidden shadow-sm group border border-hover relative">
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

                <style>{styleCss}</style>
                <div className="relative">
                    <div className="relative">
                        <img
                            className="min-w-full h-auto"
                            src={productImg + item?.image[0]}
                            alt="Mountain"
                        />
                        <div
                            className="absolute lg:cursor-pointer search h-12 w-12 bg-white rounded-full left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] opacity-0 group-hover:opacity-100 duration-500"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineSearch className="mt-4 text-xl ml-4" />
                        </div>
                    </div>
                    <div className="py-6 px-3 space-y-2 relative">
                        {Array.isArray(category) && category?.length > 0 && (
                            <p className="sm:text-sm text-xs font-semibold uppercase antialiased mb-2">
                                <ProdMultiCategory
                                    category={category}
                                    className={'text-gray-600'}
                                    count={1}
                                />
                            </p>
                        )}
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <h3 className="sm:text-lg text-sm text-hover text-gray-800 font-bold antialiased capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                {item?.name}
                            </h3>
                        </Link>
                        <div className="flex gap-x-1 items-center">
                            <div>
                                <Rate rating={parsedRating} />
                            </div>
                            <div className="text-gray-500 sm:text-sm text-xs">
                                ({parsedNumberRating})
                            </div>
                        </div>
                        <div className="text-base flex flex-wrap gap-2 items-center font-semibold lg:group-hover:opacity-0 duration-500">
                            <div className="text-base font-semibold">
                                <BDT />
                                {price}
                            </div>
                            {priceLineThrough && (
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
                        {productAvailablity && (
                            <div
                                className="menu-hover lg:absolute bottom-6 left-4 lg:hover:-translate-y-1 lg:group-hover:scale-110 lg:cursor-pointer duration-500 lg:opacity-0 lg:group-hover:opacity-100 font-sans  font-semibold text-sm underline"
                                onClick={handleAddToCart}
                            >
                                {'Add to Cart'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </>
    );
};

export default Card42;
