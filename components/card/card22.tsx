'use client';

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
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import QuikView from '@/utils/quick-view';

const Card22 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const dispatch = useDispatch();

    const [open, setOpen] = useState<any>(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
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

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
  `;

    return (
        <div className="relative">
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
            <div className="group">
                <style>{styleCss}</style>
                <div className="relative">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full"
                        />
                    </Link>
                    <p className="absolute bg-gray-800 text-xs text-white top-4 left-4 px-2 py-1">
                        {item?.product_offer?.status ? 'OFFER' : 'NEW'}
                    </p>
                    <div
                        onClick={() => setOpen(!open)}
                        className="searchHover scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-1000 lg:cursor-pointer h-12 w-12 rounded-full absolute top-4 right-5 bg-white"
                    >
                        <AiOutlineSearch className="text-2xl mt-3 ml-[14px]" />
                    </div>
                    {productAvailablity && (
                        <div
                            onClick={handleAddToCart}
                            className="flex searchHover lg:cursor-pointer text-lg flex-row items-center scale-100 opacity-0 group-hover:opacity-100 duration-1000 gap-1 bg-white text-black px-2 w-max py-1 absolute left-[50%] -translate-x-1/2 bottom-6 "
                        >
                            <BsPlusLg className="text-xs " />
                            <p>Add To Cart</p>
                        </div>
                    )}
                </div>

                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="pt-3 pb-1 text-gray-500 text-lg font-medium">
                        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h1>
                    </div>
                </Link>
                <div className="text-lg text-gray-700 font-semibold">
                    <div className="">
                        <BDT />
                        {price}
                    </div>
                    {priceLineThrough && (
                        <p className="line-through text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                </div>
            </div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card22;
