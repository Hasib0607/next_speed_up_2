'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card78 from '@/components/card/card78';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import Skeleton from '@/components/loaders/skeleton';
import { Product } from '@/types';

const CategoryProductSlider = ({ categoryId }: { categoryId: string }) => {
    const { data, isLoading, isFetching, isSuccess } = useGetCategoryProductQuery({ id: categoryId });

    if (isLoading || isFetching) {
        return <Skeleton count={6} />;
    }

    const products: Product[] = data?.data?.products || [];

    if (!products.length) {
        return <div className="text-red-500 text-center py-10 text-xl">No Products Available</div>;
    }

    return (
        <Swiper
            spaceBetween={15}
            slidesPerView={2}
            breakpoints={{
                480: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1440: { slidesPerView: 6 },
            }}
        >
            {products.map((product: Product) => (
                <SwiperSlide key={product.id}>
                    <Card78 item={product} card="74" btnType="product" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CategoryProductSlider;
