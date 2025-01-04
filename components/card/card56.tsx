'use client';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import ProdMultiCategory from '@/utils/prod-multi-category';
import { RootState } from '@/redux/store';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import { numberParser } from '@/helpers/numberParser';

const Card56 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);
    const category = item?.category || [];

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
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

    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
        border: 1px solid ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: transparent;
        border: 1px solid ${bgColor};
    }
    .cart-hover-fs:hover {
        color:  ${textColor};
        background: ${bgColor};
        border: 1px solid ${bgColor};
    }
  `;

    return (
        <div className={`group`}>
            <div className="relative overflow-hidden border group-hover:border-white group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md duration-500">
                {!productAvailablity && (
                    <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-20 z-[1] text-white">
                        <p className="text-right mt-2 mr-2 text-red-500 font-bold">
                            Out of Stock
                        </p>
                    </div>
                )}
                <style>{styleCss}</style>
                <div className="px-2 sm:px-4 py-5 w-full">
                    {Array.isArray(category) && category?.length > 0 && (
                        <p className="text-sm text-hover">
                            <ProdMultiCategory
                                category={category}
                                className={'text-gray-600'}
                                count={1}
                            />
                        </p>
                    )}
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h1 className="text-hover font-thin capitalize truncate">
                            {item?.name}
                        </h1>
                    </Link>
                    <Link href={'/brand/' + item?.brand_id}>
                        <h1 className="text-hover font-thin capitalize truncate text-xs">
                            {item?.brand_name}
                        </h1>
                    </Link>
                </div>

                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden mx-2 sm:mx-4">
                        <img
                            src={productImg + item?.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover group-hover:hidden block border-b"
                        />
                        <img
                            src={productImg + secondImg}
                            alt=""
                            className="h-auto min-w-full object-center object-cover group-hover:block hidden border-b"
                        />
                    </div>
                </Link>

                <div className="flex justify-between items-center gap-1 px-2 sm:px-4 relative overflow-hidden">
                    <div className="flex flex-col py-3 duration-500 group-hover:-translate-y-32 w-full">
                        <div className="flex gap-x-1 items-center">
                            <div>
                                <Rate rating={parsedRating} />
                            </div>
                            <div className="text-gray-500 sm:text-sm text-xs">
                                ({parsedNumberRating})
                            </div>
                        </div>

                        <div className="text-gray-600 flex flex-wrap items-center gap-1 sm:gap-2 w-full">
                            <div className="text-color text-lg">
                                <BDT />
                                {price}
                            </div>
                            {save > 0 && (
                                <p className="line-through text-xs ">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                        </div>
                    </div>

                    <div
                        onClick={() => setOpen(!open)}
                        className="absolute hover:border hover:border-gray-600  hover:rounded-full hover:touch-pinch-zoom  left-6 group-hover:bottom-6 -bottom-10 duration-500 lg:cursor-pointer"
                    >
                        <BsEye className="text-xl text-center text-hover" />
                    </div>
                    {productAvailablity && (
                        <div
                            onClick={handleAddToCart}
                            className="lg:cursor-pointer hover:border hover:border-gray-600 hover:p-1 hover:rounded-full hover:touch-pinch-zoom  border p-2 cart-hover-fs duration-300"
                        >
                            <MdAddShoppingCart className="text-2xl" />
                        </div>
                    )}
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card56;
