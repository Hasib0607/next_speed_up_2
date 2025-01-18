'use client';

import Card51 from '@/components/card/card51';
import DefaultSlider from '@/components/slider/default-slider';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';

import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { SwiperSlide } from 'swiper/react';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { RiRefund2Line } from 'react-icons/ri';
import { TbTruckReturn, TbWorld } from 'react-icons/tb';
import DetailsEighteen from '../components/details-eighteen';
import { HTML_TAG_PATTERN } from '@/consts';
import VideoPlayer from '../components/video-player';
import { NotFoundMsg } from '@/utils/little-components';

const TwentySeven = ({ store_id, productId, design }: any) => {
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
        <div className="pt-10 md:container xl:px-20 px-5">
            {detailsContentSkeleton}
            <DetailsEighteen product={product} design={design} social>
                <div className="space-y-3">
                    <According
                        text={'Description'}
                        description={product?.description}
                    />
                    <According
                        text={'Customer Reviews'}
                        description={reviews}
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="bg-[#FEF2F2] h-28 w-full rounded-md flex flex-col justify-center pl-5">
                        <FaShippingFast className="text-2xl" />
                        <p className="font-bold mt-1">Free shipping</p>
                        <p className="text-sm text-gray-600">
                            On orders over BDT 5000.00
                        </p>
                    </div>
                    <div className="bg-[#F0F9FF] h-28 w-full rounded-md flex flex-col justify-center pl-5">
                        <TbTruckReturn className="text-2xl" />
                        <p className="font-bold mt-1">Very easy to return</p>
                        <p className="text-sm text-gray-600">
                            Just phone number.
                        </p>
                    </div>
                    <div className="bg-[#F0FDF4] h-28 w-full rounded-md flex flex-col justify-center pl-5">
                        <TbWorld className="text-2xl" />
                        <p className="font-bold mt-1">Nationwide Delivery</p>
                        <p className="text-sm text-gray-600">
                            Fast delivery nationwide.
                        </p>
                    </div>
                    <div className="bg-[#FFFBEB] h-28 w-full rounded-md flex flex-col justify-center pl-5">
                        <RiRefund2Line className="text-2xl" />
                        <p className="font-bold mt-1">Refunds policy</p>
                        <p className="text-sm text-gray-600">
                            60 days return for any reason
                        </p>
                    </div>
                </div>
            </DetailsEighteen>
            <div className="py-7">
                {product && product?.video_link && (
                    <VideoPlayer videoUrl={product?.video_link} />
                )}
            </div>
            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default TwentySeven;

const According = ({ text, description }: any) => {
    const [show, setShow] = useState(false);
    const isDescription = HTML_TAG_PATTERN.test(description);
    let reviewsArr = description?.data || [];

    return (
        <>
            {isDescription ? (
                <AnimatePresence>
                    <div
                        onClick={() => setShow(!show)}
                        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold bg-gray-100 px-3 py-1 rounded-md"
                    >
                        <div className="h3 font-seven">{text}</div>
                        {show ? (
                            <MinusIcon width={25} />
                        ) : (
                            <PlusIcon width={25} />
                        )}
                    </div>
                    {show && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="font-seven"
                            key={text}
                        >
                            <DangerouslySafeHTML content={description} />
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <AnimatePresence>
                    <div
                        onClick={() => setShow(!show)}
                        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold bg-gray-100 px-3 py-1 rounded-md"
                    >
                        <div className="h3 font-seven">{text}</div>
                        {show ? (
                            <MinusIcon width={25} />
                        ) : (
                            <PlusIcon width={25} />
                        )}
                    </div>
                    {show && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="font-seven"
                            key={text}
                        >
                            {description?.status && reviewsArr.length > 0 ? (
                                reviewsArr?.map((item: any, index: any) => (
                                    <UserReview review={item} key={index} />
                                ))
                            ) : (
                                <NotFoundMsg message={description?.message} />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </>
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
            <Rate className={'text-base'} rating={parsedRating} />
            <p className="text-xs font-semibold mt-2">{review?.name}</p>
            <p className="text-sm font-light mt-2">
                Since {new Date(review?.ucd).getFullYear()}
            </p>
            <p className="text-base font-semiBold mt-2">{review?.comment}</p>
        </div>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="py-5 sm:py-10 rounded-md bg-white">
            <div className="my-10 pt-1 flex flex-col sm:flex-row justify-between sm:items-center">
                <p className="sm:text-2xl text-lg font-bold">
                    {' '}
                    Customers also purchased
                </p>
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
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1600: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card51 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
