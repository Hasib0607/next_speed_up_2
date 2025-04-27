'use client';

import { useState } from 'react';
import {
    howMuchSave,
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuikView from '@/utils/quick-view';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';
import { FaCartPlus } from 'react-icons/fa';

const Card75 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const category = item?.category || [];

    const dispatch = useDispatch();

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const styleCss = `
    .searchHover:hover {
      color:  ${textColor};
      background: ${bgColor};
      }
      .text-hover:hover {
        color:  ${bgColor};
        }
    `;

    const [hoverCard, setHoverCard] = useState(false);
    const [open, setOpen] = useState<any>(false);

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
    const productAvailablity = isAvailable(item);
    const save = howMuchSave(item);

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

    return (
        <div>
            <style>{styleCss}</style>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                style={{
                    border: hoverCard ? `1px solid ${bgColor}` : '',
                }}
                onMouseEnter={() => setHoverCard(true)}
                onMouseLeave={() => setHoverCard(false)}
                className="overflow-hidden shadow-sm group border border-transparent relative"
            >
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-500 text-white px-2 py-1 w-max">
                                Out of Stock
                            </p>
                        </div>
                    </Link>
                )}
                <div className="absolute top-2 left-2 text-white bg-black rounded-sm px-2 text-xs py-1">
                    <p>{item?.product_offer?.status ? 'OFFER' : 'NEW'}</p>
                </div>
                <div className="relative">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            className="min-w-full h-auto"
                            src={productImg + item?.image[0]}
                            alt={item?.name}
                        />
                    </Link>
                </div>

                {productAvailablity && (
                    <div className="absolute z-[3] top-0 right-0 bg-[#ee2f48] px-[8px] py-[3px] h-[22px] text-white flex justify-center items-center text-xs">
                        <p>SALE</p>
                    </div>
                )}

                <div className="space-y-2 flex justify-center flex-col items-center">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h3 className="text-gray-800 font-bold antialiased whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h3>
                    </Link>

                    {productAvailablity && save > 0 && (
                        <div className="bg-[var(--header-color)] px-[5px] py-[2px] h-[22px] text-[var(--text-color)] flex justify-center items-center text-xs font-semibold">
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

                    <div className="flex flex-col items-center gap-1 w-full">
                        <div className="text-base antialiased flex items-center gap-2">
                            {priceLineThrough && (
                                <p className="line-through text-gray-400">
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                            <div className="">
                                <BDT />
                                {price}
                            </div>
                        </div>
                        {productAvailablity && (
                            <div
                                className="py-2 w-full font-semibold lg:cursor-pointer bg-[var(--header-color)] text-[var(--text-color)]"
                                onClick={handleAddToCart}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaCartPlus />
                                    <p className="text-xs">Add to Cart</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card75;
