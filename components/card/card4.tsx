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
import QuikView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import ProdMultiCategory from '@/utils/prod-multi-category';


const Card4 = ({ item }: any) => {
    const [open, setOpen] = useState(false);
    
    const { cartList } = useSelector((state: RootState) => state.cart);
    const category = item?.category || [];

    const dispatch = useDispatch();

    const styleCss = `
        .text-hover:hover {
            color: var(--header-color);
        }
        .search:hover {
            color: var(--text-color);
            background: var(--header-color);
        }
        .border-hover:hover {
            border: 1px solid var(--header-color);
        }
    `;

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

    return (
        <>
            <div className="rounded overflow-hidden shadow-sm group border border-hover">
                <style>{styleCss}</style>
                <div className="relative">
                    {/* out of stock */}
                    {!productAvailablity && (
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                                <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                    Sold Out
                                </p>
                            </div>
                        </Link>
                    )}
                    <div className="absolute w-48 text-center bg-black text-white text-xs px-10 py-2 top-6 -left-10 rounded-md -rotate-45 z-[1]">
                        <p>
                            {item?.product_offer?.status
                                ? 'OFFER'
                                : 'BEST SELLER'}
                        </p>
                    </div>
                    <div className="relative">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <img
                                className="min-w-full h-auto"
                                src={productImg + item?.image[0]}
                                alt="Mountain"
                            />
                        </Link>
                        <div
                            className="absolute lg:cursor-pointer search h-12 w-12 bg-white rounded-full left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] opacity-0 group-hover:opacity-100 duration-500"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineSearch className="mt-4 text-xl ml-4" />
                        </div>
                    </div>
                    <div className="py-6 px-3 space-y-2 relative">
                        {Array.isArray(category) && category?.length > 0 && (
                            <ProdMultiCategory
                                category={category}
                                className={'text-[var(--header-color)]'}
                            />
                        )}
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <h3 className="lg:text-lg text-sm font-medium text-hover text-gray-800 lg:font-bold antialiased capitalize truncate">
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

                        <div className="text-sm lg:text-base flex flex-col lg:flex-row lg:gap-2 gap-1 lg:items-center font-semibold lg:group-hover:opacity-0 duration-500">
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
                                className="menu-hover lg:absolute bottom-6 left-4 hover:-translate-y-1 lg:group-hover:scale-110 lg:cursor-pointer duration-500 lg:opacity-0 lg:group-hover:opacity-100 font-semibold text-sm underline"
                                onClick={handleAddToCart}
                            >
                                {'ADD TO CART'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </>
    );
};

export default Card4;
