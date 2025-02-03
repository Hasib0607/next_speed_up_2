'use client';

import Card22 from '@/components/card/card22';
import SectionHeadingSeven from '@/components/section-heading/section-heading-seven';
import DefaultSlider from '@/components/slider/default-slider';
import Arrow from '@/utils/arrow';
import Skeleton from '@/components/loaders/skeleton';

import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';

import ProdMultiCategory from '@/utils/prod-multi-category';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import Details from '../components/details-two';
import VideoPlayer from '../components/video-player';
import According from '@/components/_product-details-page/components/according';

const Nine = ({ store_id, productId }: any) => {
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

    const {
        data: reviewsData,
        isLoading: reviewsLoading,
        isError: reviewsError,
        isSuccess: reviewsSuccess,
    } = useGetReviewsQuery({ productId });

    const [product, setProduct] = useState<any>({});
    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [reviews, setReviews] = useState<any>({});

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

    useEffect(() => {
        if (reviewsSuccess && reviewsData) {
            setReviews(reviewsData);
        }
    }, [reviewsData, reviewsSuccess]);

    const category = product?.category || [];

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p>Loading related...</p>;
    }
    // const reviewsArr = reviews?.data || [];

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            {detailsContentSkeleton}
            <Details product={product} social>
                <div className="h-[1px] bg-gray-300 w-full my-3"></div>
                <div className="flex flex-col space-y-3 font-seven">
                    <p className="text-sm text-[#5a5a5a] font-seven">
                        <span className="font-semibold text-[#212121] font-seven">
                            SKU:
                        </span>{' '}
                        {product?.SKU}
                    </p>
                    {Array.isArray(category) && category?.length > 0 && (
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                Category:
                            </span>{' '}
                            <ProdMultiCategory category={category} />
                        </p>
                    )}
                    {product?.tags && (
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                Tags:
                            </span>{' '}
                            {product?.tags}
                        </p>
                    )}
                </div>
                <div className="h-[1px] bg-gray-300 w-full my-3"></div>
                <According
                    text={'Product Details'}
                    description={product?.description}
                />
                <According text={'Customer Reviews'} description={reviews} />
            </Details>

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default Nine;

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="px-5 shadow-lg py-5 sm:py-10 rounded-md bg-white">
            <div className="my-5 pt-1 flex justify-between items-center">
                <SectionHeadingSeven title={'Related Products'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="">
                <DefaultSlider
                    breakpoints={{
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    prevEl={prev}
                    nextEl={next}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card22 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
