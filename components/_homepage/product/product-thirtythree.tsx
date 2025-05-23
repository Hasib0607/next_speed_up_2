'use client';

import Details from '@/components/_product-details-page/components/details';
import SectionHeadingThirtyThree from '@/components/section-heading/section-heading-thirtythree';
import {
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';

import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';
import Rate from '@/utils/rate';
import Link from 'next/link';
import { useState } from 'react';

const ProductThirtyThree = ({
    product,
    design,
    best_sell_product,
    feature_product,
    headersetting,
}: any) => {
    const styleCss = `
    .title-border {
        margin: 0;
        padding-bottom: 1px;
        position: relative;
        width: 100%;
    }
    
    .title-border:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;
        content: '';
        bottom: 0;
        right: 0;
        left: 0;
    }
    `;

    const { custom_design } = headersetting || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 gap-10 ">
                <div>
                    <div className="title-border ">
                        <SectionHeadingThirtyThree title={'Best Seller'} />
                    </div>
                    <div className="pt-5">
                        <div className="grid grid-cols-1 gap-5">
                            {best_sell_product?.length > 0 &&
                                best_sell_product
                                    ?.slice(0, 4)
                                    ?.map((item: any, id: any) => (
                                        <Card item={item} key={id} />
                                    ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="title-border ">
                        <SectionHeadingThirtyThree
                            title_color={title_color || '#000'}
                            title={title || 'Top Selling'}
                        />
                    </div>
                    <div className="pt-5">
                        <div className="grid grid-cols-1 gap-5">
                            {feature_product?.length > 0 &&
                                feature_product
                                    ?.slice(0, 4)
                                    ?.map((item: any, id: any) => (
                                        <Card item={item} key={id} />
                                    ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="title-border ">
                        <SectionHeadingThirtyThree title={'Recently Added'} />
                    </div>
                    <div className="pt-5">
                        <div className="grid grid-cols-1 gap-5">
                            {product?.length > 0 &&
                                product
                                    ?.slice(0, 4)
                                    ?.map((item: any, id: any) => (
                                        <Card item={item} key={id} />
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductThirtyThree;

const Card = ({ item }: any) => {
    const [open, setOpen] = useState(false);
    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);

    return (
        <>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="grid grid-cols-3 h-32 gap-4">
                    <div className="" onClick={() => setOpen(!open)}>
                        <img
                            src={productImg + item.image[0]}
                            alt="Mountain"
                            className="h-28 w-28 "
                        />
                    </div>
                    <div className=" flex flex-col gap-3 col-span-2">
                        <div>
                            <h6 className="text-base capitalize font-semibold font-twelve text-gray-500">
                                {item.name.slice(0, 14)}
                                {item.name.length > 14 && '...'}
                            </h6>
                            <Rate rating={item?.rating} />
                        </div>

                        <div className="text-gray-600 text-lg font-semibold flex gap-5">
                            <p>
                                <BDT /> {price}
                            </p>
                            {priceLineThrough && (
                                <h1 className="line-through ">
                                    {item.discount_type === 'no_discount' ||
                                    item.discount_price === '0.00' ? (
                                        ' '
                                    ) : (
                                        <p>
                                            {' '}
                                            <BDT /> {item.regular_price}
                                        </p>
                                    )}
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
            <QuickView open={open} setOpen={setOpen}>
                <Details product={item} />
            </QuickView>
        </>
    );
};
