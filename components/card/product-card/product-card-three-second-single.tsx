'use client';

import { numberParser } from '@/helpers/numberParser';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import Link from 'next/link';

const ProductCardThreeSecondSinglePage = ({ item }: any) => {
    const category = item?.category || [];

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    return (
        <div className="col-start-2 xl:col-span-1 lg:col-span-1 md:col-span-0 bg-gray-200 group rounded-lg">
            {item ? (
                <div className="">
                    <div className="lg:h-[800px] overflow-hidden flex justify-center items-center w-full">
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
                                <p className="text-lg font-bold">
                                    {item?.name?.slice(0, 15)}{' '}
                                    {item?.name?.length > 15 && '...'}
                                </p>
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

export default ProductCardThreeSecondSinglePage;
