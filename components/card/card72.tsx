'use client';

import { motion } from 'framer-motion';
import '../card/product-card/product-card-one.css';
import { productImg } from '@/site-settings/siteUrl';
import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import BDT from '@/utils/bdt';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';

const Card72 = ({ item }: any) => {
    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

    const [open, setOpen] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const router = useRouter();

    const dispatch = useDispatch();

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

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

    const add_cart_item = () => {
        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            handleAddToCart();
            router.push('/checkout');
        }
    };

    return (
        <div className="group lg:cursor-pointer">
            <div className="drop-shadow-xl w-full relative">
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

                <figure className="min-w-full h-auto relative overflow-hidden ">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <motion.img
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 1 },
                            }}
                            exit={{
                                scale: 1,
                                transition: { duration: 1 },
                            }}
                            src={productImg + item?.image[0]}
                            alt="Shoes"
                            className="w-full h-full group-hover:hidden group-hover:scale-105 transition-all duration-500 ease-linear "
                        />
                    </Link>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <motion.img
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 1 },
                            }}
                            exit={{
                                scale: 1,
                                transition: { duration: 1 },
                            }}
                            src={productImg + secondImg}
                            alt="Shoes"
                            className="w-full h-full group-hover:block group-hover:scale-105 transition-all duration-500 ease-linear hidden "
                        />
                    </Link>
                    <div className="absolute hidden gap-2 top-[45%] group-hover:flex justify-center left-0 right-0">
                        <div onClick={() => setOpen(!open)} className="">
                            <HoverIcon text={'Quick View'}>
                                <EyeIcon className="h-5 w-5 text-2xl font-serif font-semibold" />
                            </HoverIcon>
                        </div>
                    </div>
                    {productAvailablity && save > 0 && (
                        <div className="absolute z-[3] top-2 right-2 bg-[#ff576d] px-[5px] py-[2px] h-[22px] text-white flex justify-center items-center text-xs font-semibold">
                            <p>
                                {item.discount_type === 'fixed' ? (
                                    <>
                                        Save <BDT />{' '}
                                    </>
                                ) : null}{' '}
                                {numberParser(item.discount_price)}{' '}
                                {item.discount_type === 'percent'
                                    ? '% off'
                                    : null}
                            </p>
                        </div>
                    )}
                </figure>
                <div className="text-center p-4 bg-white">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <p className="hover:underline">
                            {item?.name?.slice(0, 18)}{' '}
                            {item?.name?.length > 18 ? '...' : null}
                        </p>
                    </Link>

                    <h6 className="text-lg font-medium flex gap-2 items-center justify-center">
                        {productAvailablity && save > 0 && (
                            <p className="line-through text-red-600 text-sm ml-2">
                                {' '}
                                <BDT
                                    price={numberParser(item?.regular_price)}
                                />
                            </p>
                        )}
                        <div className="text-sm text-red-500">
                            <BDT />
                            {price}
                        </div>
                    </h6>
                </div>
            </div>

            <QuickView open={open} setOpen={setOpen}>
                <div className="p-5">
                    <Details product={item} />
                </div>
            </QuickView>
        </div>
    );
};

export default Card72;

export const HoverIcon = ({ text, children }: any) => {
    return (
        <motion.div
            whileHover={{ y: -7 }}
            className="p-3 icon rounded-full bg-orange-50 relative hover:bg-orange-700 hover:text-white transition-all duration-500  ease-linear"
        >
            {children}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -5 }}
                transition={{ delay: 1 }}
                className="bg-orange-700 rounded-md shadow-sm pb-3 pt-1 font-semibold absolute -top-9 m-1 -left-8 px-2 invisible child_icon translate-y-6 transition-all duration-500 ease-in-out text-center text-xs text-gray-300"
            >
                {text}
            </motion.div>
        </motion.div>
    );
};
