'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuikView from '@/utils/quick-view';
import BDT from '@/utils/bdt';
import Rate from '@/utils/rate';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { numberParser } from '@/helpers/numberParser';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Details from '@/components/_product-details-page/components/details';

const Card17 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const bgColor = "var(--header-color)";
    const textColor = "var(--text-color)";

    const styleCss = `
        .search-hover:hover {
            color:  ${textColor};
            background: ${bgColor};
        }
        .cart:hover {
            color:  ${bgColor};
        }
    `;
    const [open, setOpen] = useState<any>(false);

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

    return (
        <div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                className="rounded overflow-hidden shadow-sm group relative border border-transparent"
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
                <style>{styleCss}</style>

                <div className="relative">
                    <img
                        className="min-w-full h-auto"
                        src={productImg + item?.image[0]}
                        alt="Mountain"
                    />
                    <div
                        className="search-hover absolute bottom-3 lg:cursor-pointer right-3 h-12 w-12 bg-white  rounded-full duration-5000 hidden group-hover:block"
                        onClick={() => setOpen(!open)}
                    >
                        <AiOutlineSearch className="text-xl mt-4 ml-[14px]" />
                    </div>
                </div>
                <div className="lg:py-6 py-2 px-3 space-y-2">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h3 className="capitalize cart font-sans text-sm font-bold antialiased font-twelve text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h3>
                    </Link>
                    <div className="font-twelve text-sm text-gray-600 antialiased mb-2 group-hover:opacity-0 flex items-center gap-2">
                        <div className="">
                            <BDT />
                            {price}
                        </div>
                        {save > 0 && (
                            <p className="line-through text-gray-400">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                    </div>
                </div>
                <div className="font-twelve duration-5000 cart lg:absolute bottom-3 lg:opacity-0 group-hover:opacity-100 duration-500 flex justify-between items-center w-full px-3 flex-wrap gap-y-2">
                    {productAvailablity && (
                        <div
                            className="flex gap-1 items-center border-b-2 border-black lg:cursor-pointer w-max"
                            onClick={handleAddToCart}
                        >
                            <BsPlusLg className="text-xs " />
                            <p className="text-xs font-medium">ADD TO CART</p>
                        </div>
                    )}
                    <Rate rating={parsedRating} className={"font-twelve"} />
                </div>
            </motion.div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card17;
