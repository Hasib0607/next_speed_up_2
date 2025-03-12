'use client';

import { motion } from 'framer-motion';
import './product-card-one.css';
import { BsBagPlus } from 'react-icons/bs';
import { IoCart } from 'react-icons/io5';
import { productImg } from '@/site-settings/siteUrl';
import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMemo, useState } from 'react';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import {
    addToCart,
    handleIncrement,
    isActiveCart,
} from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';
import QuickView from '@/utils/quick-view';
import Details from '@/components/_product-details-page/components/details';
import { useRouter } from 'next/navigation';

const ProductCardTen = ({ item, store_id }: any) => {
    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const hasInCartList = useMemo(
        () => isActiveCart(item, cartList),
        [item, cartList]
    );

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

    const buy_now = () => {
        if (item?.variant.length !== 0) {
            router.push('/product/' + item?.id + '/' + item?.slug);
        } else {
            handleAddToCart();
            router.push('/checkout');
        }
    };

    return (
        <div className="group lg:cursor-pointer">
            <div className="w-full h-[100%] relative">
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-[var(--header-color)] text-[var(--text-color)] text-sm px-2 py-1 w-max m-2">
                                Sold out
                            </p>
                        </div>
                    </Link>
                )}

                <figure className="min-w-full h-auto relative overflow-hidden group-hover:shadow-lg">
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
                            className=" w-full h-full group-hover:hidden group-hover:scale-105 transition-all duration-500 ease-linear "
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
                    <div className="absolute opacity-0 translate-y-5 gap-2 top-[85%] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out flex justify-center left-0 right-0">
                        <div
                            onClick={() => setOpen(!open)}
                            className="flex items-center"
                        >
                            <HoverIcon text={'Quick View'}>
                                <EyeIcon className="h-5 w-5 text-2xl font-serif font-semibold" />
                            </HoverIcon>
                        </div>
                        <div className="flex items-center">
                            {hasInCartList ? (
                                <div
                                    onClick={() =>
                                        handleIncrement(dispatch, item)
                                    }
                                    className="flex items-center"
                                >
                                    <HoverIcon text={'Add to Cart'}>
                                        <IoCart className="h-5 w-5 text-2xl font-serif font-bold" />
                                    </HoverIcon>
                                </div>
                            ) : item?.variant?.length == 0 ? (
                                <div
                                    onClick={handleAddToCart}
                                    className="flex items-center"
                                >
                                    <HoverIcon text={'Add to Cart'}>
                                        <IoCart className="h-5 w-5 text-2xl font-serif font-bold" />
                                    </HoverIcon>
                                </div>
                            ) : (
                                <Link
                                    href={
                                        '/product/' +
                                        item?.id +
                                        '/' +
                                        item?.slug
                                    }
                                    className="flex items-center"
                                >
                                    <HoverIcon text={'Add to Cart'}>
                                        <IoCart className="h-5 w-5 text-2xl font-serif font-bold" />
                                    </HoverIcon>
                                </Link>
                            )}
                        </div>
                        <div className="flex items-center">
                            {productAvailablity && (
                                <div
                                    onClick={buy_now}
                                    className="flex items-center"
                                >
                                    <HoverIcon text={'Buy Now'}>
                                        <BsBagPlus className="h-5 w-5 text-2xl font-serif font-bold" />
                                    </HoverIcon>
                                </div>
                            )}
                        </div>
                    </div>
                </figure>
                <div className="card-body p-4 bg-white text-center flex flex-col items-center">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <p className="font-semibold text-center hover:text-[var(--header-color)]">
                            {item?.name?.slice(0, 18)}{' '}
                            {item?.name?.length > 18 ? '...' : null}
                        </p>
                    </Link>

                    <div className="flex flex-col items-center mt-2">
                        <div className="flex items-center">
                            <div className="text-base">
                                <BDT />
                                {price}
                            </div>
                            {save > 0 && (
                                <p className="line-through text-sm ml-2">
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

            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default ProductCardTen;

export const HoverIcon = ({ text, children }: any) => {
    return (
        <motion.div
            whileHover={{ y: -7 }}
            className="p-3 icon bg-orange-50 relative hover:bg-orange-700 hover:text-white transition-all duration-500  ease-linear"
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
