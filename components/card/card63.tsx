'use client';

import { useEffect, useMemo, useState } from 'react';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AiFillThunderbolt } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { RootState } from '@/redux/store';
import {
    addToCart,
    handleDecrement,
    handleIncrement,
    isActiveCart,
} from '@/utils/_cart-utils/cart-utils';
import { customizeModalPopup } from '@/utils/customizeDesign';
import QuickView from '@/utils/quick-view';
import { useRouter } from 'next/navigation';
import Details from '../_product-details-page/components/details';

const Card63 = ({ item }: any) => {
    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

    const store_id = numberParser(headersetting?.store_id) || null;

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();
    const router = useRouter();

    const modalPopup = customizeModalPopup.find((item) => item.id == store_id);

    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<any>(null);

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

    const add_cart_item = () => {
        if (modalPopup?.modal_not_show && item?.variant?.length > 0) {
            router.push('/product/' + item?.id + '/' + item?.slug);
            return;
        }

        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            handleAddToCart();
        }
    };

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const { button } = headersetting?.custom_design?.product?.[0] || {};

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color-thirty {
        color:  ${bgColor};
    }
    .text-hover:hover {
        color: ${bgColor};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: white;
        border: 1px solid ${bgColor};
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
      .card-overlay-thirty-six{
        background-color: black;
        opacity: 0;
      }

      .overlay-group-thirty-six:hover .card-overlay-thirty-six{
        background-color: black;
        opacity: .5;
      }

  `;

    useEffect(() => {
        const result = cartList?.find((i: any) => i?.id === item?.id);
        setProduct(result);
    }, [cartList, item, product]);

    return (
        <div className="group overlay-group-thirty-six">
            <div className="lg:border lg:group-hover:border-gray-200 lg:border-transparent relative lg:p-2 rounded-md">
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
                <div className="">
                    <style>{styleCss}</style>
                    <div className="relative overflow-hidden rounded-md">
                        <div className="relative overflow-hidden w-full ">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <img
                                    src={productImg + item.image[0]}
                                    alt=""
                                    className="h-auto min-w-full"
                                />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2 pt-3">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <div className="flex justify-center items-center flex-wrap">
                                    <h1 className="text-hover capitalize truncate px-1">
                                        {item?.name}
                                    </h1>
                                </div>
                            </Link>

                            <div className="flex items-center justify-center flex-wrap gap-2 group-hover:opacity-0">
                                <div className="text-sm py-1 rounded-lg text-color-thirty">
                                    <BDT />
                                    {price}
                                </div>
                                {productAvailablity && save > 0 && (
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

                        <div className="lg:absolute card-overlay-thirty-six lg:z-[1] w-full h-full left-0 bottom-0">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <p className="absolute rounded-b-md bottom-0 left-0 bg-white border border-gray-500 w-full text-center z-[3] py-1 font-bold text-black">
                                    Details
                                </p>{' '}
                            </Link>
                        </div>
                        <div className="group-hover:opacity-100 opacity-0 text-white hidden lg:block">
                            {hasInCartList ? (
                                <>
                                    <div className="flex items-center lg:cursor-pointer lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 justify-between w-full text-white text-sm md:text-base font-bold gap-1 px-6">
                                        <div
                                            onClick={() =>
                                                handleDecrement(
                                                    dispatch,
                                                    product
                                                )
                                            }
                                            className="w-10 h-10 border rounded-full relative"
                                        >
                                            <MinusIcon className="h-5 lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2" />
                                        </div>
                                        <div className="text-center relative">
                                            <p className="lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                                                {product?.qty}
                                            </p>
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleIncrement(
                                                    dispatch,
                                                    product
                                                )
                                            }
                                            className="w-10 h-10 relative text-center border rounded-full border-red-50 flex justify-center items-center"
                                        >
                                            <PlusIcon className="h-5 lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>
                                    <p className="lg:absolute lg:z-[2] top-[60%] -translate-x-1/2 left-1/2">
                                        in Cart
                                    </p>
                                    <p className="lg:absolute lg:z-[2] top-[20%] -translate-x-1/2 left-1/2">
                                        <BDT price={price} />
                                    </p>
                                </>
                            ) : (
                                <>
                                    {productAvailablity && (
                                        <p
                                            onClick={add_cart_item}
                                            className="flex justify-center items-center lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-white h-max text-2xl px-10 text-center lg:cursor-pointer"
                                        >
                                            Add to Shopping Cart
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {hasInCartList ? (
                        <div className="flex items-center lg:cursor-pointer justify-between w-full mt-2 bg-red-500 text-white text-sm md:text-base font-bold gap-1 h-10">
                            <div
                                onClick={() =>
                                    handleDecrement(dispatch, product)
                                }
                                className="w-16 text-center border-r border-red-50 h-full flex justify-center items-center"
                            >
                                <MinusIcon className="h-5" />
                            </div>
                            <div className="w-full text-center">
                                <p className="">{product?.qty} in bag</p>
                            </div>
                            <div
                                onClick={() =>
                                    handleIncrement(dispatch, product)
                                }
                                className="w-16 text-center border-l border-red-50 h-full flex justify-center items-center"
                            >
                                <PlusIcon className="h-5" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {productAvailablity && (
                                <div
                                    onClick={add_cart_item}
                                    className="w-full mt-2 bg-white text-color-thirty text-sm md:text-base border font-bold flex px-2 h-10 justify-center gap-1 items-center lg:cursor-pointer"
                                >
                                    <AiFillThunderbolt />
                                    <p className="">
                                        {button || 'Add to Cart'}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* for modal open  */}
                <QuickView open={open} setOpen={setOpen}>
                    <Details product={item} />
                </QuickView>
            </div>
        </div>
    );
};

export default Card63;
