'use client';

import {
    howMuchSave,
    isAvailable,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const Card61 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design, headersetting } = home || {};

    const { cartList } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

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

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  white;
        background: #83C341;
    }
    .text-color-thirty {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
        text-decoration: underline;
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-thirty-five {  
        background: ${bgColor};
    }

  `;

    const cDesign = headersetting?.custom_design || {};
    const featureProduct = cDesign?.feature_product?.[0] || {};
    const { button = 'Default Button' } = featureProduct;

    return (
        <div className="group overlay-group relative">
            <div className="">
                <style>{styleCss}</style>
                <div className="relative">
                    <div className="relative overflow-hidden w-full h-full px-6 border border-black shadow-[5px_5px_1px_1px_black]">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <img
                                src={productImg + item.image[0]}
                                alt=""
                                className="h-auto min-w-full object-center object-cover hover:scale-105 transform transition duration-700 ease-in-out"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 pb-3 pt-6">
                        <div className="font-medium flex justify-between items-center flex-wrap">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <h1 className="text-gray-700 text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[120px]">
                                    {item?.name}
                                </h1>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            {save > 0 && (
                                <p className="line-through text-xs text-color-thirty">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                            <div className="text-sm py-1 rounded-lg text-[#83C341] font-bold">
                                <BDT />
                                {price}
                            </div>
                        </div>

                        {!productAvailablity ? (
                            <div className="relative lg:cursor-pointer font-bold">
                                <p className="lg:text-lg text-base relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black">
                                    Out of stock
                                </p>
                                <div className="absolute top-1.5 left-1.5 group-hover:top-0 group-hover:left-0 duration-500 z-[1] h-full w-full cart-thirty-five border border-black"></div>
                            </div>
                        ) : (
                            <div>
                                {item?.variant?.length > 0 ? (
                                    <Link
                                        href={
                                            '/product/' +
                                            item?.id +
                                            '/' +
                                            item?.slug
                                        }
                                    >
                                        <div className="relative lg:cursor-pointer font-bold">
                                            <p className="lg:text-lg text-base relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black">
                                                {'View details'}
                                            </p>
                                            <div className="absolute top-1.5 left-1.5 group-hover:top-0 group-hover:left-0 duration-500 z-[1] h-full w-full cart-thirty-five border border-black"></div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        onClick={handleAddToCart}
                                        className="relative lg:cursor-pointer font-bold"
                                    >
                                        <p className="lg:text-lg text-base relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black">
                                            {button}
                                        </p>
                                        <div className="absolute top-1.5 left-1.5 group-hover:top-0 group-hover:left-0 duration-500 z-[1] h-full w-full cart-thirty-five border border-black"></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card61;
