'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { productImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import BDT from '@/utils/bdt';
import { isAvailable, productCurrentPrice } from '@/helpers/littleSpicy';

const ProductCardFortyOne = ({ item }: any) => {
  
    const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];
    const [variant, setVariant] = useState<any>([]);

    useEffect(() => {
        const variantImage =
            item?.variant?.length > 0 && item?.variant?.[0]?.color == null
                ? true
                : false;

        if (variantImage) {
            setVariant(item?.variant);
        } else {
            const uniqueColors = item?.variant?.reduce(
                (acc: any, current: any) => {
                    if (
                        !acc.some((item: any) => item.color === current.color)
                    ) {
                        acc.push({
                            ...current,
                            color: current.color,
                            image: current.color_image,
                        });
                    }
                    return acc;
                },
                []
            );
            setVariant(uniqueColors);
        }
    }, [item]);

    const price = productCurrentPrice(item);
    const productAvailablity = isAvailable(item);

    return (
        <div className="group lg:cursor-pointer">
            <div className="drop-shadow-xl w-full relative">
                {/* out of stock  */}
                {!productAvailablity && (
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                            <p className="bg-red-600 text-white px-2 py-1 w-max">
                                Out of Stock
                            </p>
                        </div>
                    </Link>
                )}

                <figure className="min-w-full h-auto relative overflow-hidden ">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <motion.img
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 1 },
                            }}
                            exit={{
                                scale: 1,
                                transition: { duration: 1 },
                            }}
                            src={productImg + item?.image[0]}
                            alt="Shoes"
                            className="w-full h-full group-hover:hidden group-hover:scale-105 transition-all duration-500 ease-linear "
                        />
                    </Link>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <motion.img
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 1 },
                            }}
                            exit={{
                                scale: 1,
                                transition: { duration: 1 },
                            }}
                            src={productImg + secondImg}
                            alt="Shoes"
                            className="w-full h-full group-hover:block group-hover:scale-105 transition-all duration-500 ease-linear hidden "
                        />
                    </Link>
                </figure>
                <div className="card-body p-4 bg-white">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <p className="text-center">
                            {item?.name?.slice(0, 18)}{' '}
                            {item?.name?.length > 18 ? '...' : null}
                        </p>
                    </Link>

                    <h6 className="text-lg font-medium flex items-center justify-center">
                        <BDT price={price} />
                    </h6>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {variant?.map(
                            (item: any, index: number) =>
                                item?.image && (
                                    <img
                                        key={index}
                                        src={productImg + item?.image}
                                        alt=""
                                        className="w-8 lg:w-12 rounded border border-red-700"
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardFortyOne;
