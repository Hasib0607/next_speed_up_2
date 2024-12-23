import Link from 'next/link';

import { productImg } from '@/site-settings/siteUrl';

import BDT from '@/utils/bdt';

const Card12 = ({ item }: any) => {
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
                        {item?.name.charAt(0).toUpperCase() +
                            item?.name.slice(1)}
                    </h6>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 xl:gap-4 md:gap-4 lg:gap-4">
                        <div className="text-base font-semibold">
                            <BDT
                                price={
                                    item?.product_offer?.status
                                        ? item?.product_offer?.offer_price
                                        : item?.regular_price
                                }
                            />{' '}
                        </div>
                        <div className="line-through text-gray-400 text-sm">
                            <h1 className="">
                                {!item?.product_offer?.status &&
                                (item?.discount_type === 'no_discount' ||
                                    item?.discount_price === '0.00') ? (
                                    ' '
                                ) : (
                                    <p>
                                        <BDT
                                            price={Math.trunc(
                                                item?.regular_price
                                            )}
                                        />
                                    </p>
                                )}
                            </h1>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card12;
