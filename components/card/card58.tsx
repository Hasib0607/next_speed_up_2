'use client';

import shape from '@/assets/img/shape.png';
import { getDataByType } from '@/helpers/getCustomDataByType';
import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetDesignQuery,
    useGetHeaderSettingsQuery,
} from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import { customizeModalPopup } from '@/utils/customizeDesign';
import QuickView from '@/utils/quick-view';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
<<<<<<< HEAD
=======
import { HeaderColor, TextColor } from '@/consts';
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

const Card58 = ({ item, type = '' }: any) => {
    const { data: designData } = useGetDesignQuery({});
    const design = designData?.data || {};

    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

<<<<<<< HEAD
    // console.log('card 58', headersetting);

=======
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
    const store_id = design?.store_id || null;

    const { cartList } = useSelector((state: RootState) => state.cart);

    // get customized store
    const modalPopup = customizeModalPopup.find((item) => item.id == store_id);

    const router = useRouter();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const parsedRating = numberParser(item?.rating, true);

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

    const customDesignData = getDataByType(headersetting, type);

    const customDesignData = getDataByType(headersetting, type);

    const {
        button,
        button_color,
        button_bg_color,
        button1,
        button1_color,
        button1_bg_color,
        is_buy_now_cart,
        is_buy_now_cart1,
    } = customDesignData || {};

    const isEmpty = Object.keys(customDesignData).length === 0;

    const styleCss = `
    .searchHover:hover {
        color:  ${TextColor};
        background: ${HeaderColor};
    }
    .text-color-price {
        color:  ${HeaderColor};
        border: 2px solid ${HeaderColor};
    }
    .text-hover:hover {
        color: ${HeaderColor};
      }
    .bg-color {
        color:  ${TextColor};
        background: ${HeaderColor};
    }
    .cart-btn {
        color:  ${TextColor};
        background: ${HeaderColor};
    }
    .cart-btn:hover {
        color:  ${HeaderColor};
        background: white;
        border: 1px solid ${HeaderColor};
    }
    .cart-border:hover {
        border: 2px solid ${HeaderColor};
    }
    .c58_button {
        color:  ${button_color};
        background: ${button_bg_color};
        border: 2px solid transparent;
    }
    .c58_button:hover {
        color:  ${button_color};
        background: transparent;
        border: 2px solid ${button_color};
    }
    .c58_button1 {
        color:  ${button1_color};
        background: ${button1_bg_color};
        border: 2px solid transparent;
    }
    .c58_button1:hover {
        color:  ${button1_color};
        background: transparent;
        border: 2px solid ${button1_color};
    }
    .view-eye:hover .quick-view {
        display: block;
        background: white;
      }
    .image-div:hover .image-hover {
        display: none;
      }
    .image-div:hover .image-hover-two {
        display: block;
       
      }
  `;

    const buy_now = () => {
        if (modalPopup?.modal_show && item?.variant.length !== 0) {
            setOpen(!open);
            return;
        }

        if (item?.variant.length !== 0) {
            router.push('/product/' + item?.id + '/' + item?.slug);
        } else {
            handleAddToCart();
            router.push('/checkout');
        }
    };

    const add_cart_item = () => {
        if (modalPopup?.modal_show && item?.variant.length !== 0) {
            setOpen(!open);
            return;
        }

        if (item?.variant.length !== 0) {
            router.push('/product/' + item?.id + '/' + item?.slug);
        } else {
            handleAddToCart();
        }
    };

    return (
        <>
            <style>{styleCss}</style>
            <div className="group relative">
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
                <div className="relative overflow-hidden duration-500 border-2 cart-border">
                    {productAvailablity && save > 0 && (
                        <>
                            <div className="h-10 absolute top-2 right-2 z-[2]">
                                <img
                                    src={shape.src}
                                    alt=""
                                    className="h-full"
                                />
                                <p className="text-[10px] text-white absolute top-2 left-3 leading-[12px]">
                                    {' '}
                                    {item.discount_type === 'fixed' ? (
                                        <>
                                            Dis <BDT />{' '}
                                        </>
                                    ) : (
                                        ''
                                    )}{' '}
                                    {numberParser(item.discount_price)}{' '}
                                    {item.discount_type === 'percent'
                                        ? '% off'
                                        : ''}
                                </p>
                            </div>
                        </>
                    )}
                    <style>{styleCss}</style>
                    <div className="relative overflow-hidden">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <div className="relative overflow-hidden p-2">
                                <img
                                    src={productImg + item?.image[0]}
                                    alt=""
                                    className="h-auto min-w-full"
                                />
                                <div className="absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 "></div>
                            </div>
                        </Link>
                        <div className="text-gray-600 font-semibold flex justify-center items-center gap-2 w-full ">
                            <div className="flex flex-col items-center gap-2">
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
                                <div className="text-sm py-1 rounded-lg text-orange-400">
                                    <BDT />
                                    {price}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 px-4 py-1">
                            <div className="text-gray-800 text-sm font-medium">
                                <Link
                                    href={
                                        '/product/' +
                                        item?.id +
                                        '/' +
                                        item?.slug
                                    }
                                >
                                    {' '}
                                    <h1 className="text-hover hover:underline capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                                        {item?.name}
                                    </h1>{' '}
                                </Link>
                            </div>
                            <div>
                                <Rate rating={parsedRating} />
                            </div>
                        </div>
                    </div>
                </div>
                {productAvailablity && (
                    <>
                        {isEmpty && (
                            <div
                                onClick={add_cart_item}
                                className="bg-color flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer mt-1"
                            >
                                কার্টে যোগ করুন
                            </div>
                        )}
                        {(button || button1) && (
                            <>
                                {button && (
                                    <div
                                        onClick={
                                            numberParser(is_buy_now_cart) == 1
                                                ? buy_now
                                                : add_cart_item
                                        }
                                        className="c58_button flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer"
                                    >
                                        {button}
                                    </div>
                                )}
                                {button1 && (
                                    <div
                                        onClick={
                                            numberParser(is_buy_now_cart1) == 1
                                                ? buy_now
                                                : add_cart_item
                                        }
                                        className="c58_button1 flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer mt-1"
                                    >
                                        {button1}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

                <QuickView open={open} setOpen={setOpen}>
                    <Details product={item} />
                </QuickView>
            </div>
        </>
    );
};

export default Card58;
