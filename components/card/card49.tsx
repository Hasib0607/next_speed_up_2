'use client';

import {
    howMuchSave,
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';

import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import { useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import { numberParser } from '@/helpers/numberParser';

const Card49 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

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

    const styleCss = `
    .text-color {
        color: ${design?.header_color};
      }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
  `;

    return (
        <div className="group relative border border-gray-100">
            {/* out of stock  */}
            {!productAvailablity && (
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                            Sold Out
                        </p>
                    </div>
                </Link>
            )}
            <style>{styleCss}</style>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="relative overflow-hidden">
                    <img
                        src={productImg + item.image[0]}
                        alt=""
                        className="h-auto min-w-full"
                    />
                </div>
            </Link>

            <div className="flex flex-col items-center gap-5 px-4 py-5">
                <div className="text-gray-700 font-bold text-center">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="text-hover capitalize group-hover:underline whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                            {item?.name}
                        </h1>
                    </Link>
                </div>

                <div className="text-gray-600 font-semibold flex justify-center items-center gap-2 w-full ">
                    <div className="text-base font-semibold">
                        <BDT />
                        {price}
                    </div>
                    {save > 0 && (
                        <p className="line-through text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                </div>
                {productAvailablity && (
                    <div
                        onClick={handleAddToCart}
                        className="lg:cursor-pointer  border p-2 duration-300 absolute top-2 right-2 bg-white"
                    >
                        <MdAddShoppingCart className="text-2xl" />
                    </div>
                )}
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card49;
