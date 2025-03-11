'use client';

import { numberParser } from '@/helpers/numberParser';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import ProdMultiCategory from '@/utils/prod-multi-category';

const Card71 = ({ item }: any) => {
    const category = item?.category || [];

    const [open, setOpen] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const styleCss = `
    .text-color {
        color:  ${bgColor};
    }
  `;

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
        }
    };

    return (
        <div className="bg-white h-[400px] lg:h-[650px] relative group">
            <div className="">
                <style>{styleCss}</style>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative shine overflow-hidden hover:rotate-1 hover:shadow-2xl duration-[2000ms] ease-in rounded-md">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover group-hover:scale-110 duration-1000"
                        />
                        <div className="absolute bottom-3 right-3 bg-color text-white z-[2] px-4 py-1 rounded-lg text-sm">
                            {!productAvailablity ? 'Out of stock' : 'Sale'}
                        </div>
                    </div>
                </Link>

                <div className="text-gray-700 text-base py-3">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="text-sm sm:text-[15px] capitalize truncate">
                            {item?.name}
                        </h1>
                    </Link>
                    {Array.isArray(category) && category?.length > 0 && (
                        <p className="text-sm sm:text-[15px] capitalize">
                            <ProdMultiCategory
                                category={category}
                                className={
                                    'text-sm sm:text-[15px] capitalize truncate'
                                }
                            />
                        </p>
                    )}
                </div>

                <div className="font-semibold flex items-center gap-2 w-full">
                    {productAvailablity && save > 0 && (
                        <p className="line-through text-gray-500 text-xs">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                    <div className="text-sm text-red-500">
                        <BDT />
                        {price}
                    </div>
                </div>

                {item?.variant?.length > 0 ? (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="flex text-color text-center py-3 border hover:border-2 border-gray-700 mt-3 rounded-md justify-center gap-1 items-center relative z-[1] lg:cursor-pointer">
                            <HiOutlineDocumentText className="text-lg" />
                            <p className="text-sm">View Details</p>
                        </div>
                    </Link>
                ) : (
                    <div>
                        <div
                            onClick={add_cart_item}
                            className="flex text-color text-center py-3 border hover:border-2 border-gray-700 mt-3 rounded-md justify-center gap-1 items-center relative z-[1] lg:cursor-pointer"
                        >
                            Add To Cart
                        </div>
                    </div>
                )}
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card71;
