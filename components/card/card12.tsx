import Link from 'next/link';

import { productImg } from '@/site-settings/siteUrl';

import BDT from '@/utils/bdt';
import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

const Card12 = ({ item }: any) => {
    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    return (
        <div className="max-w-sm bg-white rounded hover:rounded-xl hover:shadow-md hover:-translate-y-2 transition-all duration-300 ease-linear border">
            <div>
                <Link href={'/product/' + item?.id + '/' + item?.slug}>
                    <img
                        src={productImg + item.image[0]}
                        className=" h-auto rounded-t-lg min-w-[100%] "
                        alt="Mountain"
                    />
                </Link>
            </div>

            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="p-5 font-seven">
                    <h6
                        className="text-base text-gray-800 font-bold"
                        style={{
                            height: '30px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            width: '130px',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {capitalizeFirstLetter(item?.name)}
                    </h6>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 xl:gap-4 md:gap-4 lg:gap-4">
                        <div className="text-base font-semibold">
                            <BDT price={price} />{' '}
                        </div>
                        <div className="line-through text-gray-400 text-sm">
                            <h1 className="">
                                {priceLineThrough ? (
                                    <p className="line-through text-gray-400">
                                        {' '}
                                        <BDT
                                            price={numberParser(
                                                item?.regular_price
                                            )}
                                        />
                                    </p>
                                ) : null}
                            </h1>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card12;
