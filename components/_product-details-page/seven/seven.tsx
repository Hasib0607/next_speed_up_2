'use client';

import SectionHeadingSeven from '@/components/section-heading/section-heading-seven';
import SkeletonWrapper from '@/components/skeleton-wrapper';

import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';

import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';

import Heading from '@/utils/heading';

import Details from '../components/details';
import VideoPlayer from '../components/video-player';

const Seven = ({ store_id, productId }: any) => {
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

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p>Loading related...</p>;
    }


    return (
        <div className="container px-5">
            <Heading title={product?.name} />
            {detailsContentSkeleton}
            <Details product={product}>
                <div className="h-[1px] bg-gray-300 w-full "></div>
                <div className="flex flex-col space-y-3 font-seven">
                    <SkeletonWrapper
                        fetchStatus={productDetailsLoading}
                        width={'100px'}
                    >
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                SKU:
                            </span>
                            {product?.SKU}
                        </p>
                    </SkeletonWrapper>

                    <SkeletonWrapper
                        fetchStatus={productDetailsLoading}
                        width={'100px'}
                    >
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                Category:
                            </span>{' '}
                            {product?.category}
                        </p>
                    </SkeletonWrapper>

                    {product?.tags && (
                        <SkeletonWrapper
                            fetchStatus={productDetailsLoading}
                            width={'100px'}
                        >
                            <p className="text-sm text-[#5a5a5a] font-seven">
                                <span className="font-semibold text-[#212121] font-seven">
                                    Tags:
                                </span>{' '}
                                {product?.tags}
                            </p>
                        </SkeletonWrapper>
                    )}
                </div>
                <div className="h-[1px] bg-gray-300 w-full "></div>
                <According
                    text={'Product Details'}
                    desc={product?.description}
                />
                <According
                    text={'Customer Reviews'}
                    desc={reviews?.error ? reviews.error : reviews}
                />
            </Details>

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}
            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default Seven;

const According = ({ text, desc }: any) => {
    const [show, setShow] = useState(false);
    return (
        <AnimatePresence>
            <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold"
            >
                <div className="h3 font-seven">{text}</div>
                {show ? <MinusIcon width={25} /> : <PlusIcon width={25} />}
            </div>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="font-seven"
                >
                    {desc[0]?.id ? (
                        <div>
                            {desc.length === 0 ? (
                                <div className="flex flex-1 justify-center items-center">
                                    <h3 className="text-xl font-sans font-bold">
                                        No Found Review
                                    </h3>
                                </div>
                            ) : (
                                desc?.map((item: any) => (
                                    <UserReview key={item?.id} review={item} />
                                ))
                            )}
                        </div>
                    ) : (
                        <DangerouslySafeHTML content={desc} />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);
    return (
        <div className=" bg-slate-50 p-5">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={profileImg + review?.image}
                        className="rounded-full h-full w-full"
                        alt=""
                    />
                </div>
            </div>
            <Rate className="text-base" rating={parsedRating} />
            <p className="text-xs font-semibold mt-2">{review?.name}</p>
            <p className="text-sm font-light mt-2">
                {moment(new Date(review?.cd)).format('DD/MM/YYYY')}
            </p>
            <p className="text-base font-semiBold mt-2">{review?.comment}</p>
        </div>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="shcow-lg py-5 sm:py-10 rounded-md bg-white px-3">
            <div className="my-5 pt-1 flex justify-between items-center">
                {/* <SectionHeadingSeven title={"Related Products"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow> */}
            </div>
            <div className="">
                {/* <SliderFive prevEl={prev} nextEl={next}>
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <ProductCardTwo item={item} /> it was commented out
              <Card12 item={item} />
            </SwiperSlide>
          ))}
        </SliderFive> */}
            </div>
        </div>
    );
};
