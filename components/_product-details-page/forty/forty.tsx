'use client';

import Card69 from '@/components/card/card69';
import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import DefaultSlider from '@/components/slider/default-slider';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';

import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { NotFoundMsg } from '@/utils/little-components';
import ProdMultiCategory from '@/utils/prod-multi-category';
import moment from 'moment';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { SwiperSlide } from 'swiper/react';
import VideoPlayer from '../components/video-player';
import DetailsForty from './details-forty';

const Forty = ({ store_id, productId, design, headersetting }: any) => {
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

    const { category } = product || [];

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
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <IoIosArrowForward className="text-xs mt-1" />
                <ProdMultiCategory category={category} count={1} />
                <IoIosArrowForward className="text-xs mt-1" />
                <p className="text-gray-500 font-medium truncate">
                    {product?.name}
                </p>
            </div>

            {detailsContentSkeleton}
            <DetailsForty
                design={design}
                product={product}
                headersetting={headersetting}
            >
                {Array.isArray(category) && category?.length > 0 && (
                    <div className="flex flex-col space-y-3">
                        <p className="text-base text-[#5a5a5a]">
                            <span className="font-semibold text-[#212121]">
                                Category:
                            </span>{' '}
                            <ProdMultiCategory category={category} />
                        </p>
                    </div>
                )}
            </DetailsForty>

            {/* ************************ tab component start ***************************** */}
            <div className="mt-14">
                <TabGroup>
                    <TabList className="fiveBorder text-xs sm:text-base">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'underline text-xl  underline-offset-8 text-black border-hidden '
                                    : 'bg-white text-black fiveUn '
                            }
                        >
                            Description
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'underline text-xl  underline-offset-8 text-black border-hidden ml-8'
                                    : 'bg-white text-black fiveUn ml-8'
                            }
                        >
                            Reviews
                        </Tab>
                    </TabList>

                    <TabPanels className="mb-8">
                        <TabPanel>
                            <div className="p-5">
                                <DangerouslySafeHTML
                                    content={product?.description}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {reviews?.status && reviewsArr.length > 0 ? (
                                reviewsArr?.map((item: any, index: any) => (
                                    <UserReview review={item} key={index} />
                                ))
                            ) : (
                                <NotFoundMsg message={reviews?.message} />
                            )}
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

export default Forty;

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
        <div className="py-5 sm:py-10">
            <div className="my-5 pt-1 flex justify-between items-center">
                <SectionHeadingSixteen title={'Related Products'} />
                <div className="hidden sm:block">
                    <Arrow prevEl={prev} nextEl={next}></Arrow>
                </div>
            </div>
            <div className="">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        250: {
                            slidesPerView: 2,
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
                            <Card69 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
