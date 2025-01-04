'use client';

import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import QuikView from '@/utils/quick-view';
import Rate from '@/utils/rate';

import { numberParser } from '@/helpers/numberParser';
import BDT from '@/utils/bdt';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../_product-details-page/components/details';

const Card16 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { design } = home || {};

    const dispatch = useDispatch();

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
  .search-hover:hover {
      color:  ${textColor};
      background: ${bgColor};
  }
  .cart:hover {
      color:  ${bgColor};
  }
}
`;

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

    return (
        <div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                className="max-w-sm rounded overflow-hidden shadow-xl group relative border border-transparent "
            >
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                                Out of Stock
                            </p>
                        </div>
                    </Link>
                )}

                <style>{styleCss}</style>
                <div
                    className="search-hover absolute top-[35%] lg:cursor-pointer left-[50%] translate-x-[-50%] h-12 w-12 bg-white rounded-full duration-5000 hidden lg:group-hover:block"
                    onClick={() => setOpen(!open)}
                >
                    <AiOutlineSearch className="text-xl mt-4 ml-[14px]" />
                </div>
                <div>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            className="min-w-full h-auto"
                            src={productImg + item?.image[0]}
                            alt="productImage"
                        />
                    </Link>
                    <div className="py-6 px-3 space-y-2">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <h3 className=" cart font-sans text-sm text-gray-800 font-bold antialiased whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                                {item?.name}
                            </h3>
                        </Link>
                        <div className="antialiased mb-2 lg:group-hover:hidden flex items-center gap-2">
                            <div className="">
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
                        <div className="duration-5000 cart mb-2 lg:hidden lg:group-hover:flex flex flex-row flex-wrap justify-between sm:gap-0 gap-2">
                            {productAvailablity && (
                                <div
                                    className="flex gap-1 items-center border-b-2 border-black lg:cursor-pointer w-max"
                                    onClick={handleAddToCart}
                                >
                                    <BsPlusLg className="text-xs " />
                                    <p className="text-xs font-medium">
                                        ADD TO CART
                                    </p>
                                </div>
                            )}
                            <Rate rating={parsedRating} />
                        </div>
                    </div>
                </div>
            </motion.div>
            <QuikView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuikView>
        </div>
    );
};

export default Card16;
