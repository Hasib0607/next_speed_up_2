/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
'use client';

import Link from 'next/link';
import { catImg } from '@/site-settings/siteUrl';
import Card78 from '@/components/card/card78';
import Skeleton from '@/components/loaders/skeleton';
import { Product } from '@/types';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductFortyEightProps {
    category: {
        id: string;
        name: string;
        banner: string;
    }[];
}

const ProductFortyEight = ({ category }: ProductFortyEightProps) => {
    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <div className="flex flex-col gap-12">
                {category.map((item) => {
                    const { data, isLoading, isFetching } = useGetCategoryProductQuery({ id: item.id });
                    const products: Product[] = data?.data?.products || [];

                    return (
                        <div key={item.id} className="flex flex-col gap-5">
                            {/* Category Banner */}
                            <Link
                                href={`/category/${item.id}`}
                                className="relative w-full overflow-hidden group"
                            >
                                <img
                                    src={catImg + item.banner}
                                    className="min-h-[150px] min-w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    alt={item.name}
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-md uppercase">
                                        {item.name}
                                    </span>
                                </div>
                            </Link>

                            {/* Product Slider */}
                            {isLoading || isFetching ? (
                                <Skeleton count={6} />
                            ) : products.length > 0 ? (
                                <div className="relative">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation
                                        spaceBetween={10}
                                        slidesPerView={2}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 3,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                    >
                                        {products.map((product: Product) => (
                                            <SwiperSlide key={product.id}>
                                                <Card78
                                                    item={product}
                                                    type={'product'}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            ) : (
                                <div className="text-red-500 text-center py-10 text-xl">
                                    No Products Available
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductFortyEight;