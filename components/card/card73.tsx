'use client';

import { productImg } from '@/site-settings/siteUrl';
import QuickView from '@/utils/quick-view';
import Link from 'next/link';
import { useState } from 'react';
import Details from '../_product-details-page/components/details';

const Card73 = ({ item }: any) => {
    const [open, setOpen] = useState(false);

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
                <div className="text-gray-700 bg-white text-base z-[2] absolute top-0 left-1/2 transform -translate-x-1/2 text-center px-3 rounded-b-lg shadow-md">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="hover:text-[var(--header-color)] text-sm sm:text-[15px] capitalize">
                            {item?.name}
                        </h1>{' '}
                    </Link>
                </div>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative overflow-hidden">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover rounded-xl"
                        />
                    </div>
                </Link>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </div>
    );
};

export default Card73;
