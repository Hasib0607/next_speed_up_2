'use client';

import Card54 from '@/components/card/card54';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import DefaultSlider from '@/components/slider/default-slider';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';

import Skeleton from '@/components/loaders/skeleton';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { numberParser } from '@/helpers/numberParser';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import Details from '../components/details-two';
import VideoPlayer from '../components/video-player';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';

const Four = ({ store_id, productId }: any) => {
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
    const reviewsArr = reviews?.data || [];

    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
          {detailsContentSkeleton}
            <Details product={product} social/>

            {/* ************************ tab component start ***************************** */}
            <div className="">
                <TabGroup>
                    <TabList className="fiveBorder space-x-4 sm:py-10 py-5 mt-10">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? ' text-xl font-semibold  text-black border-0  border-b-2 border-black'
                                    : 'bg-white text-black text-lg fiveUn '
                            }
                        >
                            Description
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? ' text-xl font-semibold  text-black border-0  border-b-2 border-black'
                                    : 'bg-white text-black text-lg fiveUn'
                            }
                        >
                            Reviews
                        </Tab>
                    </TabList>
                    <TabPanels className="mb-8">
                        <TabPanel>
                            <div className="p-5 ">
                                <DangerouslySafeHTML
                                    content={product?.description}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {reviews?.status && reviewsArr.length > 0
                                ? reviewsArr?.map((item: any, index: any) => (
                                      <UserReview review={item} key={index} />
                                  ))
                                : reviews?.message}
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
            {/* ************************ tab component end ***************************** */}

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default Four;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <div className="flex items-center  border-b pb-5 my-4 border-gray-200 sm:flex-row flex-col">
            <div className="flex flex-col  items-center sm:w-32 sm:h-32 h-20 w-20 sm:mr-10">
                <div className="avatar">
                    <div className="w-20 h-20 rounded-full">
                        <img
                            src={profileImg + review?.image}
                            className="rounded-full h-full w-full"
                            alt=""
                        />
                    </div>
                </div>
                <h5 className="text-black font-semibold text-center items-center">
                    {review?.name}
                </h5>
                <p className="text-xs text-black text-center ">
                    {moment(new Date(review?.cd)).format('DD/MM/YYYY')}
                </p>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <Rate rating={parsedRating} />
                <p className="leading-relaxed text-lg font-semibold text-black mb-2">
                    {review?.comment}
                </p>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-black">
                        {new Date(review?.cd).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="sm:py-10 py-5 ">
            <div className="my-5 pt-1 flex justify-between items-center">
                <SectionHeadingFive title={'Related product'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        350: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card54 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
