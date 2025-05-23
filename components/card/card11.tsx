import Link from 'next/link';

import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import ProdMultiCategory from '@/utils/prod-multi-category';

const Card11 = ({ item }: any) => {
    const category = item?.category || [];

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    return (
        <>
            <div className="group rounded-lg">
                <div className="p-2 bg-gray-200 rounded-t-lg">
                    <div className="flex justify-center overflow-hidden">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            <img
                                src={productImg + item.image[0]}
                                alt="Mountain"
                                className="h-auto min-w-full object-cover group-hover:scale-105  transition-all duration-300 ease-linear"
                            />
                        </Link>
                    </div>
                </div>

                <div className="p-5 bg-white font-seven">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h6 className="text-base text-gray-800 font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h6>{' '}
                    </Link>
                    {Array.isArray(category) && category?.length > 0 && (
                        <ProdMultiCategory category={category} count={1} />
                    )}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 xl:gap-4 md:gap-4 lg:gap-4">
                        <div className="text-base font-semibold">
                            <BDT price={price} />{' '}
                        </div>
                        <div className="line-through text-gray-400 text-sm">
                            <h1 className="">
                                {priceLineThrough && (
                                    <div>
                                        <BDT
                                            price={Math.trunc(
                                                item?.regular_price
                                            )}
                                        />
                                    </div>
                                )}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card11;
