import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuikView from '@/utils/quick-view';

import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import ProdMultiCategory from '@/utils/prod-multi-category';

const Card21 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const category = item?.category || [];

    const dispatch = useDispatch();

    const [open, setOpen] = useState<any>(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
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

    const customStyle = `
    .btnCustom {
        transition:2s
    }
    .btnCustom:hover {
        transform: translateY(-20px)
    }
    `;

    return (
        <>
            <div className="group relative overflow-hidden rounded-[20px] h-fit border hover:shadow-lg ">
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 right-0 w-full h bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                Sold Out
                            </p>
                        </div>
                    </Link>
                )}
                <style>{customStyle}</style>
                <div className="w-full flex justify-center overflow-hidden relative">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <img
                            src={productImg + item?.image[0]}
                            alt="Mountain"
                            className=" p-2  min-w-[100%] group-hover:scale-105 transition-all duration-300 ease-linear"
                        />
                    </Link>
                    <div
                        className="absolute top-1/2 -translate-y-1/2 rounded-xl hidden group-hover:flex h-[60px] px-3 left-1/2 -translate-x-1/2  justify-start items-center bg-white"
                        onClick={() => setOpen(!open)}
                    >
                        <AiOutlineEye className="text-3xl text-[var(--text-color)]" />
                    </div>
                </div>
                <div className="">
                    <div className="p-5 bg-white ">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <h6
                                className="text-lg font-bold"
                                style={{
                                    height: '30px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    width: '130px',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item?.name}
                            </h6>
                            {Array.isArray(category) &&
                                category?.length > 0 && (
                                    <p
                                        className="text-sm"
                                        style={{
                                            height: '30px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            width: '130px',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        <ProdMultiCategory
                                            category={category}
                                            linkOff
                                        />
                                    </p>
                                )}
                        </Link>

                        <Rate rating={parsedRating} />
                        <div className="flex justify-between items-center gap-2 flex-wrap">
                            <div className="flex gap-4 xl:gap-4 md:gap-4 lg:gap-4">
                                <div className="font-semibold text-base">
                                    <BDT />
                                    {price}
                                </div>
                                {priceLineThrough && (
                                    <p className="line-through text-gray-400">
                                        {' '}
                                        <BDT
                                            price={numberParser(
                                                item?.regular_price
                                            )}
                                        />
                                    </p>
                                )}
                            </div>

                            {productAvailablity && (
                                <div>
                                    <button
                                        className="rounded-lg py-2 px-6 btnCustom font-bold flex gap-4 justify-between item-center text-[var(--text-color)] bg-[var(--header-color)]"
                                        onClick={handleAddToCart}
                                    >
                                        <AiOutlineShoppingCart className="mt-1 ml-2 xl:ml-0  text-base" />{' '}
                                        {'Add'}{' '}
                                    </button>
                                </div>
                            )}

                            {/* show unit range in card bottom */}
                            <div>
                                {item?.variant?.length > 0 &&
                                    (() => {
                                        const volumes = item.variant.map(
                                            (v: any) => v.volume
                                        );
                                        const minVolume = Math.min(...volumes);
                                        const maxVolume = Math.max(...volumes);

                                        return minVolume === 0 &&
                                            maxVolume === 0 ? null : (
                                            <div className="">
                                                <p>
                                                    <b>Unit:</b> {minVolume} -{' '}
                                                    {maxVolume}{' '}
                                                    {item.variant[0]?.unit}
                                                </p>
                                            </div>
                                        );
                                    })()}
                            </div>
                        </div>
                    </div>
                </div>

                <span className="absolute  bg-gray-800 text-white p-2 text-sm rounded-tl-[20px] rounded-br-[20px] top-0 right-[380px] pl-6 bottom-50 w-[80px] left-0">
                    New
                </span>
            </div>

            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </>
    );
};

export default Card21;
