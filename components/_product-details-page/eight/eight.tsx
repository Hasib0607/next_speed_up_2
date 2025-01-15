'use client';

import Card21 from '@/components/card/card21';
import SectionHeadingTwentyOne from '@/components/section-heading/section-heading-twentyone';
import DefaultSlider from '@/components/slider/default-slider';

import { profileImg } from '@/site-settings/siteUrl';
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import moment from 'moment';
import { SwiperSlide } from 'swiper/react';

import Details from './details-eight';
import VideoPlayer from '../components/video-player';
import { useEffect, useState } from 'react';

const Eight = ({ store_id, productId, design }: any) => {
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

    const styleCss = `
    .active-des-review {
      color:  ${design?.header_color};
      text-decoration-color: ${design?.header_color};
    }
`;

    return (
        <div className="bg-white mx-auto">
            <style>{styleCss}</style>
            <div className="">
                <div className="sm:container px-5 sm:py-10 py-5">
                    {detailsContentSkeleton}
                    <Details product={product} />
                </div>
                {/* ************************ tab component start ***************************** */}

                <div className="my-10 sm:py-10 py-5 sm:container px-5 lg:flex gap-x-10">
                    <TabGroup>
                        <TabList className="flex flex-col lg:w-[200px] w-full border-r-2 border-gray-200">
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'text-xl focus:outline-none text-left border-r-2 border-blue-400 pb-3 pr-5'
                                        : 'text-gray-400 text-xl text-left pb-3'
                                }
                            >
                                Description
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'text-xl focus:outline-none text-left border-r-2 border-blue-400 pt-3'
                                        : 'text-gray-400 text-xl text-left pt-3'
                                }
                            >
                                Reviews
                            </Tab>
                        </TabList>
                        <TabPanels className="w-full lg:border-0 border mt-10 lg:mt-0">
                            <TabPanel>
                                <div className="rounded-lg p-5">
                                    <DangerouslySafeHTML
                                        content={product?.description}
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                {reviews?.status && reviewsArr.length > 0
                                    ? reviewsArr?.map(
                                          (item: any, index: any) => (
                                              <UserReview
                                                  review={item}
                                                  key={index}
                                              />
                                          )
                                      )
                                    : reviews?.message}
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>

                {/* ************************ tab component end ***************************** */}

                {/* Video */}
                {product && product?.video_link && (
                    <VideoPlayer videoUrl={product?.video_link} />
                )}

                <div className="sm:container px-5 sm:py-10 py-5">
                    {relatedContentSkeleton}
                    <Related product={relatedProducts} design={design} />
                </div>
            </div>
        </div>
    );
};

export default Eight;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <div className=" rounded-lg p-5 flex items-center gap-5 w-full">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={profileImg + review?.image}
                        className="rounded-full h-full w-full"
                        alt=""
                    />
                </div>
            </div>
            <div className="w-full">
                <div className="flex justify-between items-center w-full">
                    <p className="text-lg font-semibold ">{review?.name}</p>
                    <p className="text-base rounded-md font-light border px-2 py-1">
                        {moment(new Date(review?.cd)).format('DD/MM/YYYY')}
                    </p>
                </div>
                <Rate className="text-base" rating={parsedRating} />
                <p className="text-base font-semiBold mt-2">
                    {review?.comment}
                </p>
            </div>
        </div>
    );
};

const Related = ({ product, design }: any) => {
    const prevEl = 'feature-product-prev';
    const nextEl = 'feature-product-next';

    const styleCss = `
.feature-product-prev {
  color:  ${design?.header_color};
  border: 1px solid ${design?.header_color};
}
.feature-product-next{
    color:  ${design?.header_color};
    border: 1px solid ${design?.header_color};
}
.feature-product-prev:hover {
  color:  ${design?.text_color};
  background: ${design?.header_color};
}
.feature-product-next:hover {
  color:  ${design?.text_color};
  background: ${design?.header_color};
}

.arrow-hov:hover .arrow {
opacity:1;
background: white;
}
`;

    return (
        <div className="pb-10 w-full">
            <style>{styleCss}</style>
            <div className="pb-2">
                <SectionHeadingTwentyOne
                    title={'YOU'}
                    subtitle={'MAY ALSO LIKE'}
                />
            </div>
            <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
            <div className="arrow-hov relative">
                <div className="">
                    <div className="arrow gap-2 lg:cursor-pointer opacity-0">
                        <div
                            className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
                        >
                            <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                        <div
                            className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
                        >
                            <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                    </div>
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={true}
                    breakpoints={{
                        250: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        976: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((productData: any) => (
                        <SwiperSlide key={productData.id}>
                            <Card21 item={productData} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};
