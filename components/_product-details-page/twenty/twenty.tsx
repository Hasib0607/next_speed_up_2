'use client';

import Card44 from '@/components/card/card44';
import SectionHeadingEighteen from '@/components/section-heading/section-heading-eighteen';
import DefaultSlider from '@/components/slider/default-slider';

import Arrow from '@/utils/arrow';

import Skeleton from '@/components/loaders/skeleton';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
} from '@/redux/features/products/productApi';

import { useEffect, useState } from 'react';

import { SwiperSlide } from 'swiper/react';
import Details from '../components/details-eighteen';
import VideoPlayer from '../components/video-player';

const Twenty = ({ store_id, productId, design }: any) => {
    const {
        data: productDetailsData,
        isLoading: productDetailsLoading,
        isError: productDetailsError,
        isSuccess: productDetailsSuccess,
    } = useGetProductDetailsQuery({ store_id, productId });

    const {
        data: relatedProductsData,
        isLoading: relatedProductsLoading,
        isError: relatedProductsError,
        isSuccess: relatedProductsSuccess,
    } = useGetRelatedProductsQuery({ productId });

    const [product, setProduct] = useState<any>({});
    const [relatedProducts, setRelatedProducts] = useState<any>([]);

    useEffect(() => {
        if (productDetailsSuccess && productDetailsData) {
            const productData = productDetailsData?.data || {};
            setProduct(productData);
        }
    }, [productDetailsData, productDetailsSuccess]);

    useEffect(() => {
        if (relatedProductsSuccess && relatedProductsData) {
            const relatedProductsArr = relatedProductsData?.data || [];
            setRelatedProducts(relatedProductsArr);
        }
    }, [relatedProductsData, relatedProductsSuccess]);

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p>Loading related...</p>;
    }

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            {detailsContentSkeleton}
            <Details product={product} design={design} />

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}
            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default Twenty;

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="py-5 sm:py-10 rounded-md bg-white">
            <div className="my-5 pt-1 flex justify-between items-center">
                <SectionHeadingEighteen title={'Related Products'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        250: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        560: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1000: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1600: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card44 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
