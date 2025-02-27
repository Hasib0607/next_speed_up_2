'use client';

import { useState } from 'react';

import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuikView from '@/utils/quick-view';
import Rate from '@/utils/rate';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import ProdMultiCategory from '@/utils/prod-multi-category';

const Card15 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);
    
    const category = item?.category || [];

    const dispatch = useDispatch();

    const bgColor = "var(--header-color)";
    const textColor = "var(--text-color)";

    const styleCss = `
    .searchHover:hover {
      color:  ${textColor};
      background: ${bgColor};
      }
      .text-hover:hover {
        color:  ${bgColor};
        }
    `;

    const [hoverCard, setHoverCard] = useState(false);
    const [open, setOpen] = useState<any>(false);

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
        <div>
            <style>{styleCss}</style>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                style={{
                    border: hoverCard ? `1px solid ${bgColor}` : '',
                }}
                onMouseEnter={() => setHoverCard(true)}
                onMouseLeave={() => setHoverCard(false)}
                className="rounded overflow-hidden shadow-sm group border border-transparent relative"
            >
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
                <div className="absolute top-2 left-2 text-white bg-black rounded-sm px-2 text-xs py-1">
                    <p>{item?.product_offer?.status ? 'OFFER' : 'NEW'}</p>
                </div>
                <div className="relative">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            className="min-w-full h-auto"
                            src={productImg + item?.image[0]}
                            alt={item?.name}
                        />
                    </Link>
                    <div
                        className=" absolute searchHover top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white group-hover:flex justify-center items-center h-10 w-10 rounded-full transition-all ease-in-out delay-550 hover:-translate-y-10 lg:cursor-pointer group-hover:scale-110  duration-1000 hidden"
                        onClick={() => setOpen(!open)}
                    >
                        <AiOutlineSearch className="text-xl" />
                    </div>
                </div>

                <div className="py-6 px-3 space-y-2 flex justify-center flex-col items-center">
                    {Array.isArray(category) && category?.length > 0 && (
                        <ProdMultiCategory category={category} />
                    )}
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h3 className="text-sm text-gray-800 font-bold antialiased whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h3>
                    </Link>

                    <div className="flex gap-x-1">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({parsedNumberRating})
                        </div>
                    </div>

                    <div className="text-base antialiased group-hover:hidden flex items-center gap-2">
                        <div className="">
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
                    {productAvailablity && (
                        <div
                            className="transition-all text-hover ease-in-out delay-500 hover:-translate-y-1 group-hover:scale-110 duration-1000 lg:cursor-pointer hidden group-hover:block text-xs font-semibold underline"
                            onClick={handleAddToCart}
                        >
                            ADD TO CART
                        </div>
                    )}
                </div>
            </motion.div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card15;
