'use client';

import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';

import Link from 'next/link';
import { useState } from 'react';
import Details from '../_product-details-page/components/details';

const Card65 = ({ item }: any) => {
 const [open, setOpen] = useState(false);

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    const bgColor = 'var(--header-color)';
    const textColor = 'var(--text-color)';

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
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
        background: transparent;
        border: 1px solid ${bgColor};
    }
  `;

    return (
        <div className="bg-white relative rounded-md overflow-hidden">
            {save > 0 && (
                <div className="absolute top-3 left-0 bg-[#6E2594] text-white z-[2] px-2 py-1 rounded-r-full text-xs">
                    Save: {save} BDT
                </div>
            )}
            <div className="">
                <style>{styleCss}</style>
                {/* out of stock  */}
                {item?.quantity === '0' && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
                        <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            Out of Stock
                        </p>
                    </div>
                )}
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover border-b-2"
                        />
                    </div>
                </Link>

                <div className="text-gray-700 text-base sm:px-5 px-2 pt-3 pb-14">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="hover:text-red-500 hover:underline text-sm sm:text-[15px] capitalize">
                            {item?.name}
                        </h1>{' '}
                    </Link>
                </div>

                <div className="font-semibold absolute bottom-5 sm:left-5 left-2 flex items-center gap-2 w-full group-hover:opacity-0 duration-500">
                    <div className="text-sm text-red-500">
                        <BDT />
                        {price}
                    </div>
                    {save > 0 && (
                        <p className="line-through text-gray-500  text-xs ">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card65;
