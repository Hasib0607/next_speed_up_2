'use client';

import Card29 from '@/components/card/card29';
import Skeleton from '@/components/loaders/skeleton';
import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import DefaultSlider from '@/components/slider/default-slider';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import Rate from '@/utils/rate';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';

import moment from 'moment';
import { IoIosArrowForward } from 'react-icons/io';
import { SwiperSlide } from 'swiper/react';

import ProdMultiCategory from '@/utils/prod-multi-category';
import Details from '../components/details-two';
import VideoPlayer from '../components/video-player';

const Fourteen = ({ store_id, productId }: any) => {
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

    const buttonFourteen =
        'bg-black btn-hover text-white text-xs font-bold sm:py-[16px] py-3 text-center w-60';

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="flex lg:mt-10 mt-16 md:my-12 flex-wrap gap-2 items-center">
                <p>Home</p>
                <IoIosArrowForward className="text-xs mt-1" />
                <ProdMultiCategory category={category} count={1} linkOff />
                <IoIosArrowForward className="text-xs mt-1" />
                <p className="text-gray-500 font-medium ">{product?.name}</p>
            </div>
            {detailsContentSkeleton}
            <Details product={product} buttonStyle={buttonFourteen} multiCat />
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

export default Fourteen;

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
        <div className="shadow-lg py-5 sm:py-10 rounded-md bg-white">
            <div className="my-5 pt-1 flex justify-between items-center px-4">
                <SectionHeadingSixteen title={'Related Products'} />
                <div className="hidden sm:block">
                    <Arrow prevEl={prev} nextEl={next}></Arrow>
                </div>
            </div>
            <div className="px-4">
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
                    {product?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card29 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
