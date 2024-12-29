'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import Rate from '@/utils/rate';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';

import QuikView from '../../utils/quick-view';
import './card.css';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card23 = ({ item }: any) => {
    const [open, setOpen] = useState(false);

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const { cartList } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const card7CustomStyle = `      

.card7SearchIcon{
    height: 20px;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.card7SearchIcon:hover{
    color:${design?.header_color};
}

.mainDivHover:hover{
    border:1px solid ${design?.header_color}
}
`;

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    const parsedRating = numberParser(item?.number_rating, true);

    const handleAddToCart = () => {
        addToCart({
            dispatch,
            product: item,
            cartList,
            price,
            qty: 1,
            productQuantity: item?.quantity,
        });
    };

    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                className="w-full bg-white relative rounded-lg overflow-hidden mainDivHover border card7Hover"
                style={{ width: '100%' }}
            >
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-400 text-white px-2 py-1 w-max absolute bottom-0">
                                Out of Stock
                            </p>
                        </div>
                    </Link>
                )}
                <style>{card7CustomStyle}</style>
                <div className="w-full   block relative rounded overflow-hidden ">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            className="min-w-full h-auto scale-110"
                            src={productImg + item.image[0]}
                            alt=""
                        />
                    </Link>

                    <div className="justify-center hidden lg:flex">
                        <div className="w-[60%] lg:absolute -bottom-2   mx-auto  px-1 quick3 font-normal text-md pb-2 text-black text-md border rounded-full items-center">
                            <div className="flex justify-center items-center">
                                <div
                                    className="mr-2 lg:cursor-pointer"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingBagIcon className="card7SearchIcon" />
                                </div>
                                <div className="border-r-2 border-gray-500 h-[20px]"></div>
                                <div
                                    className="lg:cursor-pointer"
                                    onClick={() => setOpen(!open)}
                                >
                                    <IoSearchCircleOutline className="card7SearchIcon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    href={'/product/' + item?.id + '/' + item?.slug}
                    className="p-5"
                >
                    <div className="flex justify-center px-2">
                        <p className="mb-3 menu-hover font-six font-base text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                            {item?.name}
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Rate rating={parsedRating} />
                    </div>
                    <div className="flex justify-center items-center ">
                        <div className="flex gap-x-2 px-2">
                            <div className="text-base font-semibold">
                                <BDT />
                                {price}
                            </div>
                            {priceLineThrough ? (
                                <p className="line-through text-gray-400">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            ) : null}
                        </div>
                    </div>
                </Link>
            </motion.div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </>
    );
};

export default Card23;
