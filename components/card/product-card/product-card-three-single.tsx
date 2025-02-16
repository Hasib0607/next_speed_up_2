'use client';

import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import ProdMultiCategory from '@/utils/prod-multi-category';
import Link from 'next/link';

const ProductCardThreeSingleCard = ({ item }: any) => {
    const category = item?.category || [];

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    return (
        <div className="col-span-1 xl:col-span-2 lg:col-span-2 rounded-lg bg-gray-200 group relative">
            {item ? (
                <div className="">
                    <div className="lg:h-[800px] w-full overflow-hidden flex justify-center items-center">
                        <div className="overflow-hidden w-full h-full">
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                <img
                                    src={productImg + item?.image[0]}
                                    alt="Mountain"
                                    className="h-full min-w-full object-cover group-hover:scale-105 transition-all duration-300 ease-linear"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="md:flex md:justify-between px-4 py-5">
                        <div>
                            <Link
                                href={'/product/' + item?.id + '/' + item?.slug}
                            >
                                {' '}
                                <p className="sm:text-lg font-bold">
                                    {item?.name?.slice(0, 12)}{' '}
                                    {item?.name?.length > 12 && '...'}
                                </p>{' '}
                            </Link>
                            {Array.isArray(category) &&
                                category?.length > 0 && (
                                    <p className="text-sm">
                                        <ProdMultiCategory
                                            category={category}
                                            className={'text-gray-500'}
                                            count={1}
                                        />
                                    </p>
                                )}
                        </div>
                        <div>
                            {save > 0 && (
                                <p className="line-through text-gray-400 text-sm">
                                    {' '}
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                            <div className="text-lg font-bold">
                                <BDT />
                                {price}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-2xl text-black flex items-center justify-center  h-[120px] xl:h-[520px] lg:h-[520px] md:h-[220px]">
                    <h2> Product Not Available</h2>
                </div>
            )}
        </div>
    );
};

export default ProductCardThreeSingleCard;
