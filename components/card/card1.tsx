'use client';

import {
    classNames,
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';

import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import BDT from '@/utils/bdt';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImPlus } from 'react-icons/im';

const Card1 = ({ item }: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();
    const router = useRouter();

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const handleAddToCart = () => {
        if (item?.variant?.length > 0) {
            router.push(`/product/${item?.id}/${item?.slug}`);
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
        .text-hover:hover {
        color: var(--header-color);
        }
        .search-icon:hover {
            color: var(--text-color);
            background: var(--header-color);
        }
    `;

    const fallbackBtnStyle = 'text-sm font-normal py-[2px] px-2 max-w-32';

    return (
        <div className="flex w-full py-2 gap-x-4">
            <style>{styleCss}</style>
            <div className="w-50% md:w-[26%] flex justify-start">
                <div className="size-36 md:size-44 lg:size-48">
                    <Image
                        src={productImg + item?.image?.[0]}
                        alt=""
                        className="h-full w-full object-cover object-center"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 w-50% md:w-[74%]">
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <h1 className="text-md font-normal text-gray-700 capitalize line-clamp-2">
                        {item?.name}
                    </h1>
                </Link>
                <div className="flex justify-start items-baseline gap-x-2">
                    <p className="space-x-1">
                        <span>
                            <BDT />
                        </span>
                        <span className="text-md font-bold">{price} </span>
                    </p>{' '}
                    {save > 0 && (
                        <p className="text-gray-500 font-thin text-sm line-through space-x-1">
                            <span>
                                <BDT />
                            </span>
                            <span className="text-md">
                                {numberParser(item?.regular_price)}
                            </span>
                        </p>
                    )}
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!productAvailablity}
                    className={classNames(
                        fallbackBtnStyle,
                        'bg-black text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700'
                    )}
                >
                    <p className="center gap-2">
                        <ImPlus />
                        {'Add to Cart'}
                    </p>
                </button>
            </div>
        </div>
    );
};

export default Card1;
