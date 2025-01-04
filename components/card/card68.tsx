'use client';

import { howMuchSave, isAvailable, productCurrentPrice } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import ProdMultiCategory from '@/utils/prod-multi-category';

import Link from 'next/link';
import { useSelector } from 'react-redux';

const Card68 = ({ item }: any) => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const category = item?.category || [];

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);
    const productAvailablity = isAvailable(item);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
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
        <div className="bg-white relative group">
            <div className="">
                <style>{styleCss}</style>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <div className="relative shine overflow-hidden hover:rotate-1 hover:shadow-2xl duration-[2000ms] ease-in rounded-md">
                        <img
                            src={productImg + item.image[0]}
                            alt=""
                            className="h-auto min-w-full object-center object-cover group-hover:scale-110 duration-1000"
                        />
                        <div className="absolute bottom-3 right-3 bg-color text-white z-[2] px-4 py-1 rounded-lg text-sm">
                            {!productAvailablity ? 'Out of stock' : 'Sale'}
                        </div>
                    </div>
                </Link>

                <div className="text-gray-700 text-base py-3">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {' '}
                        <h1 className="text-sm sm:text-[15px] capitalize truncate">
                            {item?.name}
                        </h1>
                    </Link>
                    {Array.isArray(category) && category?.length > 0 && (
                        <p className="text-sm sm:text-[15px] capitalize">
                            <ProdMultiCategory
                                category={category}
                                className={'text-gray-500'}
                                count={1}
                            />
                        </p>
                    )}
                </div>

                <div className="font-semibold flex items-center gap-2 w-full">
                    {save > 0 && (
                        <p className="line-through text-gray-400 text-xs">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                    <div className="text-sm text-red-500">
                        <BDT />
                        {price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card68;
