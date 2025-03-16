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
import BDT from '@/utils/bdt';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImPlus } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';

const Card2 = ({ item }: any) => {
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

  `;

    const fallbackBtnStyle = 'text-sm font-normal py-[2px] px-2 w-full';

    return (
        <div className="flex flex-col gap-4 max-w-56">
            <style>{styleCss}</style>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="relative max-size-56 shadow-spread-forty-four">
                    <Image
                        src={productImg + item?.image?.[0]}
                        width={500}
                        height={500}
                        alt={item?.name}
                        loading="lazy"
                        className="w-full h-full object-center object-cover"
                    />
                    <div className="absolute left-[26%] -bottom-2 mx-auto">
                        <div className="flex items-baseline w-auto bg-white px-2 gap-2 rounded-md">
                            <div className="text-xs rounded-lg text-gray-900 space-x-1">
                                <span>
                                    <BDT />
                                </span>
                                <span className="text-sm font-bold">
                                    {price}
                                </span>
                            </div>
                            {save > 0 && (
                                <p className="line-through text-xs text-gray-400">
                                    {' '}
                                    <span>
                                        <BDT />
                                    </span>
                                    <span>
                                        {numberParser(item?.regular_price)}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="">
                    <button
                        onClick={handleAddToCart}
                        className={classNames(
                            fallbackBtnStyle,
                            'bg-black text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700'
                        )}
                        disabled={!productAvailablity}
                    >
                        <p className="center gap-2">
                        {productAvailablity && <ImPlus />}
                            {!productAvailablity ? 'Out of stock' : 'Add to Cart'}
                        </p>
                    </button>
            </div>
        </div>
    );
};

export default Card2;
